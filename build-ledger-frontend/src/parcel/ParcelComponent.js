import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../all-projects/project-component/Projects.css';

const ParcelComponent = ({ parcel, projectTitle }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/parcel/${parcel.id}`, { state: { projectTitle } }); // Навигация с state
    };

    return (
        <div 
            className="project-card" 
            onClick={handleClick} 
            style={{ cursor: 'pointer' }}
        >
            <div className="project-info">
                <h2>Parcel Information</h2>
                <p><strong>ID:</strong> {parcel.id}</p>
                <p><strong>EIK:</strong> {parcel.eik}</p>
                <p><strong>Address:</strong> {parcel.address}</p>
                <p><strong>Area:</strong> {parcel.area} m²</p>
                <p><strong>Compensated:</strong> {parcel.isCompensated ? 'Yes' : 'No'}</p>
                <p><strong>Regular:</strong> {parcel.isRegular ? 'Yes' : 'No'}</p>
                <p><strong>Percentage of Compensation:</strong> {parcel.percentageOfCompensation}%</p>
                <p><strong>With Electricity and Water:</strong> {parcel.withElectricityAndWater ? 'Yes' : 'No'}</p>
                <p><strong>Price in BGN:</strong> {parcel.priceBgn} BGN</p>
                <p><strong>Price in EUR:</strong> {parcel.priceEur} EUR</p>
            </div>
        </div>
    );
};

export default ParcelComponent;
