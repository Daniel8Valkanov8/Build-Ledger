import React, { useState } from 'react';
import './ForSaleModal.css';

const AllParkingPlacesForSaleModal = ({ show, handleClose, parkingPlaces, onParkingPlacesSelect }) => {
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedParkingPlaces, setSelectedParkingPlaces] = useState([]);

    if (!show) return null;

    // Function to reset state on modal close
    const resetState = () => {
        setIsSelectMode(false);
        setSelectedParkingPlaces([]);
    };

    const handleCheckboxChange = (parkingPlaceId) => {
        if (selectedParkingPlaces.includes(parkingPlaceId)) {
            setSelectedParkingPlaces(selectedParkingPlaces.filter(id => id !== parkingPlaceId));
        } else {
            setSelectedParkingPlaces([...selectedParkingPlaces, parkingPlaceId]);
        }
    };

    const handleGarageClick = (parkingPlace) => {
        if (!isSelectMode) {
            // If select mode is off, close the modal and pass the whole apartment object
            onParkingPlacesSelect(parkingPlace); // Pass the entire apartment object to the parent
            handleClose(); // Close the modal
        }
    };

    const handleSelectModeClose = () => {
        // Handle closing when in select mode (if necessary)
        if (isSelectMode && selectedParkingPlaces.length > 0) {
            // If in select mode and apartments are selected, pass the selected apartments to the parent
            const selectedParkingPlacesObjects = parkingPlaces.filter(parkingPlace =>
                selectedParkingPlaces.includes(parkingPlace.id)
            );
            selectedParkingPlacesObjects.forEach(parkingPlace => onParkingPlacesSelect(parkingPlace));
        }
        handleClose();
        resetState(); // Reset state on close
    };

    return (
        <div className="modal-overlay-ap">
            <div className="modal-content-ap">
                <div className="modal-header-ap">
                    <h2>Select Parking Places</h2>
                    <button
    onClick={() => {
        if (isSelectMode && selectedParkingPlaces.length > 0) {
            // Ако сме в select mode и има избрани апартаменти
            const selectedParkingPlaceObjects = parkingPlaces.filter(garage =>
                selectedParkingPlaces.includes(garage.id)
            );
            selectedParkingPlaceObjects.forEach(parkingPlace => onParkingPlacesSelect(parkingPlace));
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
                    {parkingPlaces.length > 0 ? (
                        parkingPlaces.map((parkingPlace) => (
                            <div 
                                key={parkingPlace.id} 
                                className="apartment-item" 
                                onClick={() => handleGarageClick(parkingPlace)}
                            >
                                {isSelectMode && (
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={parkingPlace.id}
                                        id={`apartment-${parkingPlace.id}`}
                                        checked={selectedParkingPlaces.includes(parkingPlace.id)}
                                        onChange={() => handleCheckboxChange(parkingPlace.id)}
                                    />
                                )}
                               <label htmlFor={`garage-${parkingPlace.id}`} className="item-number">
    {parkingPlace.number}
</label>
<span className="item-price">{parkingPlace.priceEur.toFixed(2)} €</span>
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

export default AllParkingPlacesForSaleModal;
