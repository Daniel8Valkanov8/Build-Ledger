import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


import FloorComponent from './FloorComponet';

const AllFloors = () => {
    const { id } = useParams();
    const [floors, setFloors] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFloors = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/floors/${id}`);
                setFloors(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFloors();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>All Floors</h1>
            {floors.map((floor) => (
                <FloorComponent key={floor.id} floor={floor} />
            ))}
        </div>
    );
};

export default AllFloors;
