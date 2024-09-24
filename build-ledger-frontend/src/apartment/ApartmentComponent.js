import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../all-projects/project-component/Projects.css';
import './Component.css';

const ApartmentComponent = ({ apartment, projectTitle }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/apartment/information/${apartment.id}`, { state: { projectTitle } });
    };

    const handleSell = () => {
        alert(`Selling apartment with ID ${apartment.id}`);
    };

    const handleAddApartment = () => {
        // Логика за добавяне на апартамент
        alert(`Adding apartment with ID ${apartment.id}`);
    };

    return (
        <div className="project-card" style={{ cursor: 'pointer', position: 'relative' }}>
            <div className="project-info" onClick={handleViewDetails}>
                <h2>{apartment.number}</h2>
                <p><strong>Area: </strong> {apartment.area} m²</p>
                <p><strong>Price: </strong> {apartment.priceLv} BGN</p>
                <p><strong>Floor: </strong> {apartment.floor}</p>
                <p><strong>Status: </strong> {apartment.sold ? 'Sold' : 'Free'}</p>
            </div>

            <div className="apartment-actions">
                <button 
                    type="button" 
                    className="btn btn-success" 
                    onClick={handleSell} 
                    disabled={apartment.sold}
                >
                    {apartment.sold ? 'Sold' : 'Sell'}
                </button>
                <div 
                    className="add-apartment-button" 
                    onClick={handleAddApartment}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ApartmentComponent;
