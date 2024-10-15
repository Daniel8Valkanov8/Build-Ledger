import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApartmentComponent from './ApartmentComponent';
import UpdateApartment from './UpdateApartment'; // Импортираме UpdateApartment компонента
import './Apartment.css';

const AllApartments = () => {
    const { id } = useParams();
    const [apartments, setApartments] = useState([]);
    const [floors, setFloors] = useState([]); 
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Функция за презареждане на апартаментите
    const fetchApartmentsAndFloors = async () => {
        console.log(`Fetching apartments and floors for cooperation ${id}`);
        try {
            const [apartmentsResponse, floorsResponse] = await Promise.all([
                axios.get(`http://localhost:8080/apartments/${id}`),
                axios.get(`http://localhost:8080/floors/${id}`)
            ]);

            setApartments(apartmentsResponse.data);
            setFloors(floorsResponse.data);
            console.log("Apartments:", apartmentsResponse.data);
            console.log("Floors:", floorsResponse.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch apartments and floors.');
        }
    };

    useEffect(() => {
        fetchApartmentsAndFloors();
    }, [id]);

    const handleAddApartment = (apartment) => {
        setSelectedApartment(apartment);
    };

    const handleCloseModal = () => {
        setSelectedApartment(null);
    };

    return (
        <div>
            <h1>Apartments</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="apartment-container">
                {apartments.map(apartment => {
                    // Намираме съответния етаж по `floorId`
                    const floor = floors.find(floor => floor.id === apartment.floorId);
                    const floorNumber = floor ? floor.number : 'Unknown'; // Показваме номера на етажа или 'Unknown', ако няма етаж
    
                    return (
                        <ApartmentComponent
                            key={apartment.id}
                            apartment={apartment}
                            projectTitle={`Cooperation ${id}`}
                            floorNumber={floorNumber} // Предаваме номера на етажа
                            onAddApartment={() => handleAddApartment(apartment)}
                        />
                    );
                })}
            </div>
    
            {selectedApartment && (
                <UpdateApartment
                    show={!!selectedApartment}
                    handleClose={handleCloseModal}
                    apartmentNumber={selectedApartment.number}
                    cooperationNumber={id}
                    floors={floors}
                    apartmentId={selectedApartment.id}
                    refreshApartments={fetchApartmentsAndFloors} // Предаваме функцията за презареждане
                />
            )}
        </div>
    );
};

export default AllApartments;
