import { f7, View, Panel, Page, Block, BlockTitle, Button, Row } from 'framework7-react';
import { useContext } from 'react';
import moment from 'moment';
import * as actions from '../../entities/Model/reportsActions.js';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Toast from '../Toast';
import classes from './style.module.css';

const ReportsPanel = () => {
    
    /*
    const state = useContext(ReportsStateContext);
    const dispatch = useContext(ReportsDispatchContext);
    */
    const state = {};
    const dispatch = {};
    
    const emptyReport = true;
 
    const saveReport = () => {
        f7.dialog.create({
            title: '¿Confirma que desea finalizar y guardar el reporte?',
            content: '<h4>Ya no podrá modificar los datos guardados en el reporte actual.</h4>' +
                '<h4>¿Desea continuar?</h4>',
            buttons: [{
                    text: 'Cancelar',
                    onClick: function () {
                        f7.dialog.close();
                    }
                },
                {
                    text: 'Aceptar',
                    onClick: function () {                                                
                        f7.dialog.prompt('Indique un nombre para este reporte', 'Editar nombre', reportName => {
                            actions.saveReport(dispatch, reportName);
                            Toast("success", "Nuevo reporte guardado", 2000, "center");                        
                            setTimeout(function () {
                                f7.panel.close();
                                setTimeout(function () { // Dar tiempo a que se cierre el panel
                                    f7.views.main.router.navigate('/reports/');                                
                                }, 500);
                            }, 500);
                        }, null, state.name || "Reporte "+moment(Date.now()).format("DD-MM-YYYY HH-mm"));
                    }
                }
            ],
            destroyOnClose: true
        }).open();
    };

    const deleteReport = () => {
        f7.dialog.create({
            title: '¿Confirma que desea borrar el reporte?',
            content: '<h4>Se borrarán todos los datos que se cargaron al reporte actual.</h4>' +
                '<h4>¿Desea continuar?</h4>',
            buttons: [{
                    text: 'Cancelar'
                },
                {
                    text: 'Aceptar',
                    onClick: function () {
                        f7.panel.close();
                        actions.newReport(dispatch);
                        Toast("success", "Reporte restablecido", 2000, "center");
                        setTimeout(function(){ // Dar tiempo a que se cierre el panel
                            f7.dialog.close();                            
                        }, 500);
                    }
                }
            ],
            destroyOnClose: true
        }).open();
    };

    const gotoMenu = () => {
        f7.panel.close();
        setTimeout(function(){ // Dar tiempo a que se cierre el panel
            f7.views.main.router.navigate('/');
        }, 500);
    };

    return (
        <Panel right swipe>
            <View>
                <Page>
                    <Block>
                        <BlockTitle>Reporte actual</BlockTitle>
                        <Row>
                            <table className={classes.Table}>
                                <thead>
                                    <tr>
                                        <th style={{textAlign:"left"}}>Sección</th>
                                        <th>Agregado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </Row>
                        
                        <Button className={classes.ButtonSave} fill onClick={saveReport} disabled={emptyReport}>
                            Finalizar reporte
                        </Button>
                    
                        <Button className={classes.ButtonDelete} fill onClick={deleteReport} color="red" disabled={emptyReport}>
                            Borrar reporte
                        </Button>
                    
                        <Button className={classes.ButtonContinue} fill onClick={gotoMenu} color="teal">
                            Continuar
                        </Button>
                        
                    </Block>
                </Page>
            </View>
        </Panel>
    );
};

export default ReportsPanel;