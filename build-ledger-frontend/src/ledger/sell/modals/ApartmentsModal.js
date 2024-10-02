import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



const AllApartmentsModal = ({ show, handleClose, cooperationNumber, }) => {
    const { id } = useParams();
    const [apartments, setApartments] = useState([]);
    const [floors, setFloors] = useState([]); 
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Функция за презареждане на апартаментите

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/apartments/is-free/${cooperationNumber}`);
                setApartments(response.data); // Зарежда данните за апартаментите
            } catch (error) {
                console.error('Error fetching apartments:', error);
                setError('Could not fetch apartments');
            }
        };
        if (show) {
            fetchApartments();
        }
    }, [show, cooperationNumber]);
    

    const handleCloseModal = () => {
        setSelectedApartment(null);
    };
    
    return (
        <div className={`modal ${show ? 'show' : ''}`}
            style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            tabIndex="-1"
            role="dialog">
            <div className="modal-content">
                <button onClick={handleClose} className="close-btn">Close</button>
                <h2>Free Apartments</h2>
                <ul>
                    {apartments.length > 0 ? (
                        apartments.map((apartment) => (
                            <li key={apartment.id} onClick={() => setSelectedApartment(apartment)}>
                                {apartment.number}
                            </li>
                        ))
                    ) : (
                        <p>No free apartments available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
    
};

export default AllApartmentsModal;
