const round2 = x => Math.round(x*100)/100;
const isString = value => (typeof value === 'string' || value instanceof String) && value !== "";
//const isInteger = Number.isInteger;
//const isPositiveInteger = value => Number.isInteger(value) && value > 0;
//const isFloat = Number.isFinite;
const isNZPositiveFloat = value => Number.isFinite(value) && value > 0;
const isPositiveFloat = value => Number.isFinite(value) && value >= 0;

const _computeVg = {
    Vi: isNZPositiveFloat,
    Vf: isPositiveFloat
};

const _computeVa = {
    Vg: isPositiveFloat,
    d: isNZPositiveFloat,
    w: isNZPositiveFloat
}

const _computeSuppliesList = {
    A: isNZPositiveFloat,
    T: isNZPositiveFloat,
    Va: isNZPositiveFloat,
    products: v => v?.length > 0 && v.every(x => isPositiveFloat(x.dose) && isString(x.name) && Number.isInteger(x.presentation))
};

// Validación de lista de parametros 
const validate = (schema, object) => Object.keys(schema)
    .filter(key => object ? !schema[key](object[key]) : false)
    .map(key => key);

const parameterNames = { // Nombres de los parametros para mostrar en mensajes de error
    // Parametros
    Vi: "Volumen inicial",
    Vf: "Volumen final",
    Vg: "Gasto",
    d: "Distancia recorrida",
    w: "Ancho de banda",
    // Calculo de mezcla
    A: "Superficie de trabajo", 
    T: "Capacidad del tanque", 
    Va: "Volumen de aplicación",
    products: "Lista de productos"
};

const getParameterNames = paramList => paramList.map(key => parameterNames[key]).join(", ");

const checkParams = (schema, params) => { // Valida parametros y genera mensaje de error
    const wrongKeys = validate(schema, params);
    if(wrongKeys.length > 0) 
        throw new Error(`Parámetros incorrectos: ${getParameterNames(wrongKeys)}`);
};

export const presentationUnits = [
    "ml/ha", // 0
    "gr/ha", // 1
    "ml/100l", // 2
    "gr/100l" // 3
];

export const computeVg = params => {
    checkParams(_computeVg, params);
    const { Vi, Vf } = params;
    if(Vf > Vi)
        throw new Error(`El volumen inicial debe ser mayor que el volumen recolectado`);
    return round2(Vi-Vf);
};

export const computeVa = params => {
    checkParams(_computeVa, params);
    const { Vg, d, w } = params;
    const A = d*w/10000; // Sup. en Ha.
    return round2(Vg/A);
};

const computeProductVolume = (prod, vol, Va) => { // Cantidad de insumo (gr o ml) por volumen de agua
    return prod.presentation === 0 || prod.presentation === 1 ? vol*prod.dose/Va : vol*prod.dose/100;
};

export const computeSuppliesList = params => { // Lista de insumos y cargas para mezcla   
    checkParams(_computeSuppliesList, params);
    const { A, T, Va, products } = params;
    const Aha = A/10000; // Recordar que A esta en m2
    const Nc = Aha*Va/T; // Cantidad de cargas
    const Ncc = Math.floor(Nc); // Cantidad de cargas completas
    const Vf = (Nc - Ncc)*T; // Volumen fraccional [L]
    const Ncb = Math.ceil(Nc); // Cantidad de cargas balanceadas
    const Vcb = Aha*Va/Ncb; // Volumen de cargas balanceadas
    const Vftl = Vf/T < 0.2; // Detectar volumen fraccional total menor a 20%
    // Calcular cantidades de cada producto
    const pr = products.map(p => ({
        ...p, // Por comodidad, dejar resto de los detalles en este arreglo
        cpp: computeProductVolume(p, T, Va), // Cantidad por carga completa [ml o gr]
        cfc: computeProductVolume(p, Vf, Va), // Cantidad por carga fraccional [ml o gr]
        ceq: computeProductVolume(p, Vcb, Va), // Cantidad por carga equilibrada [ml o gr]
        total: computeProductVolume(p, T, Va)*Nc // Cantidad total de insumo [ml o gr]
    }));

    return {pr, Nc, Ncc, Vf, Ncb, Vcb, Vftl};
};