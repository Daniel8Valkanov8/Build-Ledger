import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import UpdateCooperation from './UpdateCooperation'; // Импортираме модала

const CooperationTemplate = () => {
    const location = useLocation();
    const { projectTitle, building: initialBuilding } = location.state || {
        projectTitle: "Unknown Project", 
        building: { title: "Unknown Cooperation" }
    };

    const [building, setBuilding] = useState(initialBuilding); // Състояние за кооперацията
    const [showModal, setShowModal] = useState(false); // Състояние за показване на модала
    const [success, setSuccess] = useState(null);

    // Функция за презареждане на кооперацията след обновяване
    const refreshCooperation = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/buildings/${building.id}`);
            setBuilding(response.data); // Актуализираме данните на кооперацията
        } catch (error) {
            console.error('Error refreshing cooperation:', error);
        }
    };

    const handleAddInformation = () => {
        setShowModal(true); // Отваряме модала при натискане на бутона
    };

    return (
        <div>
            <h1>{building.title} in {projectTitle}
                <div 
                    className="add-apartment-button" 
                    onClick={handleAddInformation} // Свързваме бутона с функцията
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </h1>
            <div className="buildings-container">
                <div>Description: {building.description}</div>
                <div>Rsp: {building.rsp}</div>
                <div>Entrance count: {building.entranceCount} </div>
            </div>
            
            <UpdateCooperation 
                show={showModal} 
                handleClose={() => setShowModal(false)} // Функция за затваряне на модала
                cooperationId={building.id} 
                refreshCooperation={refreshCooperation} // Предаваме функцията за рефреш
            />
        </div>
    );
};

export default CooperationTemplate;
