import React, { useState } from 'react';
import './AllApartmentsForSaleModal.css';

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
        onApartmentSelect(apartment.number); // Pass the apartment number to the parent
        handleClose(); // Close the modal
    };
    return (
        <div className="modal-overlay-ap">
            <div className="modal-content-ap">
                <div className="modal-header-ap">
                    <h2>Select Apartments</h2>

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
                            <div key={apartment.id} className="apartment-item">
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
                                <label htmlFor={`apartment-${apartment.id}`} className="apartment-number">
                                    {apartment.number}
                                </label>
                                <span className="apartment-price">{apartment.priceEur.toFixed(2)} €</span>
                            </div>
                        ))
                    ) : (
                        <p>No apartments available</p>
                    )}
                </div>
                <button
                    onClick={() => {
                        handleClose(); // Close the modal
                        resetState();   // Reset the state when modal closes
                    }}
                    className="close-button-ap"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AllApartmentsForSaleModal;
