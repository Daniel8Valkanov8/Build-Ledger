import React, { useState } from 'react';
import './CreateSell.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PaymentContent = ({ formData, handleInputChange, paymentSchemas, success, handleInstallmentsChange }) => {
    const [selectedSchema, setSelectedSchema] = useState(null);
    const [installments, setInstallments] = useState([]);

    const handlePaymentSchemaChange = (e) => {
        const selectedSchemaId = e.target.value;
        const schema = paymentSchemas.find(s => s.id === parseInt(selectedSchemaId));
        setSelectedSchema(schema);

        if (schema) {
            const initialInstallments = Array(schema.installmentCount).fill({
                sumInEuros: '',
                date: null
            });
            setInstallments(initialInstallments);
        } else {
            setInstallments([]);
        }

        handleInputChange(e);
    };

    const handleInstallmentChange = (index, field, value) => {
        const newInstallments = [...installments];
        newInstallments[index] = {
            ...newInstallments[index],
            [field]: value
        };
        setInstallments(newInstallments);
        handleInstallmentsChange(index, field, value); // Updates installments in formData
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
                {selectedSchema && installments.map((installment, index) => (
                    <div className="form-group" key={index}>
                        <div className="installment-row">
                            <div className="installment-field">
                                <label htmlFor={`installment${index + 1}`}>
                                    Installment {index + 1} ({selectedSchema.percentOfInstallments[index]}%)
                                </label>
                                <input
                                    type="text"
                                    className="form-control installment-input"
                                    id={`installment${index + 1}`}
                                    placeholder="€"
                                    value={installment.sumInEuros}
                                    onChange={(e) => handleInstallmentChange(index, 'sumInEuros', e.target.value)}
                                />
                            </div>
                            <div className="installment-date-field">
                                <label htmlFor={`installmentDate${index + 1}`}>Installment Date</label>
                                <DatePicker
                                    selected={installment.date}
                                    onChange={(date) => handleInstallmentChange(index, 'date', date)}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control installment-date"
                                />
                            </div>
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
                        name="description"  // Ensure name is set to "description"
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
