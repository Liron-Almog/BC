// GlobalState.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [listItems, setListItems] = useState([]);
    return (
        <GlobalContext.Provider value={{ email, setEmail, isLoggedIn, setIsLoggedIn ,setListItems,listItems}}>
            {children}
        </GlobalContext.Provider>
    );
};
