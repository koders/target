import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import { ShotTable } from "./components/ShotTable";
import { ShootingTarget } from "./components/ShootingTarget";
import { ShootButton } from "./components/ShootButton";

let socket: WebSocket;

function App() {
    const [shooting, setShooting] = useState<boolean>(false);
    const [shots, setShots] = useState<Coordinate[]>([]);

    const toggleShooting = useCallback(() => {
        socket.send(shooting ? "stop" : "start");
        setShooting(!shooting);
    }, [shooting]);

    useEffect(() => {
        socket = new WebSocket("ws://localhost:3001");
        socket.onopen = e => console.log("connected");
    }, []);

    useEffect(() => {
        socket.onmessage = e => {
            let parsed: Coordinate;
            try {
                parsed = JSON.parse(e.data);
            } catch (e) {
                return;
            }
            setShots([parsed, ...shots]);
        };
    }, [shots, setShots]);

    return (
        <div className="app">
            <h1 className="title">Target Shooter</h1>
            <div className="content">
                <ShotTable shots={shots} />
                <div className="column">
                    <ShootingTarget shots={shots} />
                    <ShootButton shooting={shooting} toggleShooting={toggleShooting} />
                </div>
            </div>
        </div>
    );
}

export default App;
