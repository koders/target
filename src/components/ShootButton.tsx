import React from "react";

interface ShootButtonProps {
    toggleShooting: () => void;
    shooting: boolean;
}

export const ShootButton: React.FC<ShootButtonProps> = ({ shooting, toggleShooting }) => {
    return (
        <button onClick={toggleShooting} className={`shoot-button ${shooting ? "shooting" : ""}`}>
            {shooting ? "Stop" : "Start"}
        </button>
    );
};
