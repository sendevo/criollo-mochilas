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
        key: "params_distance_width",
        text: "Para comenzar, indique la distancia del recorrido en metros y el ancho de la banda de pulverización."
    },
    {
        page: "/params/",
        key: "params_volumes",
        text: "Luego indique los volúmenes inicial y final recolectado luego de la aplicación."
    },
    {
        page: "/params/",
        key: "params_results",
        text: "En la última casilla se mostrará el volumen aplicado en litros y litros por hectárea.",
        angle: "on-bottom"
    },
    {
        page: "/params/",
        key: "params_report",
        text: "Si lo desea, puede registrar estos resultados en un reporte.",
        angle: "on-bottom"
    },
    {
        page: "/pace/",
        key: "pace_speed",
        text: "Para iniciar la labor, elija la velocidad del marcador."
    },
    {
        page: "/pace/",
        key: "pace_start",
        text: "Para iniciar o detener el marcador, presione el botón central.",
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