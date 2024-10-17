import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CreateSell.css';
import axios from 'axios';
import ContractContent from './ContractContent';
import ObjectsPriceContent from './ObjectsPriceContent';
import PaymentContent from './PaymentContent';
import AllApartmentsForSaleModal from './modals/ApartmentsModal'; // Import the modal
import AllGaragesForSaleModal from './modals/GaragesModal';
import AllParkingPlacesForSaleModal from './modals/ParkingPlacesModal';

const CreateSell = () => {
    const { id } = useParams();
    // State to control modal visibility
    const [selectedApartments, setSelectedApartments] = useState([]); // State to store selected apartments (whole objects)
    const [showModal, setShowModal] = useState(false); 
    const [showGarageModal, setShowGarageModal] = useState(false); 
    const [showParkingPlaceModal, setShowParkingPlaceModal] = useState(false); 
    
    const [formData, setFormData] = useState({
        id: id,
        contractNumber: '',
        purchaserFirstName: '',
        purchaserLastName: '',
        discount: '',
        brokerFirstName: '',
        brokerLastName: '',
        brokerProfit: '',
        entrance: '',
        floor: '',
        apartment: '',
        undergroundFloor: '',
        garage: '',
        parkingPlace: '',
        paymentSchemaId: '',
        installments: '',
        installmentDates: ''
    });

    const [paymentSchemas, setPaymentSchemas] = useState([]); 
    const [apartments, setApartments] = useState([]);
    const [garages, setGarages] = useState([]);
    const [parkingPlaces, setParkingPlaces] = useState([]);
    const [success, setSuccess] = useState(null);
    const [selectedGarages, setSelectedGarages] = useState([]);
    const handleApartmentSelect = (apartment) => {
        // Проверяваме дали този апартамент вече е избран, за да избегнем дублиране
        if (!selectedApartments.some(a => a.id === apartment.id)) {
            // Добавяме целия обект на апартамента в масива, без да заменяме предишните
            setSelectedApartments((prevSelected) => [...prevSelected, apartment]);
        }
    };

    const handleGaragesSelect = (garage) => {
        
        // Проверяваме дали този апартамент вече е избран, за да избегнем дублиране
        if (!selectedApartments.some(g => g.id === garage.id && g.number === garage.number && g.type === 'garage')) {
            setSelectedApartments((prevSelected) => [...prevSelected, garage]);
        }
        
        
    };
    const handleParkingPlaceSelect = (parkingPlace) => {
        
        // Проверяваме дали този апартамент вече е избран, за да избегнем дублиране
        if (!selectedApartments.some(p => p.id === parkingPlace.id)) {
            // Добавяме целия обект на апартамента в масива, без да заменяме предишните
            setSelectedApartments((prevSelected) => [...prevSelected, parkingPlace]);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentSchemasResponse = await axios.get('http://localhost:8080/payment-schema');
                setPaymentSchemas(paymentSchemasResponse.data);

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

    const handleFileChange = (e) => {
        const filePath = e.target.files[0].name;
        console.log('Selected file path:', filePath);
    };

    const handleFileClick = () => {
        document.getElementById('fileInput').click();
    };

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



    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenGarageModal = () => {
        setShowGarageModal(true);
    };

    const handleCloseGarageModal = () => {
        setShowGarageModal(false);
    };

    const handleOpenParkingPlaceModal = () => {
        setShowParkingPlaceModal(true);
    };

    const handleCloseParkingPlaceModal = () => {
        setShowParkingPlaceModal(false);
    };


    return (
        <div className="create-sell-container">
            <h1>Create Sell</h1>
            <form onSubmit={handleSubmit}>
                <ContractContent 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleFileClick={handleFileClick}
                    handleFileChange={handleFileChange}
                    success={success}
                />

                <ObjectsPriceContent 
                    formData={formData}
                    handleInputChange={handleInputChange}
                    success={success}
                    apartments={apartments} 
                    garages={garages} 
                    parkingPlaces={parkingPlaces} 
                    onApartmentClick={handleOpenModal} // Pass the function to open the modal
                    onGarageClick={handleOpenGarageModal}
                    onParkingPlaceClick={handleOpenParkingPlaceModal}
                    handleApartmentSelected={handleApartmentSelect}
                    selectedApartments={selectedApartments} 
                />

                <PaymentContent
                    formData={formData}
                    handleInputChange={handleInputChange}
                    paymentSchemas={paymentSchemas}
                    success={success}
                />

                <button type="submit" className="btn btn-outline-primary mt-3">
                    Create Sell
                </button>
            </form>

            {/* Modal Component */}
            <AllApartmentsForSaleModal 
                show={showModal} 
                handleClose={handleCloseModal} 
                apartments={apartments} 
                onApartmentSelect={handleApartmentSelect} // Pass select function to modal
            />
            <AllGaragesForSaleModal
            show={showGarageModal}
            handleClose={handleCloseGarageModal}
            garages={garages}
            onGaragesSelect={handleGaragesSelect}/>
            <AllParkingPlacesForSaleModal
            show={showParkingPlaceModal}
            handleClose={handleCloseParkingPlaceModal}
            parkingPlaces={parkingPlaces}
            onParkingPlacesSelect={handleParkingPlaceSelect}/>
        </div>
    );
};

export default CreateSell;
