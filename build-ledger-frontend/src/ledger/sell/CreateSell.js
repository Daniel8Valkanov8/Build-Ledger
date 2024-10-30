// CreateSell.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CreateSell.css';
import axios from 'axios';
import ContractContent from './ContractContent';
import PaymentContent from './PaymentContent';

const CreateSell = () => {
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [paymentSchemas, setPaymentSchemas] = useState([]);
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        id: id,

        purchaserFirstName: '',
        purchaserLastName: '',
        purchaserEmail: '',
        brokerFirstName: '',
        brokerLastName: '',
        brokerEmail: '',


        paymentSchemaId: '',
        installments: [],
        description: ''
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    
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
        try {
            
            const dataToSend = {
                id: formData.id,
                purchaserFirstName: formData.purchaserFirstName,
                purchaserLastName: formData.purchaserLastName,
                purchaserEmail: formData.purchaserEmail,
                brokerFirstName: formData.brokerFirstName,
                brokerLastName:formData.brokerLastName,
                brokerEmail: formData.brokerEmail,
                paymentSchemaId: formData.paymentSchemaId,
                description: formData.description, // Add description here
                installments: formData.installments
                    .filter(installment => installment.date) // Only include filled installments
                    .map(installment => ({
                        sumInEuros: parseFloat(installment.sumInEuros),
                        date: installment.date ? installment.date.toISOString().split('T')[0] : null
                    }))
            };
    
            const response = await axios.post(
                `http://localhost:8080/cooperation/${id}/create-sell`,
                dataToSend,
                {
                    headers: { 'Content-Type': 'application/json' }
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
                <ContractContent
                formData={formData}
                handleInputChange={handleInputChange}
                handleFileClick={() => document.getElementById('fileInput').click()}
                handleFileChange={handleFileChange}
                success={success}
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
        </div>
    );
};

export default CreateSell;
