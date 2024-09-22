import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CooperationNavbar from '../../navigation/CooperationNavbar';

const CooperationTemplate = () => {
    const location = useLocation();
    const { projectTitle, building } = location.state || {
        projectTitle: "Unknown Project", 
        building: { title: "Unknown Cooperation" }
    };

    const [formData, setFormData] = useState({
        id: building.id,  // добавяме ID-то на кооперацията
        entrance: '',
        floor: '',
        apartment: '',
        undergroundFloor: '',
        garage: '',
        parkingPlaces: ''  // добавяме поле за паркомясто
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.entrance) newErrors.entrance = 'Entrance Count is required';
        if (!formData.floor) newErrors.floor = 'Floor Count is required';
        if (!formData.apartment) newErrors.apartment = 'Apartment Count is required';
        if (!formData.undergroundFloor) newErrors.undergroundFloor = 'Underground Floor Count is required';
        if (!formData.garage) newErrors.garage = 'Garage Count is required';
        if (!formData.parkingPlaces) newErrors.parkingPlaces = 'Parking Place Count is required';

        return newErrors;
    };

    const createBuilding = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                const response = await axios.post('http://localhost:8080/quick-create', formData);
                console.log('Building created successfully:', response.data);
                setSuccess('Project created successfully!');
                setErrors({});

                setFormData({
                    id: building.id,
                    entrance: '',
                    floor: '',
                    apartment: '',
                    undergroundFloor: '',
                    garage: '',
                    parkingPlaces: ''  // нулираме и новото поле
                });
            } catch (error) {
                console.error('Error creating building:', error);
                setSuccess(null);
            }
        }
    };

    return (
        <div>
            <h1>Cooperation: {building.title} in {projectTitle}</h1>
            <div className="buildings-container">
                <div>Description: {building.description}</div>
                <div>Rsp: {building.rsp}</div>
                <div>Stages: AKT 14, AKT 15</div>
            </div>
            
        </div>
    );
};

export default CooperationTemplate;
