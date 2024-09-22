import React, { useState } from 'react';
import './UpdateApartment.css';
import axios from 'axios';

const UpdateApartment = ({ show, handleClose, apartmentNumber, cooperationNumber, floors, apartmentId }) => {
    const [area, setArea] = useState('');
    const [bedroomCount, setBedroomCount] = useState('');
    const [bathroomCount, setBathroomCount] = useState('');
    const [floorId, setFloorId] = useState('');

    const handleSaveChanges = async () => {
        const updateData = {
            id: apartmentId,
            cooperationId: null, // Set to null or provide actual value if needed
            number: apartmentNumber,
            area: area ? parseFloat(area) : null, // Use null if area is not provided
            bedroomCount: bedroomCount ? parseInt(bedroomCount) : null, // Use null if bedroom count is not provided
            bathroomCount: bathroomCount ? parseInt(bathroomCount) : null, // Use null if bathroom count is not provided
            floorId: floorId || null, // Use selected floor ID or null
        };
        
        try {
            const response = await axios.put(`http://localhost:8080/apartments/update`, updateData);
            console.log(response.data);
            handleClose(); // Close the modal after saving
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
                        <h5 className="modal-title">{apartmentNumber} in {cooperationNumber}</h5>
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
