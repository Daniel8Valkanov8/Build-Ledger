import React, { createContext, useState, useContext } from 'react';

// Създаване на Context за кооперацията
const CooperationContext = createContext();

// Провайдър компонент, който ще предоставя състоянието
export const CooperationProvider = ({ children }) => {
    const [currentCooperation, setCurrentCooperation] = useState(null);

    return (
        <CooperationContext.Provider value={{ currentCooperation, setCurrentCooperation }}>
            {children}
        </CooperationContext.Provider>
    );
};

// Hook за лесен достъп до Context-а
export const useCooperation = () => {
    return useContext(CooperationContext);
};
