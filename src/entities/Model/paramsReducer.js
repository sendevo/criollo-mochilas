import * as API from "../API"; 
import Toast from "../../components/Toast";

export const initialState = {
    // Parametros
    rowSeparation: 3, // Ancho de calle (m)
    arcNumber: 1, // Numero de arcos, puede ser 1 o 2
    workVelocity: 10, // Velocidad de trabajo (km/h)
    workVelocityReady: false,
    workPressure: 2, // Presion de trabajo (bar)
    workPressureReady: false,
    workVolume: 56, // Volumen de aplicacion (l/ha)    
    workVolumeReady: false,
    nominalFlow: 0.8, // Caudal nominal de pico seleccionado
    sprayFlow: "", // Caudal de pulverizacion (caudal de picos multiplicado por n de picos)
    nominalPressure: 3, // Presion nominal de pico seleccionado
    
    // TRV
    plantType: "type_a",
    plantHeight: 2, // Altura de planta (m)
    plantWidth: 1, // Ancho de planta (m)
    greenIndex: 1, // Indice verde

    // Caudal de aire
    airFlow: 1000, // Caudal de aire    
    expansionFactor: 2, // Factor de expansión
    turbineSection: 1, // Seccion de soplado
    airVelocity: "", // Velocidad de aire    
};

const nonEditableParams = [
    "workVelocity",
    "workPressure",
    "workVolume",
    "rowSeparation"
];

export const reducer = (state, action) => {    
    switch (action.type) {
        case "SET_PARAMETER": {
            const {name, value} = action.payload;
            if(nonEditableParams.includes(name)){
                console.log("El parámetro "+name+" requiere lógica adicional para editar");
                return state;
            }
            return {
                ...state,
                [name]: value
            }
        }
        case "SET_ROW_SEPARATION": {
            return {
                ...state,
                rowSeparation: action.payload,
                workVelocityReady: false,
                workPressureReady: false,
                workVolumeReady: false
            }
        }
        case "SET_WORK_VELOCITY":
            return {
                ...state,
                workVelocity: action.payload,
                workVelocityReady: true,
                workPressureReady: false,
                workVolumeReady: false
            };
        case "COMPUTE_WORK_VELOCITY":
            try{
                const vt = API.computeVt({
                    nozzleData: action.payload,
                    Pt: state.workPressure,
                    Na: state.arcNumber,
                    Va: state.workVolume,
                    D: state.rowSeparation
                });
                return {
                    ...state,
                    workVelocity: vt,
                    workVelocityReady: true,
                    workPressureReady: true,
                    workVolumeReady: true
                };
            } catch (e) {
                Toast("error", e.message, 2000, "bottom");
                return state; 
            }
        case "SET_WORK_PRESSURE":
            return {
                ...state,
                workPressure: action.payload,
                workVelocityReady: false,
                workPressureReady: true,
                workVolumeReady: false
            };
        case "COMPUTE_WORK_PRESSURE":
            try{
                const Pt = API.computePt({
                    Va: state.workVolume,
                    Vt: state.workVelocity,
                    D: state.rowSeparation,
                    Na: state.arcNumber,                    
                    nozzleData: action.payload
                });
                return {
                    ...state,
                    workPressure: Pt,
                    workVelocityReady: true,
                    workPressureReady: true,
                    workVolumeReady: true
                };
            } catch (e) {
                Toast("error", e.message, 2000, "bottom");
                return state;
            }
        case "SET_WORK_VOLUME":
            return {
                ...state,
                workVolume: action.payload,
                workVelocityReady: false,
                workPressureReady: false,
                workVolumeReady: true
            };
        case "COMPUTE_WORK_VOLUME":
            try{
                const Va = API.computeVa({
                    Pt: state.workPressure,
                    Vt: state.workVelocity,
                    D: state.rowSeparation,
                    Na: state.arcNumber,
                    nozzleData: action.payload
                });
                return {
                    ...state,
                    workVolume: Va,
                    workVelocityReady: true,
                    workPressureReady: true,
                    workVolumeReady: true
                };
            } catch (e) {
                Toast("error", e.message, 2000, "bottom");
                return state;
            }
        case "SET_AIR_FLOW":
            return {
                ...state,
                airFlow: action.payload
            };  
        default:
            return state;
    }
};