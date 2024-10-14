import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CreateSell.css';
import axios from 'axios';
import ContractContent from './ContractContent';
import ObjectsPriceContent from './ObjectsPriceContent';
import PaymentContent from './PaymentContent'; // Импортираме компонента

const CreateSell = () => {
    const { id } = useParams();

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
        paymentSchemaId: '',   // Добавяме поле за Payment Schema
        installments: '',       // Поле за вноски
        installmentDates: ''    // Поле за дати на вноските
    });
    
    const [paymentSchemas, setPaymentSchemas] = useState([]); 
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchPaymentSchemas = async () => {
            try {
                const response = await axios.get('http://localhost:8080/payment-schema');
                setPaymentSchemas(response.data);
            } catch (error) {
                console.error('Error fetching payment schemas:', error);
            }
        };
        fetchPaymentSchemas();
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
        // Тук ще използваш данните за подаване на заявка
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
                />

                {/* Прехвърляме paymentSchemas и handleInputChange на PaymentContent */}
                <PaymentContent
                    formData={formData}
                    handleInputChange={handleInputChange}
                    paymentSchemas={paymentSchemas}  // Прехвърляме данните от API
                    success={success}
                />

                <button type="submit" className="btn btn-outline-primary mt-3">
                    Create Sell
                </button>
            </form>
        </div>
    );
};

export default CreateSell;
;
