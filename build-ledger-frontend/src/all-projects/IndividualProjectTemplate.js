import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ParcelComponent from '../parcel/ParcelComponent'; // Импорт на новия компонент

const IndividualProjectTemplate = () => {
    const { id } = useParams(); // Взимаме ID на проекта от URL параметрите
    const [project, setProject] = useState(null);
    const [parcel, setParcel] = useState(null); // Съхраняваме данни за парцела
    const [error, setError] = useState(null); // Съхраняваме евентуални грешки

    useEffect(() => {
        const fetchProjectAndParcel = async () => {
            try {
                // Първо правим заявката за проекта
                const projectResponse = await axios.get(`http://localhost:8080/projects/${id}`);
                setProject(projectResponse.data); // Запазваме данните за проекта в state

                // Вземаме ID на парцела от респонса за проекта
                const parcelId = projectResponse.data.parcel;
                console.log("Parcel ID:", parcelId); // Debug: Проверете дали parcelId е валиден

                if (parcelId) {
                    // Правим GET заявка за парцела по parcelId само ако parcelId е валиден
                    const parcelResponse = await axios.get(`http://localhost:8080/parcels/${parcelId}`);
                    setParcel(parcelResponse.data); // Запазваме данните за парцела в state
                } else {
                    setError("Parcel ID is undefined or invalid");
                }
            } catch (error) {
                console.error('Error fetching project or parcel:', error);
                setError('Error fetching data'); // Запазваме грешка в state
            }
        };

        if (id) {
            fetchProjectAndParcel();
        } else {
            setError('Project ID is undefined');
        }
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!project) {
        return <p>Loading project...</p>;
    }

    return (
        <div>
            <h1>Project: {project.title}</h1> {/* Визуализиране на заглавието на проекта */}

            {parcel && ( // Визуализираме ParcelComponent само ако парцелът е зареден
                <ParcelComponent parcel={parcel} />
            )}
        </div>
    );
};

export default IndividualProjectTemplate;
