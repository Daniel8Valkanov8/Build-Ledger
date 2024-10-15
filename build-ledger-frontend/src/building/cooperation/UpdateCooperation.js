import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateCooperation.css';

const UpdateCooperation = ({ show, handleClose, cooperationId, refreshCooperation }) => {
    const [rsp, setRsp] = useState('');
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState(''); // Състояние за избрания етап
    const [existingStages, setExistingStages] = useState([]); // Състояние за съществуващите етапи
    const [error, setError] = useState(null); // Състояние за грешки

    // GET заявка за текущите етапи на сградата
    useEffect(() => {
        const fetchStages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/buildings/${cooperationId}`);
                setExistingStages(response.data.stages || []); // Масивът "stages" от отговора
            } catch (error) {
                console.error("Error fetching stages:", error);
            }
        };

        if (cooperationId) {
            fetchStages(); // Извикваме функцията само ако има cooperationId
        }
    }, [cooperationId]);

    const handleSaveChanges = async () => {
        // Проверка дали избраният етап вече съществува в масива stages
        if (existingStages.includes(stage)) {
            setError(`The stage ${stage} already exists for this cooperation.`);
            return; // Спираме PUT заявката, ако има грешка
        }
    
        const updateData = {
            id: cooperationId, // Добавяме ID-то на кооперацията
            description: description,
            rsp: parseFloat(rsp), // Конвертираме стойността на rsp в число
            stage: stage // Добавяме избрания етап
        };
    
        try {
            const response = await axios.put(`http://localhost:8080/buildings/update/cooperation`, updateData);
            console.log(response.data);
            handleClose(); // Затваряне на модала след успешния запис
            refreshCooperation(); // Презареждаме списъка с данни след обновяване
        } catch (error) {
            console.error("Error updating cooperation:", error);
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
                        <h5 className="modal-title">Update Block</h5>
                    </div>
                    <div className="modal-body">
                        {error && <div className="alert alert-danger">{error}</div>} {/* Показване на грешка */}

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows="5"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Block information"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rsp">RSP</label>
                            <input
                                type="number"
                                className="form-control no-arrows"
                                id="rsp"
                                value={rsp}
                                onChange={(e) => setRsp(e.target.value)}
                                placeholder="m²"
                            />
                        </div>
                        {/*<div className="form-group">
                            <label htmlFor="stage">Stages</label>
                            <select
                                className="form-control"
                                id="stage"
                                value={stage}
                                onChange={(e) => setStage(e.target.value)}
                            >
                                <option value="">Select Stage</option>
                                <option value="AKT 14">AKT14</option>
                                <option value="AKT 15">AKT15</option>
                                <option value="AKT 16">AKT16</option>
                            </select>
                        </div>*/}
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

export default UpdateCooperation;
