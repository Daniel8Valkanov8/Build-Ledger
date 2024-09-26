import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../apartment/Apartment.css';
import ParkingPlaceComponent from './ParkingPlaceComponent';
import UpdateParkingPlace from './UpdateParkingPlace'; // Добавяне на UpdateParkingPlace

const AllParkingPlaces = () => {
    const { id } = useParams();
    const [parkingPlaces, setParkingPlaces] = useState([]);
    const [floors, setFloors] = useState([]); // Поддръжка на етажи
    const [selectedParkingPlace, setSelectedParkingPlace] = useState(null); // Избрано паркомясто
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Фетчване на паркоместа и етажи
    const fetchParkingPlacesAndFloors = async () => {
        try {
            const [parkingPlacesResponse, floorsResponse] = await Promise.all([
                axios.get(`http://localhost:8080/parking-places/${id}`),
                axios.get(`http://localhost:8080/floors/${id}`)
            ]);
            setParkingPlaces(parkingPlacesResponse.data);
            setFloors(floorsResponse.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch parking places and floors.');
        }
    };

    useEffect(() => {
        fetchParkingPlacesAndFloors();
    }, [id]);

    // Функция за отваряне на модала за актуализиране на паркомясто
    const handleAddParkingPlace = (parkingPlace) => {
        setSelectedParkingPlace(parkingPlace);
    };

    // Затваряне на модала
    const handleCloseModal = () => {
        setSelectedParkingPlace(null);
    };

    // Навигация към добавяне на ново паркомясто
    const handleAddNewParkingPlace = () => {
        navigate(`/parking-places/add/${id}`);
    };

    return (
        <div>
            <h1>Parking Places</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="apartment-container">
                {parkingPlaces.map(parkingPlace => (
                    <ParkingPlaceComponent
                        key={parkingPlace.id}
                        parkingPlace={parkingPlace}
                        projectTitle={`Cooperation ${id}`}
                        onAddParkingPlace={() => handleAddParkingPlace(parkingPlace)} // Подаваме правилната функция за модала
                    />
                ))}
                <div 
                    className="project-card add-apartment-card"
                    onClick={handleAddNewParkingPlace} 
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </div>

            {/* Модал за актуализиране на паркомясто */}
            {selectedParkingPlace && (
                <UpdateParkingPlace
                    show={!!selectedParkingPlace}
                    handleClose={handleCloseModal}
                    parkingPlaceNumber={selectedParkingPlace.number}
                    cooperationNumber={id}
                    floors={floors}
                    parkingId={selectedParkingPlace.id}
                    refreshParkingPlaces={fetchParkingPlacesAndFloors} // Предаваме функцията за презареждане
                />
            )}
        </div>
    );
};

export default AllParkingPlaces;
