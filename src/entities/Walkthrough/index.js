import { f7 } from "framework7-react";

/*
    Sobre el funcionamiento de este modulo:

    En cada step, se ejecuta una accion y se muestra un popover con texto de ayuda.

    El popover se mostrará sobre el componente con className=[targetSelector]. Los popups se 
    renderizan automaticamente en el componente Popover.js.
    
    Hay dos tipos de acciones, una para actualizar parametros del modelo y la otra que requiere
    renderizar componentes de react. Primero se ejecuta la actualizacion de parametros y luego 
    la otra.
    
    Esta clase (WalkthroughModel) tiene acceso al modelo porque al definir el provider se 
    le pasa como argumento con "setModel(model)".
    
    Para renderizar componentes de la vista o ejecutar acciones, se usan los callbacks. En cada 
    componente donde haya que ejecutar una accion, hay que importar el WalkthroughCtx y asignarle 
    callbacks cuyo nombre coincida con la key del paso correspondiente.
*/

const STEPS = [
    {
        page: "/params/",
        key: "row_separation",
        text: "Para comenzar, indique la distancia entre filas de plantas ingresando la medida en metros.",
    },
    {
        page: "/params/",
        key: "arc_config",
        text: "En esta sección puede indicar la cantidad de arcos y crear distintas configuraciones de picos.",
    },
    {
        page: "/arc/",
        key: "nozzle_cnt",
        text: "Para configurar el arco, indique la cantidad de picos.",
    },
    {
        page: "/arc/",
        key: "nozzle_config",
        text: "Seleccione los picos y elija el modelo en la parte inferior. También puede editar los parámetros seleccionando la opción \"Personalizado\".",
    },
    {
        page: "/arc/",
        key: "arc_save",
        text: "Al finalizar, presione en guardar y elija un nombre para la configuración creada.",
        angle: "on-bottom"
    },
    {
        page: "/params/",
        key: "params_1",
        text: "Para determinar los parámetros de pulverización, modifique los valores y presione en el ícono correspondiente a la variable a calcular.",
    },
    {
        page: "/params/",
        key: "params_2",
        text: "El color de borde de cada ícono indica el estado del valor: amarillo = sin actualizar, verde = actualizado.",
    },
    {
        page: "/params/",
        key: "params_3",
        text: "Presionando en los botones de la derecha, puede medir la velocidad de avance, calcular volumen según TRV o calcular la velocidad de aire.",
        angle: "on-bottom"
    },
    {
        page: "/params/",
        key: "params_report",
        text: "Finalmente, puede guardar estos resultados en un reporte.",
        angle: "on-bottom"
    },
    {
        page: "/control/",
        key: "control_sampling",
        text: "Para realizar la verificación de picos, indique el tiempo de muestreo.",
    },
    {
        page: "/control/",
        key: "control_play",
        text: "Presione el botón verde para iniciar el timer. Recuerde subir el volumen de su móvil para oir las alertas.",
    },
    {
        page: "/control/",
        key: "control_table",
        text: "A medida que ingrese los volúmenes recolectados en las filas correspondientes, se actualizarán los resultados.",
    },
    {
        page: "/control/",
        key: "control_results",
        text: "Al completar toda la tabla, aparecerán los valores del resultado de la verificación.",
        angle: "on-bottom"
    },
    {
        page: "/control/",
        key: "control_reports",
        text: "Si lo desea, puede guardar estos resultados en un reporte.",
        angle: "on-bottom"
    },
    {
        page: "/supplies/",
        key: "supplies_form",
        text: "Para realizar cálculo de mezcla, indique un nombre identificador para el lote de trabajo y el área del mismo.",
    },
    {
        page: "/supplies/",
        key: "supplies_gps",
        text: "Si desea, puede habilitar la opción de incluir la geolocalización empleando su ubicación actual.",
    },
    {
        page: "/supplies/",
        key: "supplies_capacity",
        text: "Debe indicar la capacidad del tanque para conocer el volumen de producto por carga.",
        angle: "on-bottom"    
    },
    {
        page: "/supplies/",
        key: "supplies_balancing",
        text: "La opción de balanceo de cargas permite equilibrar los litros de carga para usar siempre el mismo volumen.",
    },
    {
        page: "/supplies/",
        key: "supplies_add",
        text: 'Puede agregar productos a la lista presionando el botón "+" e indicar nombre, dosis y unidad del mismo.'
    },
    {
        page: "/supplies/",
        key: "supplies_results",
        text: 'Luego de presionar en "Calcular insumos", se mostrará el detalle de los resultados obtenidos.',
        angle: "on-bottom"
    }
];

const POPOVER_DELAY = 700;
const SCROLL_DELAY = 500;

export default class WalkthroughModel {
    constructor(){
        this.running = false;
        this.steps = STEPS;        
        this.currentIndex = -1;
        this.currentStep = null;        
        this.callbacks = {};
    }

    start() {
        this.running = true;
        this.currentIndex = -1;
        this.currentStep = null;
        this.next();
    }

    finish() {        
        //f7.popover.close("."+this.steps[this.currentIndex].popover_el);
        this.running = false;
        f7.views.main.router.navigate('/');
    }

    next() {

        this.currentIndex++;
        
        if(this.currentIndex >= this.steps.length){
            this.finish();
            return;
        }
        
        this.currentStep = this.steps[this.currentIndex];
        
        if(this.currentIndex > 0){
            if(this.currentStep.page !== this.steps[this.currentIndex-1].page){
                f7.views.main.router.navigate(this.currentStep.page);
            }
            //f7.popover.close("."+this.steps[this.currentIndex-1].popover_el);    
        }else{ // first step
            f7.views.main.router.navigate(this.currentStep.page);
        }
        
        setTimeout(() => {
            if(this.callbacks[this.currentStep.key])
                this.callbacks[this.currentStep.key]();
            const targetElSelector = `help-target-${this.currentStep.key}`;
            const popoverSelector = `help-popover-${this.currentStep.key}`;
            const r = document.getElementsByClassName(targetElSelector);
            if(r.length > 0){
                r[0].scrollIntoView({block: "center", behavior: "smooth"});
                setTimeout(()=>{
                    try{
                        f7.popover.open("."+popoverSelector, "."+targetElSelector, true);
                    }catch(e){
                        console.log(e);
                    }
                }, POPOVER_DELAY);
            }else{
                console.log("Error de ayuda, elemento no existe: "+targetElSelector);
                //this.next();
                this.finish();
            }
        }, SCROLL_DELAY);
    }
}