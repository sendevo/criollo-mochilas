import { f7, Navbar, Page, List, Row, Col, Button } from 'framework7-react';
import { useContext } from 'react';
import { ReportsDispatchContext } from '../../context/ReportsContext';
import { ParamsStateContext, ParamsDispatchContext } from '../../context/ParamsContext';
import { addParams } from '../../entities/Model/reportsActions';
import { setParamValue } from '../../entities/Model/paramsActions.js';
import { BackButton } from '../../components/Buttons';
import Input from '../../components/Input';
import iconDistance from '../../assets/icons/distancia.png';
import iconWidth from '../../assets/icons/caudal.png';
import iconFull from '../../assets/icons/mochila_llena.png';
import iconEmpty from '../../assets/icons/mochila_vacia.png';
import iconVolume from '../../assets/icons/dosis.png';

const Params = props => {

    const paramsState = useContext(ParamsStateContext);
    const paramsDispatch = useContext(ParamsDispatchContext);
    const reportDispatch = useContext(ReportsDispatchContext);

    const setParam = e => {
        const parsed = parseFloat(e.target.value);
        const value = parsed ? parsed : e.target.value;
        setParamValue(paramsDispatch, e.target.name, value);
    };

    const addToReport = () => {
        addParams(reportDispatch, paramsState);
        f7.panel.open();
    };

    if(window.walkthrough){
        if(window.walkthrough.running){
            window.walkthrough.callbacks["params"] = () => {
                
            };
        }
    }

    return (
        <Page>
            <Navbar title="Parámetros de aplicación" style={{maxHeight:"40px", marginBottom:"0px"}}/>
            
            <List form noHairlinesMd style={{marginTop: "0px", padding:"0px 20px"}}>    
                <Input
                    slot="list"
                    label="Distancia recorrida"
                    name="d"
                    type="number"
                    unit="m"
                    icon={iconDistance}
                    value={paramsState.d}
                    borderColor={paramsState.d ? "green" : "#F5E066"}
                    onChange={setParam}>
                </Input>
                <div slot="list" className={"help-target-params_distance_width"}>
                    <Input                    
                        label="Ancho de banda"
                        name="w"
                        type="number"
                        unit="m"
                        icon={iconWidth}
                        value={paramsState.w}
                        borderColor={paramsState.w ? "green" : "#F5E066"}
                        onChange={setParam}>
                    </Input>
                </div>
                <Input
                    slot="list"
                    label="Volumen inicial"
                    name="Vi"
                    type="number"
                    unit="l"
                    icon={iconFull}
                    value={paramsState.Vi}
                    borderColor={paramsState.Vi ? "green" : "#F5E066"}
                    onChange={setParam}>
                </Input>
                <div slot="list" className='help-target-params_volumes'>
                    <Input                        
                        label="Volumen sobrante"
                        name="Vf"
                        type="number"
                        unit="l"
                        icon={iconEmpty}
                        value={paramsState.Vf}
                        borderColor={paramsState.Vf ? "green" : "#F5E066"}
                        onChange={setParam}>
                    </Input>
                </div>
                {paramsState.Vg && <div slot="list">
                    <span style={{fontSize: "0.85em", color: "rgb(100, 100, 100)", marginLeft: "50px"}}>
                        Gasto : {paramsState.Vg} l
                    </span>
                </div>}

                <div slot="list" className="help-target-params_results">
                    <Input                        
                        label="Volumen pulverizado"
                        name="Va"
                        type="number"
                        unit="l/ha"
                        readOnly
                        icon={iconVolume}
                        value={paramsState.Va}
                        borderColor={paramsState.Va ? "green" : "#F5E066"}>
                    </Input>
                </div>
            </List>

            <Row style={{marginTop:20, marginBottom: 20}}>
                <Col width={20}></Col>
                <Col width={60} className="help-target-params_report">
                    <Button 
                        fill
                        style={{textTransform:"none"}} 
                        disabled={!Number.isFinite(paramsState.Va)} 
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