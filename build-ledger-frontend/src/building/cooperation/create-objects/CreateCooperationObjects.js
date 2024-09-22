import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CreateCooperationObjects = () => {
    const { id } = useParams();  // Взима ID-то от параметрите на роута

    const [formData, setFormData] = useState({
        id: id,  // Използва ID-то от роута
        entrance: '',
        floor: '',
        apartment: '',
        undergroundFloor: '',
        garage: '',
        parkingPlace: ''  // Променено от parkingPlaces на parkingPlace
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
        if (!formData.parkingPlace) newErrors.parkingPlace = 'Parking Place Count is required';  // Променено от parkingPlaces на parkingPlace

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

                // Нулира формата след успешното създаване
                setFormData({
                    id: id,
                    entrance: '',
                    floor: '',
                    apartment: '',
                    undergroundFloor: '',
                    garage: '',
                    parkingPlace: ''  // Нулиране на parkingPlace
                });
            } catch (error) {
                console.error('Error creating building:', error);
                setSuccess(null);
            }
        }
    };

    return (
        <div className="card mt-4">
            <h1>Create New Building for Cooperation</h1>
            <form onSubmit={createBuilding}>
                {success && <div className="alert alert-success">{success}</div>}
                
                <div className="form-group">
                    <label htmlFor="entrance">Entrance Count</label>
                    <input
                        type="number"
                        className={`form-control ${errors.entrance ? 'is-invalid' : ''}`}
                        id="entrance"
                        name="entrance"
                        placeholder="Entrance Count"
                        value={formData.entrance}
                        onChange={handleInputChange}
                        min="1"
                    />
                    {errors.entrance && <small className="text-danger">{errors.entrance}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="floor">Floor Count</label>
                    <input
                        type="number"
                        className={`form-control ${errors.floor ? 'is-invalid' : ''}`}
                        id="floor"
                        name="floor"
                        placeholder="Floor Count"
                        value={formData.floor}
                        onChange={handleInputChange}
                        min="1"
                    />
                    {errors.floor && <small className="text-danger">{errors.floor}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="apartment">Apartment Count</label>
                    <input
                        type="number"
                        className={`form-control ${errors.apartment ? 'is-invalid' : ''}`}
                        id="apartment"
                        name="apartment"
                        placeholder="Apartment Count"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        min="1"
                    />
                    {errors.apartment && <small className="text-danger">{errors.apartment}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="undergroundFloor">Underground Floor Count</label>
                    <input
                        type="number"
                        className={`form-control ${errors.undergroundFloor ? 'is-invalid' : ''}`}
                        id="undergroundFloor"
                        name="undergroundFloor"
                        placeholder="Underground Floor Count"
                        value={formData.undergroundFloor}
                        onChange={handleInputChange}
                        min="1"
                    />
                    {errors.undergroundFloor && <small className="text-danger">{errors.undergroundFloor}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="garage">Garage Count</label>
                    <input
                        type="number"
                        className={`form-control ${errors.garage ? 'is-invalid' : ''}`}
                        id="garage"
                        name="garage"
                        placeholder="Garage Count"
                        value={formData.garage}
                        onChange={handleInputChange}
                        min="1"
                    />
                    {errors.garage && <small className="text-danger">{errors.garage}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="parkingPlace">Parking Place Count</label>
                    <input
                        type="number"
                        className={`form-control ${errors.parkingPlace ? 'is-invalid' : ''}`}
                        id="parkingPlace"
                        name="parkingPlace"  // Променено на "parkingPlace"
                        placeholder="Parking Place Count"
                        value={formData.parkingPlace}  // Променено на formData.parkingPlace
                        onChange={handleInputChange}
                        min="1"
                    />
                    {errors.parkingPlace && <small className="text-danger">{errors.parkingPlace}</small>}  {/* Променено на errors.parkingPlace */}
                </div>

                <button type="submit" className="btn btn-outline-primary mt-3">
                    Create Objects
                </button>
            </form>
        </div>
    );
};

export default CreateCooperationObjects;
