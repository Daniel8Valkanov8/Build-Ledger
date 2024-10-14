import React, { useState } from 'react';
import '../apartment/UpdateApartment.css';
import axios from 'axios';

const UpdateGarage = ({ show, handleClose, cooperationNumber, garageNumber, floors, garageId, refreshGarages }) => {
    const [price, setPrice] = useState('');
    const [floorId, setFloorId] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Съобщение за грешка

    const handleSaveChanges = async () => {
        // Намиране на избрания етаж по ID
        const selectedFloor = floors.find(floor => floor.id === parseInt(floorId)); 
        
        // Проверка дали етажът е надземен (номерът му е по-голям от 3)
        if (selectedFloor && parseInt(selectedFloor.number) > 3) { 
            setErrorMessage('Гаражът не може да се намира на надземен етаж.');
            return;
        }
    
        // Обновяваме данните, които ще изпращаме в PUT заявката
        const updateData = {
            id: garageId,
            priceEur: parseFloat(price),  // Преобразуваме стойността в число
            floorId : floorId || null,
        };
    
        try {
            const response = await axios.put(`http://localhost:8080/garages/update`, updateData);
            console.log(response.data);
            
            // Затваряне на модала и презареждане на данните
            handleClose(); 
            refreshGarages(); // Презареждаме гаражите след успешно обновяване
        } catch (error) {
            console.error("Error updating garage:", error);
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
                        <h5 className="modal-title">{garageNumber} in Cooperation {cooperationNumber}</h5>
                    </div>
                    
                    <div className="modal-body">
                        {/* Показваме съобщение за грешка, ако има такова */}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                        <div className="form-group">
                            <label htmlFor="floor">Floor</label>
                            <select className="form-control" id="floor" value={floorId} onChange={(e) => setFloorId(e.target.value)}>
                                <option value="">Select Floor</option>
                                {floors.map(floor => (
                                    <option key={floor.id} value={floor.id}>{floor.number}</option>
                                ))}
                            </select>
                        </div>
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
