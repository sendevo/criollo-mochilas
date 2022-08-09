import { saveData, getData } from "../Storage";

export const setNozzleCnt = (dispatch, value) => {
    return dispatch({
        type: "SET_NOZZLE_CNT",
        payload: value
    });
};

export const setSelectedAll = (dispatch, value) => {
    return dispatch({
        type: "SET_SELECTED_ALL",
        payload: value
    });
};

export const setNozzleSelected = (dispatch, index, selected) => {
    return dispatch({
        type: "SET_NOZZLE_SELECTED",
        payload: {index,selected}
    });
};

export const setNozzles = (dispatch, data) => {
    return dispatch({
        type: "SET_NOZZLES",
        payload: data
    });
};

export const setNozzleMenuValue = (dispatch, value) => {
    return dispatch({
        type: "SET_NOZZLE_MENU_VALUE",
        payload: value
    });
};

export const newArc = (dispatch) => {
    return dispatch({
        type: "NEW_ARC"
    });
};

export const loadArc = (dispatch, id) => {
    return dispatch({
        type: "LOAD_ARC",
        payload: id
    });
};

export const saveArc = (dispatch, name) => {        
    return dispatch({
        type: "SAVE_ARC",
        payload: name
    });
};

export const deleteArc = id => {
    const arcs = getData("arcs");
    if(arcs) {
        const data = arcs.filter(el => el.id !== id);
        saveData("arcs", data);
    }
};