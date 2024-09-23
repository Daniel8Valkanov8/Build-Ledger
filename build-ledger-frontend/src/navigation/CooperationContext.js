import React, { createContext, useContext, useState } from 'react';

const CooperationContext = createContext();

export const CooperationProvider = ({ children }) => {
    const [currentCooperation, setCurrentCooperation] = useState(null);

    return (
        <CooperationContext.Provider value={{ currentCooperation, setCurrentCooperation }}>
            {children}
        </CooperationContext.Provider>
    );
};

export const useCooperation = () => useContext(CooperationContext);
