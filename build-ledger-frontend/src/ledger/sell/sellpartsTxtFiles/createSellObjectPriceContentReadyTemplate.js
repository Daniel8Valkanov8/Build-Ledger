import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CreateSell.css';
import axios from 'axios';

import ObjectsPriceContent from './ObjectsPriceContent';

import AllApartmentsForSaleModal from './modals/ApartmentsModal';
import AllGaragesForSaleModal from './modals/GaragesModal';
import AllParkingPlacesForSaleModal from './modals/ParkingPlacesModal';

const CreateSell = () => {
    const { id } = useParams();

    const [selectedObjects, setSelectedObjects] = useState([]);
    const [prepareObjectsToPost, setPrepareObjectsToPost] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const [showGarageModal, setShowGarageModal] = useState(false); 
    const [showParkingPlaceModal, setShowParkingPlaceModal] = useState(false); 

    const [formData, setFormData] = useState({
        discountInEuro: '',
        brokerProfitInEuro: '',
        brokerProfitInPercentage: '',
        totalPriceInEuro: ''
    });

    const [apartments, setApartments] = useState([]);
    const [garages, setGarages] = useState([]);
    const [parkingPlaces, setParkingPlaces] = useState([]);
    const [success, setSuccess] = useState(null);

    const handleApartmentSelect = (apartment) => {
        if (!selectedObjects.some(a => a.id === apartment.id)) {
            setSelectedObjects((prevSelected) => [...prevSelected, apartment]);
            setPrepareObjectsToPost((prevPrepared) => [
                ...prevPrepared,
                { id: apartment.id, number: apartment.number, priceEur: apartment.priceEur }
            ]);
            console.log("Prepared Objects to Post:", prepareObjectsToPost);
        }
    };

    const handleGaragesSelect = (garage) => {
        if (!selectedObjects.some(g => g.id === garage.id && g.number === garage.number && g.type === 'garage')) {
            setSelectedObjects((prevSelected) => [...prevSelected, garage]);
            setPrepareObjectsToPost((prevPrepared) => [
                ...prevPrepared,
                { id: garage.id, number: garage.number, priceEur: garage.priceEur }
            ]);
            console.log("Prepared Objects to Post:", prepareObjectsToPost);
        }
    };

    const handleParkingPlaceSelect = (parkingPlace) => {
        if (!selectedObjects.some(p => p.id === parkingPlace.id)) {
            setSelectedObjects((prevSelected) => [...prevSelected, parkingPlace]);
            setPrepareObjectsToPost((prevPrepared) => [
                ...prevPrepared,
                { id: parkingPlace.id, number: parkingPlace.number, priceEur: parkingPlace.priceEur }
            ]);
            console.log("Prepared Objects to Post:", prepareObjectsToPost);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apartmentsResponse = await axios.get(`http://localhost:8080/apartments/${id}`);
                setApartments(apartmentsResponse.data);

                const garagesResponse = await axios.get(`http://localhost:8080/garages/${id}`);
                setGarages(garagesResponse.data);

                const parkingPlacesResponse = await axios.get(`http://localhost:8080/parking-places/${id}`);
                setParkingPlaces(parkingPlacesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const createSell = async () => {
        const requestData = {
            selfContainedUnits: prepareObjectsToPost,
            discountInEuro: parseFloat(formData.discountInEuro),
            totalPriceInEuro: parseFloat(formData.totalPriceInEuro),
            brokerProfitInPercentage: parseFloat(formData.brokerProfitInPercentage),
            brokerProfitInEuro: parseFloat(formData.brokerProfitInEuro)
        };

        try {
            const response = await axios.post(`http://localhost:8080/cooperation/${id}/create-sell`, requestData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('POST request successful', response.data);
            setSuccess('Sell created successfully!');
        } catch (error) {
            console.error('Error creating sell', error);
            setSuccess(null);
        }
    };
    const handleDiscountChange = (discount) => {
        setFormData((prevData) => ({ ...prevData, discountInEuro: discount }));
    };

    const handleBrokerPercentChange = (percent) => {
        setFormData((prevData) => ({ ...prevData, brokerProfitInPercentage: percent }));
    };

    const handleBrokerProfitChange = (profit) => {
        setFormData((prevData) => ({ ...prevData, brokerProfitInEuro: profit }));
    };

    const handleTotalPriceChange = (totalPrice) => {
        setFormData((prevData) => ({ ...prevData, totalPriceInEuro: totalPrice }));
    };
    return (
        <div className="create-sell-container">
            <h1>Create Sell</h1>
            <form onSubmit={handleSubmit}>
            <ObjectsPriceContent
                    formData={formData}
                    handleInputChange={handleInputChange}
                    success={success}
                    onApartmentClick={() => setShowModal(true)}
                    onGarageClick={() => setShowGarageModal(true)}
                    onParkingPlaceClick={() => setShowParkingPlaceModal(true)}
                    selectedApartments={selectedObjects}
                    onDiscountChange={handleDiscountChange}
                    onBrokerPercentChange={handleBrokerPercentChange}
                    onBrokerProfitChange={handleBrokerProfitChange}
                    onTotalPriceChange={handleTotalPriceChange}
                />
                <button type="submit" className="btn btn-outline-primary mt-3" onClick={createSell}>
                    Create Sell
                </button>
            </form>

            <AllApartmentsForSaleModal 
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                apartments={apartments} 
                onApartmentSelect={handleApartmentSelect}
            />
            <AllGaragesForSaleModal
                show={showGarageModal}
                handleClose={() => setShowGarageModal(false)}
                garages={garages}
                onGaragesSelect={handleGaragesSelect}
            />
            <AllParkingPlacesForSaleModal
                show={showParkingPlaceModal}
                handleClose={() => setShowParkingPlaceModal(false)}
                parkingPlaces={parkingPlaces}
                onParkingPlacesSelect={handleParkingPlaceSelect}
            />
        </div>
    );
};

export default CreateSell;
