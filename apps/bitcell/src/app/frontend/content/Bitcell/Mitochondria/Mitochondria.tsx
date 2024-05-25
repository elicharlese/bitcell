import React, { useState } from 'react';
import Mitochondria from './Mitochondria';

const MitochondriaComponent: React.FC = () => {
    const mitochondria = new Mitochondria();
    const [updateCount, setUpdateCount] = useState(0);

    const refresh = () => setUpdateCount(updateCount + 1);

    const handlePumpIn = () => {
        mitochondria.pumpIn(10, 1); // Inner Chamber
        refresh();
    };

    const handlePumpOut = () => {
        mitochondria.pumpOut(10, 2); // Outer Chamber
        refresh();
    };

    return (
        <div>
            <h2>Mitochondria</h2>
            {mitochondria.chambers.map(chamber => (
                <div key={chamber.id}>
                    <h3>{chamber.name}</h3>
                    <p>Substance: {chamber.substance}</p>
                    <p>Current Level: {chamber.currentLevel}</p>
                </div>
            ))}
            <button onClick={handlePumpIn}>Pump In 10 units to Inner Chamber</button>
            <button onClick={handlePumpOut}>Pump Out 10 units from Outer Chamber</button>
        </div>
    );
}

export default MitochondriaComponent;