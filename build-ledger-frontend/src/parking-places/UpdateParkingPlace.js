import React, { useState } from 'react';
import '../apartment/UpdateApartment.css';
import axios from 'axios';

const UpdateGarage = ({ show, handleClose, cooperationNumber, parkingPlaceNumber, parkingId, refreshParkingPlaces }) => {
    const [price, setPrice] = useState('');
    const [errorMessage] = useState(''); // Съобщение за грешка

    const handleSaveChanges = async () => {
        // Намиране на избрания етаж по ID
        
      

        // Ако няма грешка, продължаваме с PUT заявката
        const updateData = {
            id: parkingId,
            number: parkingPlaceNumber,
           
        };
        
        try {
            const response = await axios.put(`http://localhost:8080/parking-places/update`, updateData);
            console.log(response.data);
            handleClose(); // Затваряне на модала след успешния запис
            refreshParkingPlaces(); // Презареждаме списъка с гаражи
        } catch (error) {
            console.error("Error updating parking place:", error);
        }
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`} 
             style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} 
             tabIndex="-1" 
             role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{parkingPlaceNumber} in Cooperation {cooperationNumber}</h5>
                    </div>
                    
                    <div className="modal-body">
                        {/* Показваме съобщение за грешка, ако има такова */}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text" 
                                className="form-control no-spinner" 
                                id="price" 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                                placeholder="Price in €"
                            />
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateGarage;