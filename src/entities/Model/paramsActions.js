
export const setParamValue = (dispatch, name, value) => {
    return dispatch({
        type: "SET_PARAM_VALUE",
        payload: {name, value}
    });
};