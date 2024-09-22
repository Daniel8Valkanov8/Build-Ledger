import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../all-projects/project-component/Projects.css';
import './Component.css';
import UpdateApartment from './UpdateApartment'; // Импорт на новия модал

const ApartmentComponent = ({ apartment, projectTitle }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // Създаваме state за показване на модала

    const handleViewDetails = () => {
        navigate(`/apartment/information/${apartment.id}`, { state: { projectTitle } });
    };

    const handleSell = () => {
        alert(`Selling apartment with ID ${apartment.id}`);
    };

    const handleUpdateApartment = () => {
        setShowModal(true); // Показваме модала
    };

    const handleCloseModal = () => {
        setShowModal(false); // Затваряме модала
    };

    return (
        <>
            <div className="project-card" style={{ cursor: 'pointer' }}>
                <div className="project-info" onClick={handleViewDetails}>
                    <h2>{apartment.number}</h2>
                    <p><strong>Area: </strong> {apartment.area} m²</p>
                    <p><strong>Price: </strong> {apartment.priceLv} BGN</p>
                    <p><strong>Status: </strong> {apartment.sold ? 'Sold' : 'Free'}</p>
                </div>

                {/* Бутоните за "Sell" и добавяне на нов апартамент */}
                <div className="apartment-actions">
                    <button
                        type="button"
                        className="btn btn-primary add-btn"
                        onClick={handleUpdateApartment}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="86" height="66" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </button>

                    <button type="button" className="btn btn-success" onClick={handleSell} disabled={apartment.sold}>
                        {apartment.sold ? 'Sold' : 'Sell'}
                    </button>
                </div>
            </div>

            {/* Модал за актуализиране на апартамента */}
            <UpdateApartment 
                show={showModal} 
                handleClose={handleCloseModal} 
                apartmentNumber={apartment.number} // Предаваме номера на апартамента
            />
        </>
    );
};

export default ApartmentComponent;
