import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../all-projects/project-component/Projects.css';

const BuildingComponent = ({ building, projectTitle }) => {
    const [buildingDetails, setBuildingDetails] = useState(null);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            // Изпрати GET заявка за детайли на сградата
            const response = await axios.get(`http://localhost:8080/buildings/${building.id}`);
            const buildingData = response.data; // Запази данните от отговора

            setBuildingDetails(buildingData); // Запази данните в локалното състояние

            // Проверка на типа на сградата и съответно навигация
            if (buildingData.type === 'Cooperation') {
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
        <div 
            className="project-card" 
            onClick={handleClick} 
            style={{ cursor: 'pointer' }}
        >
            <div className="project-info">
                <h2>{building.title}</h2> {/* Тук визуализираме заглавието на сградата */}
            </div>
        </div>
    );
};

export default BuildingComponent;
