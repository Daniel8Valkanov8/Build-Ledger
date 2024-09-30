import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePaymentSchema.css';

const CreatePaymentSchema = () => {
    const [formData, setFormData] = useState({
        count: '',
        installments: []
    });
    
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [paymentSchemas, setPaymentSchemas] = useState([]);

    // Fetch all payment schemas on component mount
    useEffect(() => {
        fetchPaymentSchemas();
    }, []);

    const fetchPaymentSchemas = async () => {
        try {
            const response = await axios.get('http://localhost:8080/payment-schema');
            // Set schemas in reverse order (newest first)
            setPaymentSchemas(response.data.reverse());
        } catch (error) {
            console.error("Error fetching payment schemas", error);
        }
    };

    // Обработва промяната в полето за брой вноски
    const handleInputChange = (e) => {
        const { value } = e.target;

        let newErrors = { ...errors };
        let newInstallments = [];

        if (isNaN(value)) {
            newErrors.count = 'Value must be a number.';
        } else if (value > 10) {
            newErrors.count = 'Installments count cannot be more than 10.';
        } else {
            newErrors.count = null;
            // Генерира полета за всяка вноска
            newInstallments = Array.from({ length: Number(value) }, (_, i) => ({
                number: i + 1,
                value: ''
            }));
        }

        setFormData({
            ...formData,
            count: value,
            installments: newInstallments
        });

        setErrors(newErrors);
    };

    // Обработва промяна в стойността на всяка отделна вноска
    const handleInstallmentChange = (e, index) => {
        const { value } = e.target;
        const updatedInstallments = formData.installments.map((installment, i) =>
            i === index ? { ...installment, value } : installment
        );
        setFormData({
            ...formData,
            installments: updatedInstallments
        });
    };

    // Проверка дали сборът на вноските е 100
    const validateTotal = (installments) => {
        const total = installments.reduce((sum, inst) => sum + Number(inst.value), 0); // Изчислява сбора
        return total === 100;
    };

    // Генерира заглавие на схемата на база проценти
    const generateTitle = (installments) => {
        return installments.map(inst => inst.value).join('-');
    };

    // Обработва изпращането на формуляра
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateTotal(formData.installments)) {
            setErrors({ ...errors, total: 'The total percentage must be 100.' });
            return;
        } else {
            setErrors({ ...errors, total: null });
        }

        // Създава обект за заявката
        const requestData = {
            title: generateTitle(formData.installments),
            installmentCount: formData.count,
            percentOfInstallments: formData.installments.map(inst => Number(inst.value))
        };

        try {
            // Изпраща POST заявка към backend
            const response = await axios.post('http://localhost:8080/payment-schema/create', requestData);
            setSuccess('Schema created successfully!');

            // Добавя новата схема най-отгоре и презарежда списъка
            setPaymentSchemas([response.data, ...paymentSchemas]);

            // Изчиства формуляра след успешно създаване
            setFormData({ count: '', installments: [] });
        } catch (error) {
            console.error("Error creating payment schema", error);
        }
    };

    return (
        <div className="payment-schema-container">
            {/* Лява колона: Всички схеми на плащане */}
            <div className="schema-list">
                <h1 className='schema-title'>All Payment Schemas</h1>
                {paymentSchemas.length > 0 ? (
                    paymentSchemas.map((schema, index) => (
                        <div key={index} className="schema-item">
                            <h2>{schema.title}</h2>
                            <p>Installments: {schema.installmentCount}</p>
                            <hr /> {/* Разделителна линия между схемите */}
                        </div>
                    ))
                ) : (
                    <p>No schemas available</p>
                )}
            </div>

            {/* Дясна колона: Форма за създаване на нова схема */}
            <div className="card mt-4 form-container">
                <h1 className='schema-title'>Create Payment Schema</h1>
                <form onSubmit={handleSubmit}>
                    {success && <div className="alert alert-success">{success}</div>}

                    <div className="form-group-count">
                        <label htmlFor="count">Count Installments</label>
                        <input
                            type="text"
                            name="count"
                            className={`form-control no-spinner input-small ${errors.count ? 'is-invalid' : ''}`}
                            value={formData.count}
                            onChange={handleInputChange}
                            placeholder="Count"
                        />
                        {errors.count && <div className="invalid-feedback">{errors.count}</div>}
                    </div>

                    {/* Генерира нови текстови полета на база въведения брой вноски */}
                    {formData.installments.map((installment, index) => (
                        <div key={index} className="form-group-installment">
                            <label htmlFor={`installment-${installment.number}`}>
                                Installment {installment.number}
                            </label>
                            <input
                                type="text"
                                id={`installment-${installment.number}`}
                                className="form-control input-small"
                                placeholder="%"
                                value={installment.value}
                                onChange={(e) => handleInstallmentChange(e, index)}
                            />
                        </div>
                    ))}

                    {/* Показва грешка, ако сборът не е 100 при изпращане */}
                    {errors.total && <div className="invalid-feedback text-center">{errors.total}</div>}

                    <button type="submit" className="btn btn-outline-primary mt-5 schema">
                        Create Schema                
                    </button> 
                </form>
            </div>
        </div>
    );
};

export default CreatePaymentSchema;
