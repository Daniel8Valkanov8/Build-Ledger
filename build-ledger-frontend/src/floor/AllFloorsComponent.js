import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FloorComponent from './FloorComponet';
import '../apartment/Apartment.css';

const AllFloors = () => {
    const { id } = useParams();
    const [floors, setFloors] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFloors = async () => {
            console.log(`Fetching floors for cooperation ${id}`);
            try {
                const response = await axios.get(`http://localhost:8080/floors/${id}`);
                console.log(response);
                setFloors(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch floors.');
            }
        };

        fetchFloors();
    }, [id]);

    // Функция за добавяне на нов апартамент
    const handleAddFloor = () => {
        navigate(`/floor/add/${id}`);
    };

    return (
        <div>
            <h1>Floors</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="apartment-container">
                {floors.map(floor => (
                    <FloorComponent
                        key={floor.id}
                        floor={floor}
                        projectTitle={`Cooperation ${id}`}
                    />
                ))}
                {/* Кутийка за добавяне на нов апартамент */}
                <div 
                    className="project-card add-apartment-card"
                    onClick={handleAddFloor} 
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

export default AllFloors;
