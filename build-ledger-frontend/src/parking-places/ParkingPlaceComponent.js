import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../all-projects/project-component/Projects.css'; // За останалите стилове
import '../apartment/Component.css'; // За останалите стилове

const ParkingPlaceComponent = ({ parkingPlace, projectTitle, onAddParkingPlace }) => { // Поправено: onAddGarage вместо onAddApartment
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/parking-place/information/${parkingPlace.id}`, { state: { projectTitle } });
    };

    return (
        <div className="project-card" style={{ cursor: 'pointer', position: 'relative', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="project-info" onClick={handleViewDetails} style={{ flexGrow: 1 }}>
                    <h2 style={{ margin: 0 }}>{parkingPlace.number}</h2>
                    <p><strong>Status: </strong> {parkingPlace.sold ? 'Sold' : 'Free'}</p>
                </div>

                <div 
                    className="add-apartment-button" 
                    onClick={onAddParkingPlace} // Поправено: onAddGarage вместо onAddApartment
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ParkingPlaceComponent;
