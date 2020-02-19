import React from 'react'

interface ShootingTargetProps {
    shots: Coordinate[];
}

export const ShootingTarget: React.FC<ShootingTargetProps> = ({ shots }) => {
    return (
        <div className="target">
            {shots.map((c, i) => {
                const style = {transform: `translate(${(c.x + 100) * 2 - 25}px, ${(c.y + 100) * 2 - 25}px)`};
                return <div key={i} className="shot" style={style} />;
            })}
        </div>
    )
}
