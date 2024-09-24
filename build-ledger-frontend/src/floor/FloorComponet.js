import React from 'react';

const FloorComponent = ({ floor }) => {
    if (!floor) {
        return <div>No floor data available.</div>;
    }

    return (
        <div className="floor-component"> {/* Забележи точния className */}
            <h2>Floor {floor.number}</h2>
            <p>Details: {floor.details}</p>
        </div>
    );
};

export default FloorComponent;
