const round2 = x => Math.round(x*100)/100;
const isString = value => (typeof value === 'string' || value instanceof String) && value !== "";
//const isInteger = Number.isInteger;
//const isPositiveInteger = value => Number.isInteger(value) && value > 0;
//const isFloat = Number.isFinite;
const isPositiveFloat = value => Number.isFinite(value) && value > 0;


const _computeQe = {
    nozzleData: v => v?.length > 0,
    Na: n => Number.isInteger(n) && (n === 1 || n === 2),
    Pt: Number.isFinite
};

const _computeVa = {        
    Vt: isPositiveFloat,
    D: isPositiveFloat,
    Na: n => Number.isInteger(n) && (n === 1 || n === 2),
    ..._computeQe
};

const _computePt = {
    Va: isPositiveFloat,
    Vt: isPositiveFloat,
    D: isPositiveFloat,
    nozzleData: v => v?.length > 0,
    Na: n => Number.isInteger(n) && (n === 1 || n === 2)
};

const _computeVt = {
    Va: isPositiveFloat,
    D: isPositiveFloat,
    ..._computeQe
};

const _computeQNom = {
    b: Number.isFinite,
    c: Number.isFinite,
    Pnom: Number.isFinite
};

const _computeAirFlow = {
    D: isPositiveFloat,
    h: isPositiveFloat,
    Vt: Number.isFinite,
    F: Number.isFinite
};

const _computeAirVelocity = {
    turbineSection: isPositiveFloat,
    airFlow: isPositiveFloat,
    F: isPositiveFloat
}

const _computeVaFromTRV = {
    D: isPositiveFloat,
    r: isString,
    h: isPositiveFloat,
    w: isPositiveFloat,
    gI: isPositiveFloat,
};

const _computeEffectiveFlow = {
    Pt: isPositiveFloat,
    Pnom: isPositiveFloat,
    Qnom: isPositiveFloat,
    c: isPositiveFloat,
    tms: isPositiveFloat
};

const _computeEffectiveVolume = {
    collectedData: v => v?.length > 0 && v.every(d => isPositiveFloat(d.ef)),
    D: isPositiveFloat,
    Vt: Number.isFinite
};

const _computeSuppliesList = {
    A: isPositiveFloat,
    T: isPositiveFloat,
    Va: isPositiveFloat,
    products: v => v?.length > 0 && v.every(x => isPositiveFloat(x.dose) && isString(x.name) && Number.isInteger(x.presentation))
};


// Validación de lista de parametros 
const validate = (schema, object) => Object.keys(schema)
    .filter(key => object ? !schema[key](object[key]) : false)
    .map(key => key);

const parameterNames = { // Nombres de los parametros para mostrar en mensajes de error
    Qnom: "Caudal nominal",
    Pnom: "Presión nominal",
    Qb: "Caudal de bomba",
    Qe: "Caudal efectivo",
    Na: "Número de arcos",
    nozzleData: "Configuración de arco",
    D: "Distancia entre filas",
    h: "Altura de plantas",
    w: "Ancho de plantas",
    gI: "Índice verde",
    F: "Índice de expansión",
    airFlow: "Caudal de aire",
    turbineSection: "Sección de soplado",
    r: "Forma de planta",
    Pt: "Presión de trabajo",
    Va: "Volumen de aplicación",
    Vt: "Velocidad de trabajo",
    c: "Volumen recolectado",
    tms: "Tiempo de muestreo",
    A: "Superficie de trabajo", 
    T: "Capacidad del tanque", 
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

const plantFormIndex = {
    type_a: 735.9,
    type_b: 937,
    type_c: 468.5
};

export const computeQe = params => { // Caudal efectivo
    checkParams(_computeQe, params);
    const { nozzleData, Na, Pt } = params;
    const qe = nozzleData.map(nozzle => nozzle.Qnom*Math.sqrt(Pt/nozzle.Pnom));     
    const Qe = qe.reduce((a, b) => a + b, 0);
    return round2(Qe);
};

export const computeVa = params => { // Volumen de aplicacion
    checkParams(_computeVa, params);
    const Qe = computeQe(params);
    const { Vt, D, Na  } = params;
    return round2(Qe*1200/Vt/D);
};

export const computeVt = params => { // Velocidad de trabajo
    checkParams(_computeVt, params);
    const Qe = computeQe(params);
    const { Va, D } = params;
    return round2(Qe*1200/Va/D);
};

export const computePt = params => { // Presion de trabajo
    checkParams(_computePt, params);
    const { Va, Vt, D, Na, nozzleData } = params;
    const pe = nozzleData.map(nozzle => nozzle.Qnom/Math.sqrt(nozzle.Pnom));
    const Pe = Va*Vt*D/1200/pe.reduce((a, b) => a + b, 0);
    return round2(Pe*Pe);
};

export const computeQNom = params => { // Caudal nominal
    checkParams(_computeQNom, params);
    const {b, c, Pnom} = params;
    return round2(b + c * Math.sqrt(Pnom));
};

export const computeAirFlow = params => { // Caudal de aire
    checkParams(_computeAirFlow, params);
    const {D, h, Vt, F} = params;
    return round2(Vt * D * h / F * 1000);
};

export const computeAirVelocity = params => { // Velocidad de soplado
    checkParams(_computeAirVelocity, params);
    const {turbineSection, airFlow, F} = params;
    return round2(F * airFlow / turbineSection / 3600);
};

export const computeVaFromTRV = params => { // Volumen de aplicacion desde TRV
    checkParams(_computeVaFromTRV, params);
    const {D, r, h, w, gI} = params;
    const rk = plantFormIndex[r];
    return round2(rk * h * w * gI / D);
};

export const computeEffectiveFlow = params => { // Caudal efectivo
    checkParams(_computeEffectiveFlow, params);
    const { Pt, Qnom, Pnom, c, tms } = params;
    const th = 10; // Umbral en porcentaje
    const ef = round2(c / tms * 60000); // Caudal efectivo
    const Qe = Qnom*Math.sqrt(Pt/Pnom); // Caudal deseado
    const s = round2((ef - Qe) / Qe * 100); // Desviacion estandar
    const ok = Math.abs(s) <= th; // Correcto 
    return { ef, s, ok };
};

export const computeEffectiveVolume = params => { // Volumen efectivo
    checkParams(_computeEffectiveVolume, params);
    const { collectedData, Vt, D } = params;
    const Qe = collectedData.reduce((a, b) => a + b.ef, 0);
    return round2(Qe*1200/Vt/D);
};

const computeProductVolume = (prod, vol, Va) => { // Cantidad de insumo (gr o ml) por volumen de agua
    return prod.presentation === 0 || prod.presentation === 1 ? vol*prod.dose/Va : vol*prod.dose/100;
};

export const computeSuppliesList = params => { // Lista de insumos y cargas para mezcla   
    checkParams(_computeSuppliesList, params);
    const { A, T, Va, products } = params;
    const Nc = A*Va/T; // Cantidad de cargas
    const Ncc = Math.floor(Nc); // Cantidad de cargas completas
    const Vf = (Nc - Ncc)*T; // Volumen fraccional [L]
    const Ncb = Math.ceil(Nc); // Cantidad de cargas balanceadas
    const Vcb = A*Va/Ncb; // Volumen de cargas balanceadas
    const Vftl = Vf/T < 0.2; // Detectar volumen fraccional total menor a 20%
    // Calcular cantidades de cada producto
    const pr = products.map(p => ({
        ...p, // Por comodidad, dejar resto de los detalles en este arreglo
        cpp: computeProductVolume(p, T, Va)/1000, // Cantidad por carga completa [l o kg]
        cfc: computeProductVolume(p, Vf, Va)/1000, // Cantidad por carga fraccional [l o kg]
        ceq: computeProductVolume(p, Vcb, Va)/1000, // Cantidad por carga equilibrada [l o kg]
        total: computeProductVolume(p, T, Va)*Nc/1000, // Cantidad total de insumo [l o kg]
    }));

    return {pr, Nc, Ncc, Vf, Ncb, Vcb, Vftl};
};