import React, { useState } from 'react';
import './ForSaleModal.css';

const AllApartmentsForSaleModal = ({ show, handleClose, apartments, onApartmentSelect }) => {
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedApartments, setSelectedApartments] = useState([]);

    if (!show) return null;

    // Function to reset state on modal close
    const resetState = () => {
        setIsSelectMode(false);
        setSelectedApartments([]);
    };

    const handleCheckboxChange = (apartmentId) => {
        if (selectedApartments.includes(apartmentId)) {
            setSelectedApartments(selectedApartments.filter(id => id !== apartmentId));
        } else {
            setSelectedApartments([...selectedApartments, apartmentId]);
        }
    };

    const handleApartmentClick = (apartment) => {
        if (!isSelectMode) {
            // If select mode is off, close the modal and pass the whole apartment object
            onApartmentSelect(apartment); // Pass the entire apartment object to the parent
            handleClose(); // Close the modal
        }
    };

    const handleSelectModeClose = () => {
        // Handle closing when in select mode (if necessary)
        if (isSelectMode && selectedApartments.length > 0) {
            // If in select mode and apartments are selected, pass the selected apartments to the parent
            const selectedApartmentObjects = apartments.filter(apartment =>
                selectedApartments.includes(apartment.id)
            );
            selectedApartmentObjects.forEach(apartment => onApartmentSelect(apartment));
        }
        handleClose();
        resetState(); // Reset state on close
    };

    return (
        <div className="modal-overlay-ap">
            <div className="modal-content-ap">
                <div className="modal-header-ap">
                    <h2>Select Apartments</h2>
                    <button
    onClick={() => {
        if (isSelectMode && selectedApartments.length > 0) {
            // Ако сме в select mode и има избрани апартаменти
            const selectedApartmentObjects = apartments.filter(apartment =>
                selectedApartments.includes(apartment.id)
            );
            selectedApartmentObjects.forEach(apartment => onApartmentSelect(apartment));
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
                    {apartments.length > 0 ? (
                        apartments.map((apartment) => (
                            <div 
                                key={apartment.id} 
                                className="apartment-item" 
                                onClick={() => handleApartmentClick(apartment)}
                            >
                                {isSelectMode && (
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={apartment.id}
                                        id={`apartment-${apartment.id}`}
                                        checked={selectedApartments.includes(apartment.id)}
                                        onChange={() => handleCheckboxChange(apartment.id)}
                                    />
                                )}

<label htmlFor={`apartment-${apartment.id}`} className="item-number">
    {apartment.number}
</label>
<span className="item-price">{apartment.priceEur.toFixed(2)} €</span>

                            
                            </div>
                        ))
                    ) : (
                        <p>No apartments available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllApartmentsForSaleModal;
