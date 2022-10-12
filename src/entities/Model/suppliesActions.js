import { Geolocation } from '@capacitor/geolocation';
import Toast from '../../components/Toast';

const getPosition = () => {
    return new Promise( (resolve, reject) => {        

        const getCoords = () => {
            Geolocation.getCurrentPosition().then( position => {            
                const coords = [position.coords.latitude, position.coords.longitude];
                resolve(coords);
            }).catch( error => {
                reject(error);
            });
        };

        Geolocation.checkPermissions().then(permissions => {                        
            if(permissions.location === "granted"){ 
                getCoords(); 
            }else{
                Toast("info", "Permisos de ubicación no otorgados", 2000, "center");
                Geolocation.requestPermissions().then(res => {
                    //console.log(res);
                    getCoords();
                }).catch(() => {
                    Toast("error", "No se pudo actualizar los permisos de ubicación", 2000, "center");
                });
            }
        });
        /*
        navigator.geolocation.getCurrentPosition( position => {
            const coords = [position.coords.latitude, position.coords.longitude];
            resolve(coords);
            // El valor de model.lotCoordinates se actualiza al hacer submit
        });
        */
    });
};

export const setParameter = (dispatch, name, value) => {
    dispatch({
        type: "SET_PARAMETER",
        payload: {name,value}
    });
};

export const toggleGPS = (dispatch, enabled) => {
    dispatch({
        type: "SET_PARAMETER",
        payload: {name: "gpsEnabled", value: enabled}
    });
    if(enabled)
        getPosition().then(coords => {
            dispatch({
                type: "SET_PARAMETER",
                payload: {name: "lotCoordinates", value: coords}
            });
        });
    else 
        dispatch({
            type: "SET_PARAMETER",
            payload: {name: "lotCoordinates", value: ""}
        });
};

export const newProduct = dispatch => {
    dispatch({
        type: "NEW_PRODUCT"
    });
};

export const removeProduct = (dispatch, index) => {
    dispatch({
        type: "REMOVE_PRODUCT",
        payload: index
    });
};

export const setProductParams = (dispatch, index, params) => {
    dispatch({
        type: "SET_PRODUCT_PARAMS",
        payload: {index, params}
    });
};

export const getSuppliesList = (dispatch, workVolume) => {
    dispatch({
        type: "GET_SUPPLIES_LIST",
        payload: workVolume
    });
};