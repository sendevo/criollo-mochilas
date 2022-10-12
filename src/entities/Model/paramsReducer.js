import { computeVa, computeVg } from "../API"; 
import Toast from "../../components/Toast";

export const initialState = {
    Vi: "",
    Vf: "",
    Vg: "",
    d: "",
    w: "",
    Va: ""
};

const nonEditableParams = ["Va","Vg"];

export const reducer = (state, action) => {    
    switch (action.type) {
        case "SET_PARAM_VALUE": {
            const {name, value} = action.payload;
            if(nonEditableParams.includes(name)){
                //console.log("El parámetro "+name+" requiere lógica adicional para editar");
                return state;
            }
            const nextState = {
                ...state,
                [name]: value
            };
            try{
                const Vg = computeVg(nextState);
                nextState.Vg = Vg;
                try{
                    const Va = computeVa(nextState);
                    nextState.Va = Va;
                }catch(e){
                    //console.log(e);
                    nextState.Va = "";
                    return nextState;
                }
            }catch(e){
                //console.log(e);
                nextState.Vg = "";
                nextState.Va = "";
                return nextState
            }
            return nextState;
        }
        default:
            return state;
    }
};