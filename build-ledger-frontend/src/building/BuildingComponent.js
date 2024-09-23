import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CooperationContext } from '../navigation/CooperationContext'; // Импортираме контекста

const BuildingComponent = ({ building, projectTitle }) => {
    const [buildingDetails, setBuildingDetails] = useState(null);
    const { setCooperation } = useContext(CooperationContext); // Използваме глобалния state
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/buildings/${building.id}`);
            const buildingData = response.data;

            setBuildingDetails(buildingData);

            if (buildingData.type === 'Cooperation') {
                setCooperation(buildingData); // Актуализираме глобалното състояние
                navigate(`/cooperation/${building.id}`, { state: { projectTitle, building: buildingData } });
            } else if (buildingData.type === 'House') {
                navigate(`/house/${building.id}`, { state: { projectTitle, building: buildingData } });
            } else {
                console.error('Unknown building type:', buildingData.type);
            }
        } catch (error) {
            console.error('Error fetching building details:', error);
        }
    };

    return (
        <div className="project-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="project-info">
                <h2>{building.title}</h2>
            </div>
        </div>
    );
};

export default BuildingComponent;
