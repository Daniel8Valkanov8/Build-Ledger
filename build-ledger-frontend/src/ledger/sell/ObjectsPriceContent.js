import React, { useState, useEffect } from 'react';
import './ObjectsPriceContent.css';

const ObjectsPriceContent = ({ formData, handleInputChange, success, onApartmentClick, onGarageClick, onParkingPlaceClick, selectedApartments }) => {
    const [totalPrice, setTotalPrice] = useState(0); // Държим общата цена
    const [manualPrice, setManualPrice] = useState(null); // Съхраняваме ръчно въведената цена
    const [inputPrice, setInputPrice] = useState(''); // Държим текущото съдържание на полето

    useEffect(() => {
        // Изчисляваме общата цена на базата на добавените обекти
        const calculateTotalPrice = () => {
            const total = selectedApartments.reduce((sum, obj) => sum + obj.priceEur, 0);
            setTotalPrice(Math.round(total * 100) / 100); // Закръгляме до 2 знака
        };

        calculateTotalPrice();
    }, [selectedApartments]);

    const handlePriceInputChange = (e) => {
        // Държим текущата стойност на полето, но не извикваме автоматично setManualPrice
        const value = e.target.value;
        setInputPrice(value);
    };

    const handlePriceBlur = () => {
        // Когато потребителят загуби фокус от полето, актуализираме ръчно зададената цена
        const parsedPrice = parseFloat(inputPrice);
        setManualPrice(!isNaN(parsedPrice) ? Math.round(parsedPrice * 100) / 100 : null);
    };

    const getCurrentPrice = () => {
        // Връщаме ръчно въведената цена, ако има такава, иначе автоматичната цена
        return manualPrice !== null ? manualPrice : totalPrice;
    };

    useEffect(() => {
        // Синхронизираме полето с текущата цена
        setInputPrice(getCurrentPrice().toString());
    }, [totalPrice, manualPrice]);

    return (
        <div className="contract-purchaser-broker-container">
            <div className="contract-container">
                {success && <div className="alert alert-success">{success}</div>}
                <div className="form-group contract-file-group">
                    <label htmlFor="contractNumber">Add Objects</label>
                    <div className="input-file-container">
                        <div className="file-icon" onClick={onApartmentClick}>Apartment</div>
                        <div className="file-icon" onClick={onGarageClick}>Garage</div>
                        <div className="file-icon" onClick={onParkingPlaceClick}>Parking place</div>
                    </div>
                </div>
                <div className="added-objects-container">
                    <div className="added-objects-list">
                        {selectedApartments.length > 0 && (
                            <ul>
                                {selectedApartments.map((apartment, index) => (
                                    <li key={index}>{apartment.number}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="purchaser-container">
                <div className="form-group">
                    <label htmlFor="totalPrice">Total Price in €</label>
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="totalPrice"
                        value={inputPrice}
                        onChange={handlePriceInputChange} // Държим текущото съдържание без да го актуализираме автоматично
                        onBlur={handlePriceBlur} // Актуализираме ръчно само при загуба на фокус
                    />
                </div>
            </div>

            <div className="broker-container">
                <div className="form-group">
                    <label htmlFor="brokerProfit">Broker Profit in €</label>
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="brokerProfit"
                        placeholder="€"
                    />
                </div>
            </div>
        </div>
    );
};

export default ObjectsPriceContent;
