export const setParameter = (dispatch, name, value) => {
    return dispatch({
        type: "SET_PARAMETER",
        payload:{name,value}
    });
};

export const setRowSeparation = (dispatch, value) => {
    return dispatch({
        type: "SET_ROW_SEPARATION",
        payload: value
    });
};

export const setWorkVelocity = (dispatch, value) => {
    return dispatch({
        type: "SET_WORK_VELOCITY",
        payload: value
    });
};

export const computeWorkVelocity = (dispatch, value) => {
    return dispatch({
        type: "COMPUTE_WORK_VELOCITY",
        payload: value
    });
};

export const setWorkPressure = (dispatch, value) => {
    return dispatch({
        type: "SET_WORK_PRESSURE",
        payload: value
    });
};

export const computeWorkPressure = (dispatch, value) => {
    return dispatch({
        type: "COMPUTE_WORK_PRESSURE",
        payload: value
    });
};

export const setWorkVolume = (dispatch, value) => {
    return dispatch({
        type: "SET_WORK_VOLUME",
        payload: value
    });
};

export const computeWorkVolume = (dispatch, value) => {
    return dispatch({
        type: "COMPUTE_WORK_VOLUME",
        payload: value
    });
};

export const setAirFlow = (dispatch, value) => {
    return dispatch({
        type: "SET_AIR_FLOW",
        payload: value
    });
};

export const a = (dispatch, value) => {
    return dispatch({
        type: "",
        payload: value
    });
};