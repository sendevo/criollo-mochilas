import { f7, List, Row, Col } from 'framework7-react';
import ReactDOMServer from 'react-dom/server';
import IconCollected from '../../assets/icons/recolectado.png';
import arcNumbers from '../../assets/icons/arc_numbers.png';
import Input from '../Input';
import React from 'react';

const nozzleCollectedPrompt = (row, callback) => { 
    // Modal ingreso de peso recolectado de la bandeja

    const elId = "collectedvolumeinput"; // Id del input
    
    const content = ReactDOMServer.renderToStaticMarkup(
        <List form noHairlinesMd style={{marginBottom:"0px"}}>
            <Input
                slot="list"
                label="Volumen recolectado"
                icon={IconCollected}
                type="number"
                unit="L"
                inputId={elId}
            ></Input>
        </List>
    );

    const returnValue = () => { // Capturar valor ingresado y retornar
        const inputEl = document.getElementById(elId);                    
        callback(row, parseFloat(inputEl.value) || 0);
    };

    const buttons = [ // Botones del modal
        {
            text: "Cancelar"
        },
        {
            text: "Aceptar",
            onClick: returnValue
        }
    ];

    f7.dialog.create({
        title: "Pico controlado "+(row+1),
        content: content,
        buttons: buttons,
        destroyOnClose: true        
    }).open();
};

const openRecipientSizePrompt = callback => { 
    // Modal ingreso de tamanio de recipiente

    const elId = "recipientsizeinput"; // Id del input
    
    const content = ReactDOMServer.renderToStaticMarkup(
        <List form noHairlinesMd style={{marginBottom:"0px"}}>
            <Row slot="list">                
                <Input
                    label="Capacidad"
                    type="number"
                    unit="l"
                    inputId={elId}
                ></Input>
            </Row>
        </List>
    );

    const buttons = [ // Botones del modal
        {
            text: "Cancelar"
        },
        {
            text: "Aceptar",
            onClick: () => { // Capturar valor ingresado y retornar
                const inputEl = document.getElementById(elId);                    
                callback(parseFloat(inputEl.value) || 0);
            }
        }
    ];

    f7.dialog.create({
        title: "Capacidad del envase",
        content: content,
        buttons: buttons,
        destroyOnClose: true        
    }).open();
};

const timerCollectedPrompt = (callback) => { 
    // Modal ingreso de peso recolectado para dosis

    const elId = "collectedvolumeinput"; // Id del input
    
    const content = ReactDOMServer.renderToStaticMarkup(
        <List form noHairlinesMd style={{marginBottom:"0px"}}>
            <Input
                slot="list"
                label="Volumen recolectado"
                icon={IconCollected}
                type="number"
                unit="L"
                inputId={elId}
            ></Input>
        </List>
    );

    const returnValue = () => { // Capturar valor ingresado y retornar
        const inputEl = document.getElementById(elId);                    
        callback(parseFloat(inputEl.value) || 0);
    };

    const buttons = [ // Botones del modal
        {
            text: "Cancelar"
        },
        {
            text: "Aceptar",
            onClick: returnValue
        }
    ];

    f7.dialog.create({
        title: "Volumen recolectado",
        content: content,
        buttons: buttons,
        destroyOnClose: true        
    }).open();
};

const infoPrompt = () => {
    
    const content = ReactDOMServer.renderToStaticMarkup(
        <Row style={{marginTop:"10px"}}>
            <Col width={30} style={{
                    marginTop:"20px",
                    borderRadius: "10%",
                    border: "2px solid grey",
                    padding: "5px",
                    boxShadow: "5px 3px 10px 1px grey"
                }}>
                <img src={arcNumbers} width="100%"/>
            </Col>
            <Col width={70}>
                <p>Los picos de cada arco están enumerados de manera descendente, tal como se muestra en la imagen.</p>
            </Col>
        </Row>
    );
    
    f7.dialog.create({
        title:"Aclaración",
        content: content,
        destroyOnClose: true,
        buttons: [
            {
                text: "Aceptar",
                onClick: f7.dialog.close
            }
        ]
    }).open();
};


export { nozzleCollectedPrompt, timerCollectedPrompt, openRecipientSizePrompt, infoPrompt };

