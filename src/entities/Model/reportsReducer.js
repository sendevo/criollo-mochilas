import { generateId } from "../../utils";
import { saveData, getData } from "../Storage";

export const initialState = {
    id: null,
    timestamp: 0,
    name: null,
    comments: "",
    params: {},
    control: {},
    supplies: {},
    completed: {
        params: false,
        control: false,
        supplies: false
    }
};

export const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_PARAMS": {
            return {
                ...state,
                params: action.payload,
                completed: {
                    ...state.completed,
                    params: true
                }
            };
        }   
        case "ADD_CONTROL": {
            return {
                ...state,
                control: action.payload,
                completed: {
                    ...state.completed,
                    control: true
                }
            };
        }   
        case "ADD_SUPPLIES": {
            return {
                ...state,
                supplies: action.payload,
                name: action.payload.lotName,
                completed: {
                    ...state.completed,
                    supplies: true
                }
            };
        }
        case "NEW_REPORT": {
            return initialState;
        }
        case "SAVE_REPORT": {
            const data = {
                ...state,
                id: generateId(),
                timestamp: Date.now(),
                name: action.payload || "S/N"
            };
            const reports = getData("reports") || [];
            reports.push(data);
            saveData("reports", reports);
            return initialState;
        }
        default:
            return state;
    }
};