import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from '../entities/Model/suppliesReducer.js';

export const SuppliesStateContext = createContext();
export const SuppliesDispatchContext = createContext();

const SuppliesProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SuppliesDispatchContext.Provider value={dispatch}>
            <SuppliesStateContext.Provider value={state}>
                {children}
            </SuppliesStateContext.Provider>
        </SuppliesDispatchContext.Provider>
    );
};

export default SuppliesProvider;