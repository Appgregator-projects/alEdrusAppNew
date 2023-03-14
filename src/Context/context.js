import React, { createContext, useContext, useMemo } from 'react'
import { BleManager } from 'react-native-ble-plx';

    
//create the context
const BluetothContext = createContext(null);
const AppContext = createContext(null);



//create custom hooks
export const useAppContext = () => {
let context = useContext(AppContext);
    if (context === undefined){
        throw new error("useAppContext must be used within an context provider")
    };
    return context;
};

export const useBluetoothContext = () => {
    let context = useContext(BluetothContext);
    if (context === undefined){
        throw new error("useAppContext must be used within an context provider")
    };
    return context;
};





//create custom provider
export const AppProvider = ({ children }) => {
    const Manager = useMemo(() => new BleManager(), []);
    return (
        <AppContext.Provider value={"x"}>
            <BluetothContext.Provider value={'y'}>
                {children}
            </BluetothContext.Provider>
        </AppContext.Provider>
    )
};