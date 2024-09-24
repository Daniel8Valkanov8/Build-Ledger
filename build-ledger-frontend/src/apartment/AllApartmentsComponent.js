import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApartmentComponent from './ApartmentComponent';
import './Apartment.css';

const AllApartments = () => {
    const { id } = useParams();
    const [apartments, setApartments] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApartments = async () => {
            console.log(`Fetching apartments for cooperation ${id}`);
            try {
                const response = await axios.get(`http://localhost:8080/apartments/${id}`);
                console.log(response);
                setApartments(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch apartments.');
            }
        };

        fetchApartments();
    }, [id]);

    const handleAddApartment = () => {
        navigate(`/apartment/add/${id}`);
    };

    return (
        <div>
            <h1>Apartments in Cooperation {id}</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="apartment-container">
                {apartments.map(apartment => (
                    <ApartmentComponent
                        key={apartment.id}
                        apartment={apartment}
                        projectTitle={`Cooperation ${id}`}
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
        </div>
    );
};

export default AllApartments;
