import React, {createContext, useReducer} from 'react';
import {reducer, initialState} from '../entities/Model/paramsReducer.js';

export const ParamsStateContext = createContext();
export const ParamsDispatchContext = createContext();

const ParamsProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <ParamsDispatchContext.Provider value={dispatch}>
            <ParamsStateContext.Provider value={state}>
                {children}
            </ParamsStateContext.Provider>
        </ParamsDispatchContext.Provider>
    );
};

export default ParamsProvider;