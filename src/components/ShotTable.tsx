import React from "react";

interface ShotTableProps {
    shots: Coordinate[];
}

export const ShotTable: React.FC<ShotTableProps> = ({ shots }) => {
    return (
        <div className="table-container shake">
            <h3 className="title">Shooting history</h3>
            <table>
                <colgroup>
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "50%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th></th>
                        <th>Grade</th>
                        <th>x</th>
                        <th>y</th>
                    </tr>
                </thead>
                <tbody>
                    {shots.map((c: Coordinate, i: number) => {
                        const index = shots.length - i;
                        // Calculates hue - red = bad, green = good
                        const xColor = (100 - Math.abs(c.x)) / 100 * 120;
                        const yColor = (100 - Math.abs(c.y)) / 100 * 120;
                        // pythagorean theorem
                        const distanceFromCenter = Math.sqrt(Math.abs(c.x) ** 2 + Math.abs(c.y) ** 2);
                        let grade = "Very Bad";
                        if (distanceFromCenter < 100) {
                            grade = "Bad";
                        }
                        if (distanceFromCenter < 80) {
                            grade = "Okay";
                        }
                        if (distanceFromCenter < 60) {
                            grade = "Good";
                        }
                        if (distanceFromCenter < 40) {
                            grade = "Very Good";
                        }
                        if (distanceFromCenter < 20) {
                            grade = "Perfect";
                        }
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{grade}</td>
                                <td
                                    style={{
                                        backgroundColor: `hsl(${xColor}, 100%, 50%)`,
                                    }}
                                >
                                    {c.x}
                                </td>
                                <td
                                    style={{
                                        backgroundColor: `hsl(${yColor}, 100%, 50%)`,
                                    }}
                                >{c.y}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
