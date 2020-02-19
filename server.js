const WebSocket = require("ws");

// 1 - 3 seconds
const getShotLoadingTime = () => Math.floor(Math.random() * 2000) + 1000;

const wss = new WebSocket.Server({
    port: 3001,
});

let shootingTimeout;
let shooting = false;


const startShooter = (ws) => {
    console.log("Starting shooter");
    shooting = true;
    setTimeout(() => recursiveShooter(ws), getShotLoadingTime());
}

const recursiveShooter = (ws) => {
    if (!shooting) {
        return;
    }
    // generate a random coordinate from -100, -100 to 100, 100
    const x = Math.floor(Math.random() * 201) - 100;
    const y = Math.floor(Math.random() * 201) - 100;
    ws.send(JSON.stringify({x, y}));
    shootingTimeout = setTimeout(() => recursiveShooter(ws), getShotLoadingTime());
}

const stopShooter = () => {
    console.log("Stopping shooter");
    shooting = false;
    clearTimeout(shootingTimeout);
}

wss.on("connection", (ws) => {
    ws.on("close", () => {
        console.log("Connection to client websocket closed");
        stopShooter();
    });

    ws.on("message", async (message) => {
        console.log(`received: ${message}`);

        switch (message) {
            case "start":
                startShooter(ws);
                break;
            case "stop":
                stopShooter();
                break;
            default:
                break;
        }
    });
});
