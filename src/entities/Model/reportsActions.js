import { saveData, getData } from "../Storage";

export const addParams = (dispatch, params) => {
    dispatch({
        type: "ADD_PARAMS",
        payload: params
    });
};

export const addSupplies = (dispatch, supplies) => {
    dispatch({
        type: "ADD_SUPPLIES",
        payload: supplies
    });
};

export const newReport = (dispatch) => {
    dispatch({
        type: "NEW_REPORT"
    });
};

export const loadReport = id => {
    const reports = getData("reports");
    if(reports) {
        const data = reports.find(el => el.id === id);
        return data;
    }
};

export const saveReport = (dispatch, name) => {
    dispatch({
        type: "SAVE_REPORT",
        payload: name
    });
};

export const deleteReport = id => {
    const reports = getData("reports");
    if(reports) {
        const data = reports.filter(el => el.id !== id);
        saveData("reports", data);
    }
};

export const renameReport = (id, name) => {
    const reports = getData("reports");
    if(reports) {
        const data = reports.map(el => {
            if(el.id === id) {
                return {
                    ...el,
                    name
                };
            }
            return el;
        });
        saveData("reports", data);
    }
};