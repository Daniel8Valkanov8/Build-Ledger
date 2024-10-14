import React from 'react';

const ContractContent = ({ formData, handleInputChange, handleFileClick, handleFileChange, success }) => {
    return (
        <div className="contract-purchaser-broker-container">
            {/* Contract Section */}
            <div className="contract-container">
                {success && <div className="alert alert-success">{success}</div>}
                <div className="form-group contract-file-group">
                    <label htmlFor="contractNumber">Contract Number</label>
                    <div className="input-file-container">
                        <div className="file-icon" onClick={handleFileClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
                                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="form-control no-spinner contract-input"
                            id="contractNumber"
                            name="contractNumber"
                            placeholder="№"
                            value={formData.contractNumber || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div> 
                <input 
                    type="file" 
                    id="fileInput" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange}
                />
            </div>

            {/* Purchaser Section */}
            <div className="purchaser-container">
                <div className="form-group">
                    <label htmlFor="purchaserFirstName">Purchaser</label>
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="purchaserFirstName"
                        name="purchaserFirstName"
                        placeholder="First name"
                        value={formData.purchaserFirstName || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="purchaserLastName"
                        name="purchaserLastName"
                        placeholder="Last name"
                        value={formData.purchaserLastName || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="discount"
                        name="discount"
                        placeholder="Discount"
                        value={formData.discount || ''}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* Broker Section */}
            <div className="broker-container">
                <div className="form-group">
                    <label htmlFor="brokerFirstName">Broker</label>
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="brokerFirstName"
                        name="brokerFirstName"
                        placeholder="First name"
                        value={formData.brokerFirstName || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="brokerLastName"
                        name="brokerLastName"
                        placeholder="Last name"
                        value={formData.brokerLastName || ''}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="brokerProfit"
                        name="brokerProfit"
                        placeholder="Profit"
                        value={formData.brokerProfit || ''}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContractContent;