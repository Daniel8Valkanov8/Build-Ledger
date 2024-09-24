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

    return (
        <div className="project-card" style={{ cursor: 'pointer' }}>
            <div className="project-info" onClick={handleViewDetails}>
                <h2>{apartment.number}</h2>
                <p><strong>Area: </strong> {apartment.area} m²</p>
                <p><strong>Price: </strong> {apartment.priceLv} BGN</p>
                <p><strong>Status: </strong> {apartment.sold ? 'Sold' : 'Free'}</p>
            </div>

            <div className="apartment-actions">
                <button type="button" className="btn btn-success" onClick={handleSell} disabled={apartment.sold}>
                    {apartment.sold ? 'Sold' : 'Sell'}
                </button>
            </div>
        </div>
    );
};

export default ApartmentComponent;
