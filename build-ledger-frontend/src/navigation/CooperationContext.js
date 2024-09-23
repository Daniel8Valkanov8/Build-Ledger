import React, { createContext, useState } from 'react';

// Създаваме контекст за кооперация
export const CooperationContext = createContext();

// Провайдър компонент
export const CooperationProvider = ({ children }) => {
    const [cooperation, setCooperation] = useState(null);

    return (
        <CooperationContext.Provider value={{ cooperation, setCooperation }}>
            {children}
        </CooperationContext.Provider>
    );
};
