// GlobalState.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const Cart = ({ children }) => {
    const [listItems, setListItems] = useState([]);

    return (
        <GlobalContext.Provider value={{ listItems, setListItems }}>
            {children}
        </GlobalContext.Provider>
    );
};
