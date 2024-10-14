import React from 'react';
import './CreateSell.css';
const PaymentContent = ({ formData, handleInputChange, paymentSchemas, success }) => {
    return (
        <div className="contract-purchaser-broker-container">
            <div className="contract-container">
                {success && <div className="alert alert-success">{success}</div>}
                
                {/* Dropdown за избор на схема на плащане */}
                <div className="form-group">
                    <label htmlFor="paymentSchema">Payment Schema</label>
                    <select
                        className="form-control"
                        id="paymentSchema"
                        name="paymentSchemaId"
                        value={formData.paymentSchemaId}
                        onChange={handleInputChange}
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
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="installments"
                        name="installments"
                        placeholder="€"
                        value={formData.installments || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="installmentDates"
                        name="installmentDates"
                        placeholder="Enter dates"
                        value={formData.installmentDates || ''}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentContent;
