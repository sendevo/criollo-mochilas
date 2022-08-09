import { f7, Navbar, Page, List, BlockTitle, Row, Col, Button } from 'framework7-react';
import { useContext } from 'react';
import { BackButton, LinkButton } from '../../components/Buttons';
import { addParams } from '../../entities/Model/reportsActions';
import * as actions from '../../entities/Model/paramsActions.js';

const Params = props => {
    const {
        rowSeparation,
        arcNumber,
        workVelocity,
        workVelocityReady,
        workPressure,
        workPressureReady,
        workVolume,
        airFlow,
        airVelocity,
        workVolumeReady,
        sprayFlow
    } = {};
    const {name, nozzleData} = {};

    const paramsDispatch = ()=>{};
    const reportDispatch = ()=>{};
    
    const addToReport = () => {
        addParams(reportDispatch, {
            rowSeparation,
            arcNumber,
            workVelocity,
            workPressure,
            workVolume,
            airFlow,
            airVelocity,
            sprayFlow
        });
        f7.panel.open();
    };

    if(window.walkthrough){
        if(window.walkthrough.running){
            window.walkthrough.callbacks["params_2"] = () => {
                actions.computeWorkVelocity(paramsDispatch, nozzleData);
            };
        }
    }

    return (
        <Page>
            <Navbar title="Parámetros de aplicación" style={{maxHeight:"40px", marginBottom:"0px"}}/>            
            
            
            <Row style={{marginTop:20, marginBottom: 20}}>
                <Col width={20}></Col>
                <Col width={60} className="help-target-params_report">
                    <Button 
                        fill    
                        style={{textTransform:"none"}} 
                        disabled={!(workVelocityReady && workPressureReady && workVolumeReady)} 
                        onClick={addToReport}>
                            Agregar a reporte
                    </Button>
                </Col>
                <Col width={20}></Col>
            </Row>


            <BackButton {...props} />
        </Page>
    );
};

export default Params;