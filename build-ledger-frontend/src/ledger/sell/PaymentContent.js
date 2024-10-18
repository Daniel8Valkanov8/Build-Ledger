import React, { useState } from 'react';
import './CreateSell.css';
import DatePicker from 'react-datepicker'; // Замяна на Datetime с DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Добавяме стиловете за react-datepicker

const PaymentContent = ({ formData, handleInputChange, paymentSchemas, success, totalPrice }) => {
    const [selectedSchema, setSelectedSchema] = useState(null);
    const [installments, setInstallments] = useState([]);

    const handlePaymentSchemaChange = (e) => {
        const selectedSchemaId = e.target.value;
        const schema = paymentSchemas.find(s => s.id === parseInt(selectedSchemaId));
        setSelectedSchema(schema);

        if (schema) {
            const initialInstallments = Array(schema.installmentCount).fill('');
            setInstallments(initialInstallments);
        } else {
            setInstallments([]);
        }

        handleInputChange(e);
    };

    const handleInstallmentChange = (index, value) => {
        const newInstallments = [...installments];
        newInstallments[index] = value;
        setInstallments(newInstallments);

        const updatedInstallments = newInstallments.join(',');
        handleInputChange({ target: { name: 'installments', value: updatedInstallments } });
    };

    const handleDateChange = (date, name) => {
        handleInputChange({ target: { name, value: date } });
    };

    return (
        <div className="contract-purchaser-broker-container">
            <div className="contract-container">
                {success && <div className="alert alert-success">{success}</div>}

                <div className="form-group">
                    <label htmlFor="paymentSchema">Payment Schema</label>
                    <select
                        className="form-control"
                        id="paymentSchema"
                        name="paymentSchemaId"
                        value={formData.paymentSchemaId}
                        onChange={handlePaymentSchemaChange}
                    >
                        <option value="">Select a payment schema</option>
                        {paymentSchemas.length > 0 ? (
                            paymentSchemas.map((schema) => (
                                <option key={schema.id} value={schema.id}>
                                    {schema.title}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Loading payment schemas...</option>
                        )}
                    </select>
                </div>
            </div>

            <div className="purchaser-container">
                <label htmlFor="purchaserFirstName">Installments and Dates</label>

                {selectedSchema && installments.map((installment, index) => (
                    <div className="form-group" key={index}>
                        <label htmlFor={`installment${index + 1}`}>
                            Installment {index + 1} ({selectedSchema.percentOfInstallments[index]}%)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id={`installment${index + 1}`}
                            name={`installment${index + 1}`}
                            placeholder={`€`}
                            value={installment}
                            onChange={(e) => handleInstallmentChange(index, e.target.value)}
                        />
                        <div className="form-group">
                            <label htmlFor={`installmentDate${index + 1}`}>Installment Date</label>
                            <DatePicker
                                selected={formData[`installmentDate${index + 1}`]}
                                onChange={(date) => handleDateChange(date, `installmentDate${index + 1}`)}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="broker-container">
                <div className="form-group">
                    <label htmlFor="description">Notes</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="5"
                        placeholder="Add description to this sell"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentContent;
