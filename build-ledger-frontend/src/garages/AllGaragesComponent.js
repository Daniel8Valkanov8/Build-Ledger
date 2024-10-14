import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../apartment/Apartment.css';
import GarageComponent from './GarageComponent';
import UpdateGarage from './UpdateGarage';

const AllGarages = () => {
    const { id } = useParams();
    const [garages, setGarages] = useState([]);
    const [floors, setFloors] = useState([]);
    const [selectedGarage, setSelectedGarage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchGaragesAndFloors = async () => {
        console.log('Refreshing garages and floors...');  // Проверка дали функцията се извиква
        try {
            const [garagesResponse, floorsResponse] = await Promise.all([
                axios.get(`http://localhost:8080/garages/${id}`),
                axios.get(`http://localhost:8080/floors/${id}`)
            ]);
    
            setGarages(garagesResponse.data);
            setFloors(floorsResponse.data);
            console.log("Garages after update:", garagesResponse.data);  // Проверка на новите данни
        } catch (err) {
            console.error(err);
            setError('Failed to fetch garages and floors.');
        }
    };
    

    useEffect(() => {
        fetchGaragesAndFloors();
    }, [id]);

    const handleAddGarage = (garage) => {
        setSelectedGarage(garage);
    };

    const handleCloseModal = () => {
        setSelectedGarage(null);
    };

    const handleAddApartment = () => {
        navigate(`/garage/add/${id}`);
    };

    return (
        <div>
            <h1>Garages</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="apartment-container">
                {garages.map(garage => (
                    <GarageComponent
                        key={garage.id}
                        garage={garage}
                        projectTitle={`Cooperation ${id}`}
                        onAddGarage={() => handleAddGarage(garage)}
                        floors={floors}  // Подаваме списъка с етажи към GarageComponent
                    />
                ))}

                <div 
                    className="project-card add-apartment-card"
                    onClick={handleAddApartment} 
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </div>

            {selectedGarage && (
                <UpdateGarage
                    show={!!selectedGarage}
                    handleClose={handleCloseModal}
                    garageNumber={selectedGarage.number}
                    cooperationNumber={id}
                    floors={floors}
                    garageId={selectedGarage.id}
                    refreshGarages={fetchGaragesAndFloors}  // Предаваме правилната функция за презареждане
                />
            )}
        </div>
    );
};

export default AllGarages;
