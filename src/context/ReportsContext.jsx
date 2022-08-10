import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from '../entities/Model/reportsReducer.js';

export const ReportsStateContext = createContext();
export const ReportsDispatchContext = createContext();

const ReportsProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ReportsDispatchContext.Provider value={dispatch}>
            <ReportsStateContext.Provider value={state}>
                {children}
            </ReportsStateContext.Provider>
        </ReportsDispatchContext.Provider>
    );
};

export default ReportsProvider;