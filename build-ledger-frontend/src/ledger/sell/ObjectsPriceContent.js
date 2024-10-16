import React from 'react';
import './ObjectsPriceContent.css';
const ObjectsPriceContent = ({ formData, handleInputChange, success, onApartmentClick }) => {
    
    const handleApartmentClick= (e) => {
        onApartmentClick();
       console.log("select apartment")
    };
    

    const handleGarageClick= (e) => {
        console.log("select garage")
     };

     
    const handleParkingPlaceClick= (e) => {
        console.log("select parking-place")
     };

     
    return (
        <div className="contract-purchaser-broker-container">
                    {/* Sell Objects and price*/}
                    <div className="contract-container">
                        {success && <div className="alert alert-success">{success}</div>}
                        <div className="form-group contract-file-group">
                            <label htmlFor="contractNumber">Add Objects</label>
                                <div className="input-file-container">
                                <div className="file-icon" onClick={handleApartmentClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="46" fill="currentColor" class="bi bi-building-add" viewBox="0 0 16 16">
                                        <   path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
                                        <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1z"/>
                                        <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                                        </svg>
                                </div>
                                    <div></div>
                                <div className="file-icon" onClick={handleGarageClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="46" fill="currentColor" class="bi bi-car-front-fill" viewBox="0 0 16 16">
                                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
                                    </svg>
                                </div>
                                <div></div>
                                <div className="file-icon" onClick={handleParkingPlaceClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="46" fill="currentColor" class="bi bi-p-circle" viewBox="0 0 16 16">
                                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
                                </svg>
                                </div>
                                </div>
                        </div>
                        <div className="added-objects-container">
                <div className="added-objects-list">
                   
                </div>
            </div>
                    </div>
                    <div className="purchaser-container">
                        <div className="form-group">
                            <label htmlFor="purchaserFirstName">Total Price</label>
                            <input
                                type="text"
                                className="form-control no-spinner"
                                id="purchaserFirstName"
                                placeholder="€"
                                
                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="purchaserFirstName">Discount Price</label>
                            <input
                                type="text"
                                className="form-control no-spinner"
                                id="purchaserLastName"
                                placeholder="€"

                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="purchaserFirstName">Broker Profit</label>
                            <input
                                type="text"
                                className="form-control no-spinner"
                                id="discount"
                                placeholder="€"
                            />
                        </div>
                    </div>
                    <div className="broker-container">
                        
                    </div>
                </div>
    );
};

export default ObjectsPriceContent;
