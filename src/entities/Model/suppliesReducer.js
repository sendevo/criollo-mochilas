import { f7 } from 'framework7-react';
import { computeSuppliesList } from "../API";
import { generateId } from "../../utils";
import Toast from "../../components/Toast";

export const initialState = {
    lotName: "", // Nombre del lote
    workArea: "", // Superficie de lote
    workVolume: "", // Volumen de aplicacion
    lotCoordinates: "", // Coordenadas del lote
    gpsEnabled: false, // Habilitacion coordenadas lote
    loadBalancingEnabled: true, // Habilitacion balanceo de carga
    capacity: "", // Capacidad del tanque
    products: [], // Lista de prductos
    supplies: {}, // Insumos y cantidades
};

export const reducer = (state, action) => {
    switch(action.type) {
        case "SET_PARAMETER":
            const {name, value} = action.payload;
            return {
                ...state,
                [name]: value
            }
        case "NEW_PRODUCT":
            return {
                ...state,
                products: [...state.products, {
                    key: generateId(),
                    name: "",
                    dose: "",
                    presentation: 0
                }]
            }
        case "REMOVE_PRODUCT":{
            const index = action.payload;
            return {
                ...state,
                products: state.products.filter((_, i) => i !== index)
            }
        }
        case "SET_PRODUCT_PARAMS":{
            const {index, params} = action.payload;
            return {
                ...state,
                products: state.products.map((product, i) => i === index ? {...product, ...params} : product)
            }
        }
        case "GET_SUPPLIES_LIST":{
            const params = {
                A: state.workArea,
                T: state.capacity,
                Va: action.payload,
                products: state.products,
            };
            try {
                const supplies = computeSuppliesList(params);
                f7.view.main.router.navigate("/suppliesList/");
                return {...state, supplies}
            }catch(e) {
                Toast("error", e.message, 2000, "bottom");
                return state;
            }
        }
        default:
            return state;
    }
};