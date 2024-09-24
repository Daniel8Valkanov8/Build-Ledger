import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../apartment/Apartment.css';
import ParkingPlaceComponent from './ParkingPlaceComponent';

const AllParkingPlaces = () => {
    const { id } = useParams();
    const [parkingPlaces, setgarages] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGarages = async () => {
            console.log(`Fetching apartments for cooperation ${id}`);
            try {
                const response = await axios.get(`http://localhost:8080/parking-places/${id}`);
                console.log(response)
                setgarages(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch apartments.');
            }
        };

        fetchGarages();
    }, [id]);

    const handleAddParkingPlace = () => {
        navigate(`parking-places/add/${id}`);
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
                    />
                ))}
                <div 
                    className="project-card add-apartment-card"
                    onClick={handleAddParkingPlace} 
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AllParkingPlaces;