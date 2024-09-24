import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../all-projects/project-component/Projects.css';
import '../apartment/Component.css'

const GarageComponent = ({ garage, projectTitle }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/apartment/information/${garage.id}`, { state: { projectTitle } });
    };

    return (
        <div className="project-card" style={{ cursor: 'pointer', position: 'relative' }}>
            <div className="project-info" onClick={handleViewDetails}>
                <h2>{garage.number}</h2>
                
            </div>
        </div>
    );
};

export default GarageComponent;
