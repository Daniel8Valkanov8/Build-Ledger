import React, { useState } from 'react';
import './ForSaleModal.css';

const AllGaragesForSaleModal = ({ show, handleClose, garages, onGaragesSelect }) => {
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedGarages, setSelectedGarages] = useState([]);

    if (!show) return null;

    // Function to reset state on modal close
    const resetState = () => {
        setIsSelectMode(false);
        setSelectedGarages([]);
    };

    const handleCheckboxChange = (garageId) => {
        if (selectedGarages.includes(garageId)) {
            setSelectedGarages(selectedGarages.filter(id => id !== garageId));
        } else {
            setSelectedGarages([...selectedGarages, garageId]);
        }
    };

    const handleGarageClick = (garage) => {
        if (!isSelectMode) {
            // If select mode is off, close the modal and pass the whole apartment object
            onGaragesSelect(garage); // Pass the entire apartment object to the parent
            handleClose(); // Close the modal
        }
    };

    const handleSelectModeClose = () => {
        // Handle closing when in select mode (if necessary)
        if (isSelectMode && selectedGarages.length > 0) {
            // If in select mode and apartments are selected, pass the selected apartments to the parent
            const selectedGaragesObjects = garages.filter(garage =>
                selectedGarages.includes(garage.id)
            );
            selectedGaragesObjects.forEach(garage => onGaragesSelect(garage));
        }
        handleClose();
        resetState(); // Reset state on close
    };

    return (
        <div className="modal-overlay-ap">
            <div className="modal-content-ap">
                <div className="modal-header-ap">
                    <h2>Select Garages</h2>
                    <button
    onClick={() => {
        if (isSelectMode && selectedGarages.length > 0) {
            // Ако сме в select mode и има избрани апартаменти
            const selectedGarageObjects = garages.filter(garage =>
                selectedGarages.includes(garage.id)
            );
            selectedGarageObjects.forEach(garage => onGaragesSelect(garage));
            handleClose(); // Затваряме модала
            resetState();  // Ресетваме състоянието
        }
    }}
    className="close-button"
>
    Add
</button>

                    <button
                        onClick={() => {
                            handleSelectModeClose(); // Handle select mode close logic
                        }}
                        className="close-button"
                    >
                        Close
                    </button>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            onChange={() => setIsSelectMode(!isSelectMode)}
                        />
                        <label htmlFor="flexSwitchCheckDefault">Select</label>
                    </div>
                </div>
                
                <div className="apartments-list">
                    {garages.length > 0 ? (
                        garages.map((garage) => (
                            <div 
                                key={garage.id} 
                                className="apartment-item" 
                                onClick={() => handleGarageClick(garage)}
                            >
                                {isSelectMode && (
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={garage.id}
                                        id={`apartment-${garage.id}`}
                                        checked={selectedGarages.includes(garage.id)}
                                        onChange={() => handleCheckboxChange(garage.id)}
                                    />
                                )}
                               <label htmlFor={`garage-${garage.id}`} className="item-number">
    {garage.number}
</label>
<span className="item-price">{garage.priceEur.toFixed(2)} €</span>
</div>
                        ))
                    ) : (
                        <p>No garages available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllGaragesForSaleModal;
