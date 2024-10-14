import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../all-projects/project-component/Projects.css'; // За останалите стилове
import '../apartment/Component.css'; // За останалите стилове

const GarageComponent = ({ garage, projectTitle, onAddGarage, floors }) => { 
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/garage/information/${garage.id}`, { state: { projectTitle } });
    };

    // Намираме етажа по floorId от garage
    const floor = floors.find(f => f.id === garage.floorId); 
    const floorNumber = floor ? floor.number : 'Unknown'; // Показваме номера на етажа или 'Unknown'

    return (
        <div className="project-card" style={{ cursor: 'pointer', position: 'relative', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="project-info" onClick={handleViewDetails} style={{ flexGrow: 1 }}>
                    <h2 style={{ margin: 0 }}>{garage.number}</h2>
                    <p><strong>Price: </strong> {garage.priceEur} €</p>
                    <p><strong>Level: </strong> {floorNumber}</p> {/* Използваме правилния номер на етажа */}
                    <p><strong>Status: </strong> {garage.sold ? 'Sold' : 'Free'}</p>
                </div>

                <div 
                    className="add-apartment-button" 
                    onClick={onAddGarage} 
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default GarageComponent;
