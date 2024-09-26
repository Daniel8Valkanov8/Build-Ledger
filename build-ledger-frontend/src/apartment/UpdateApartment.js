import React, { useState } from 'react';
import './UpdateApartment.css';
import axios from 'axios';

const UpdateApartment = ({ show, handleClose, apartmentNumber, cooperationNumber, floors, apartmentId, refreshApartments }) => {
    const [area, setArea] = useState('');
    const [bedroomCount, setBedroomCount] = useState('');
    const [bathroomCount, setBathroomCount] = useState('');
    const [price, setPrice] = useState('');
    const [floorId, setFloorId] = useState('');

    const handleSaveChanges = async () => {
        const updateData = {
            id: apartmentId,
            cooperationId: null, 
            number: apartmentNumber,
            area: area ? parseFloat(area) : null,
            priceEur: price ? parseFloat(price) : null,
            bedroomCount: bedroomCount ? parseInt(bedroomCount) : null,
            bathroomCount: bathroomCount ? parseInt(bathroomCount) : null,
            floorId: floorId || null,
        };
        
        try {
            const response = await axios.put(`http://localhost:8080/apartments/update`, updateData);
            console.log(response.data);
            handleClose(); // Затваряне на модала след успешния запис
            refreshApartments(); // Презареждаме списъка с апартаменти
        } catch (error) {
            console.error("Error updating apartment:", error);
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
                        <h5 className="modal-title">{apartmentNumber} in Cooperation {cooperationNumber}</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="area">Area</label>
                            <input
                                type="number"
                                className="form-control"
                                id="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                placeholder="m²"/>
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="bedroom">Bedroom Count</label>
                            <input
                                type="number"
                                className="form-control"
                                id="bedroom"
                                value={bedroomCount}
                                onChange={(e) => setBedroomCount(e.target.value)}
                                placeholder="Bedroom Count"
                                min="1"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bathroom">Bathroom Count</label>
                            <input
                                type="number"
                                className="form-control"
                                id="bathroom"
                                value={bathroomCount}
                                onChange={(e) => setBathroomCount(e.target.value)}
                                placeholder="Bathroom Count"
                                min="1"/>
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

export default UpdateApartment;
