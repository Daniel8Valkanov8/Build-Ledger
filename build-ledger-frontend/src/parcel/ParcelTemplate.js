import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BuildingComponent from '../building/BuildingComponent'; 
// Импортираме компонента за сградите
import '../all-projects/project-component/Projects.css';

const ParcelTemplate = () => {
    const { id } = useParams(); // Вземете ID-то на парцела от URL параметрите
    const [parcel, setParcel] = useState(null);
    const [buildings, setBuildings] = useState([]); // Съхранявайте сградите
    const [error, setError] = useState(null);

    useEffect(() => {
        // Функция за извличане на данни за парцела
        const fetchParcel = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/parcels/${id}`); // Извлечете данните от API-то
                setParcel(response.data); // Запазете данните в състоянието на компонента
                // Извлечете сградите свързани с този парцел
                const buildingsResponse = await axios.get(`http://localhost:8080/buildings/allByParcel/${id}`);
                setBuildings(buildingsResponse.data); // Запазете сградите в състоянието на компонента
            } catch (error) {
                console.error('Error fetching parcel or building data:', error);
                setError('Error fetching data');
            }
        };

        fetchParcel(); // Извикайте функцията за извличане на данни
    }, [id]);

    if (error) {
        return <div>{error}</div>; // Покажете съобщение за грешка
    }

    if (!parcel) {
        return <div>Loading...</div>; // Покажете съобщение за зареждане
    }

    return (
        <div>
            <h1>In parcel of project: {parcel.projectTitle}</h1>
            <h2>Buildings:</h2>
            <div className="buildings-container">
                {buildings.map(building => (
                    <BuildingComponent key={building.id} building={building} projectTitle={parcel.projectTitle} />
                ))}
            </div>
        </div>
    );
};

export default ParcelTemplate;
