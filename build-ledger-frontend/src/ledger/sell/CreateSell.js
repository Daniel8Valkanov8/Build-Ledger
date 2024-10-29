import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CreateSell.css';
import axios from 'axios';
import PaymentContent from './PaymentContent';

const CreateSell = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        id: id,
        paymentSchemaId: '',
        paymentSchema: '', // Поле за заглавието на схемата
        installments: '',
        installmentDates: ''
    });

    const [paymentSchemas, setPaymentSchemas] = useState([]);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    const createSell = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/cooperation/${id}/create-sell`,
                formData,  // Изпращане на formData като JSON
                {
                    headers: { 'Content-Type': 'application/json' }  // Указва JSON формат
                }
            );

            console.log('POST request successful', response.data);
            setSuccess('Sell created successfully!');
        } catch (error) {
            console.error('Error creating sell', error);
            setSuccess(null);
        }
    };

    return (
        <div className="create-sell-container">
            <h1>Create Sell</h1>
            <form onSubmit={handleSubmit}>
                <PaymentContent
                    formData={formData}
                    handleInputChange={handleInputChange}
                    paymentSchemas={paymentSchemas}
                    success={success}
                />
                <button type="submit" className="btn btn-outline-primary mt-3" onClick={createSell}>
                    Create Sell
                </button>
            </form>
        </div>
    );
};

export default CreateSell;
