// CreateSell.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CreateSell.css';
import axios from 'axios';
import ContractContent from './ContractContent';
import PaymentContent from './PaymentContent';
import ObjectsPriceContent from './ObjectsPriceContent';
import AllApartmentsForSaleModal from './modals/ApartmentsModal';
import AllGaragesForSaleModal from './modals/GaragesModal';
import AllParkingPlacesForSaleModal from './modals/ParkingPlacesModal';

const CreateSell = () => {
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [paymentSchemas, setPaymentSchemas] = useState([]);
    const [success, setSuccess] = useState(null);
    {/*objectPriceContentstates*/}

    const [selectedObjects, setSelectedObjects] = useState([]);
    const [prepareObjectsToPost, setPrepareObjectsToPost] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const [showGarageModal, setShowGarageModal] = useState(false); 
    const [showParkingPlaceModal, setShowParkingPlaceModal] = useState(false);
    const [apartments, setApartments] = useState([]);
    const [garages, setGarages] = useState([]);
    const [parkingPlaces, setParkingPlaces] = useState([]);
    
    const [formData, setFormData] = useState({
        id: id,

        purchaserFirstName: '',
        purchaserLastName: '',
        purchaserEmail: '',
        brokerFirstName: '',
        brokerLastName: '',
        brokerEmail: '',

        /*objectPriceContentstates*/
        discountInEuro: '',
        brokerProfitInEuro: '',
        brokerProfitInPercentage: '',
        totalPriceInEuro: '',

        paymentSchemaId: '',
        installments: [],
        description: ''
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

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

                const paymentSchemasResponse = await axios.get('http://localhost:8080/payment-schema');
                setPaymentSchemas(paymentSchemasResponse.data);
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

    const handleInstallmentsChange = (index, field, value) => {
        const newInstallments = [...formData.installments];
        if (!newInstallments[index]) {
            newInstallments[index] = { sumInEuros: '', date: null };
        }
        newInstallments[index][field] = value;

        setFormData({
            ...formData,
            installments: newInstallments
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form Data:', formData);
    };
    const createSell = async () => {
        const dataToSend = new FormData();
    
        // Подгответе JSON обекта за изпращане като текстово поле
        const jsonData = {
            id: formData.id,
            purchaserFirstName: formData.purchaserFirstName,
            purchaserLastName: formData.purchaserLastName,
            purchaserEmail: formData.purchaserEmail,
            brokerFirstName: formData.brokerFirstName,
            brokerLastName: formData.brokerLastName,
            brokerEmail: formData.brokerEmail,
            paymentSchema: formData.paymentSchemaId,
            description: formData.description,
            selfContainedUnits: prepareObjectsToPost,
            discountInEuro: parseFloat(formData.discountInEuro),
            totalPriceInEuro: parseFloat(formData.totalPriceInEuro),
            brokerProfitInPercentage: parseFloat(formData.brokerProfitInPercentage),
            brokerProfitInEuro: parseFloat(formData.brokerProfitInEuro),
            installmentAndDates: formData.installments
                .filter(installment => installment.date)
                .map(installment => ({
                    sumInEuros: parseFloat(installment.sumInEuros),
                    date: installment.date ? installment.date.toISOString().split('T')[0] : null
                }))
        };
    
        // Добавете JSON данни като текстово поле
        dataToSend.append("data", JSON.stringify(jsonData));
        // Добавете файла
        dataToSend.append("file", selectedFile);
    
        try {
            const response = await axios.post(
                `http://localhost:8080/cooperation/${id}/create-sell`,
                dataToSend
            );
    
            console.log('POST request successful', response.data);
            setSuccess('Sell created successfully!');
        } catch (error) {
            console.error('Error creating sell', error);
            setSuccess(null);
        }
    };
    
    
    
    
    {/*objectPriceContentstates*/}

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
                <ContractContent
                formData={formData}
                handleInputChange={handleInputChange}
                handleFileClick={() => document.getElementById('fileInput').click()}
                handleFileChange={handleFileChange}
                success={success}
                />

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

                <PaymentContent
                    formData={formData}
                    handleInputChange={handleInputChange}
                    paymentSchemas={paymentSchemas}
                    success={success}
                    handleInstallmentsChange={handleInstallmentsChange}
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
