import React, { useState, useEffect } from 'react';
import './ObjectsPriceContent.css';

const ObjectsPriceContent = ({ formData, handleInputChange, success, onApartmentClick, onGarageClick, onParkingPlaceClick, selectedApartments,  onDiscountChange, onBrokerPercentChange, onBrokerProfitChange, onTotalPriceChange  }) => {
    const [totalPrice, setTotalPrice] = useState(0); // Държим общата цена
    const [manualPrice, setManualPrice] = useState(null); // Съхраняваме ръчно въведената цена
    const [inputPrice, setInputPrice] = useState(''); // Държим текущото съдържание на полето
    const [discount, setDiscount] = useState(0); // Нов state за отстъпката
    const [brokerPercent, setBrokerPercent] = useState(''); // Комисионна в проценти
    const [brokerProfit, setBrokerProfit] = useState(''); // Комисионна в евро

    useEffect(() => {
        // Изчисляваме общата цена на базата на добавените обекти
        const calculateTotalPrice = () => {
            const total = selectedApartments.reduce((sum, obj) => sum + obj.priceEur, 0);
            setTotalPrice(Math.round(total * 100) / 100); // Закръгляме до 2 знака
        };

        calculateTotalPrice();
    }, [selectedApartments]);

    const handlePriceInputChange = (e) => {
        const value = e.target.value;
        setInputPrice(value);
        console.log(inputPrice)
    };

    const handlePriceBlur = () => {
        const parsedPrice = parseFloat(inputPrice);
        setManualPrice(!isNaN(parsedPrice) ? Math.round(parsedPrice * 100) / 100 : null);
    };



      const handleDiscountChange = (e) => {
        const value = parseFloat(e.target.value);
        setDiscount(!isNaN(value) ? value : 0);
        onDiscountChange(value); // Call the callback function
    };

    const handleBrokerPercentChange = (e) => {
        const value = e.target.value;
        setBrokerPercent(value);
        onBrokerPercentChange(value);


        if (value === '') {
            // Ако полето е празно, нулираме комисионната в евро
            setBrokerProfit('');
            return;
        }

        const parsedValue = parseFloat(value);
        const total = getCurrentPrice();
        if (!isNaN(parsedValue) && total > 0) {
            const profitInEur = (total * parsedValue) / 100;
            setBrokerProfit(Math.round(profitInEur * 100) / 100); // Закръгляме до 2 знака
        } else {
            setBrokerProfit('');
        }
    };

    const handleBrokerProfitChange = (e) => {
        const value = e.target.value;
        setBrokerProfit(value);
        onBrokerProfitChange(value);
        if (value === '') {
            // Ако полето е празно, нулираме процента на комисионната
            setBrokerPercent('');
            return;
        }

        const parsedValue = parseFloat(value);
        const total = getCurrentPrice();
        if (!isNaN(parsedValue) && total > 0) {
            const percent = (parsedValue / total) * 100;
            setBrokerPercent(Math.round(percent * 100) / 100); // Закръгляме до 2 знака
        } else {
            setBrokerPercent('');
        }
    };

    const getCurrentPrice = () => {
        const basePrice = manualPrice !== null ? manualPrice : totalPrice;
        const priceAfterDiscount = Math.max(basePrice - discount, 0);
        onTotalPriceChange(priceAfterDiscount); // Call the callback function
        return priceAfterDiscount; // Връщаме общата цена с включена отстъпка, но не по-малко от 0
    };

    useEffect(() => {
        setInputPrice(getCurrentPrice().toString());
    }, [totalPrice, manualPrice, discount]);

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
                    Discount in €
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="discount"
                        placeholder="Discount in €"
                        value={discount}
                        onChange={handleDiscountChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="totalPrice">Total Price in €</label>
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="totalPrice"
                        value={inputPrice}
                        onChange={handlePriceInputChange}
                        onBlur={handlePriceBlur}
                    />
                </div>
            </div>

            <div className="broker-container">
                <div className="form-group">
                    Broker profit in %
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="brokerProfitPercent"
                        placeholder="Broker profit in %"
                        value={brokerPercent}
                        onChange={handleBrokerPercentChange} // При промяна на процента изчисляваме комисионната в €
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="brokerProfit">Broker Profit in €</label>
                    <input
                        type="text"
                        className="form-control no-spinner"
                        id="brokerProfit"
                        placeholder="€"
                        value={brokerProfit}
                        onChange={handleBrokerProfitChange} // При промяна на сумата в € изчисляваме процента
                    />
                </div>
            </div>
        </div>
    );
};

export default ObjectsPriceContent;
