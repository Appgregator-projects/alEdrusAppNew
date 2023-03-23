import React, { createContext, useContext, useMemo, useReducer } from 'react'
import { AppReducer, initialState } from './reducer';


//create the context
const AppContext = createContext();
const AppDispatch = createContext();



//create custom hooks
export const useAuthState = () => {
    let context = useContext(AppContext);
    if (context === undefined){
        // throw new error("useAuthState must be used within an context provider")
        console.error("useAuthState must be used within an context provider")
    };
    return context;
};

export const useAppDispatch = () => {
    let context = useContext(AppDispatch);
    if (context === undefined){
        throw new error("useAppDispatch must be used within an context provider")
    };
    return context;
};


//create custom provider
export const AppProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={user}>
            <AppDispatch.Provider value={dispatch}>
                {children}
            </AppDispatch.Provider>
        </AppContext.Provider>
    )
};