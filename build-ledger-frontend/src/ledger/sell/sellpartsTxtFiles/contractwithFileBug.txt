import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ContractContent.css';

const ContractContent = ({ formData, handleInputChange, handleFileClick, handleFileChange, success }) => {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileUploaded, setFileUploaded] = useState(null);

    const handleFileUpload = (event) => {
        setUploading(true);
        const file = event.target.files[0];

        if (file) {
            let progress = 0;
            setFileUploaded(file); // Записваме файла в състоянието
            const interval = setInterval(() => {
                progress += 10; // Увеличаваме прогреса с 10%
                setUploadProgress(progress);

                if (progress >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    setUploadProgress(100);
                }
            }, 200); // Актуализираме на всеки 200 ms

            // Извикваме външната функция за обработка на файла
            handleFileChange(event);
        }
    };

    return (
        <div className="contract-purchaser-broker-container">
            {/* Contract Section */}
            <div className="contract-container">
                {success && <div className="alert alert-success">{success}</div>}
                <label htmlFor="contractNumber">Import Contract</label>
                <div className="form-group contract-file-group">
                
                <div className="input-file-container" onClick={handleFileClick}>
                {/* Centered and Enlarged Upload Icon */}
                    <i className="bi bi-upload upload-icon"></i>
                </div>

    {/* Progress bar or success message */}
    {uploading ? (
        <div className="progress progress-custom">
            <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow={uploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${uploadProgress}%` }}
            >
                {uploadProgress}%
            </div>
        </div>
    ) : (
        fileUploaded && (
            <div className="upload-success-message">
                File uploaded successfully!
            </div>
        )
    )}
</div>

                
                <input 
                    type="file" 
                    id="fileInput" 
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload}
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
                        id="purchaserEmail"
                        name="purchaserEmail"
                        placeholder="Email"
                        value={formData.purchaserEmail || ''}
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
                        id="brokerEmail"
                        name="brokerEmail"
                        placeholder="Email"
                        value={formData.brokerEmail || ''}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContractContent;
