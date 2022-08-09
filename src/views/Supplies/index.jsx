import { 
    Navbar, 
    Page, 
    BlockTitle, 
    Block, 
    Row, 
    Col, 
    List, 
    Button, 
    Checkbox,
    Card, 
    CardContent
} from 'framework7-react';
import { useState, useContext } from 'react';
import * as actions from '../../entities/Model/suppliesActions.js';
import Input from '../../components/Input';
import { BackButton, DeleteButton, AddButton } from '../../components/Buttons';
import { presentationUnits } from '../../entities/API';
import { PresentationSelector } from '../../components/Selectors';
import iconProduct from '../../assets/icons/calculador.png';
import iconDose from '../../assets/icons/recolectado.png';
import iconVolume from '../../assets/icons/dosis.png';
import iconArea from '../../assets/icons/sup_lote.png';
import iconName from '../../assets/icons/reportes.png';
import iconCapacity from '../../assets/icons/capacidad_carga.png';


const Supplies = props => {

    const workVolume = 10;
    // El volumen de aplicacion debe editarse por separado
    const [workVolume2, setWorkVolume2] = useState(workVolume);

    const {
        lotName,
        workArea,
        lotCoordinates,
        gpsEnabled,
        capacity,
        loadBalancingEnabled,
        products        
    } = {};

    const dispatch = ()=>{};

    const handleWorkVolumeChange = e => {
        const value = parseFloat(e.target.value);
        if(value){
            actions.setParameter(dispatch, 'workVolume', value);
            setWorkVolume2(value);
        }
    };

    const submit = () => {
        // La variable workVolume de SuppliesStateContext se actualiza al cambiar workVolume2,
        // pero si se deja con el valor original de workVolume de ModelStateContext, vale "".
        // Por lo tanto, debe actualizarse antes de ir a la vista de resumen de insumos.
        if(workVolume === workVolume2){
            actions.setParameter(dispatch, 'workVolume', workVolume);
        }
        actions.getSuppliesList(dispatch, workVolume2);
    };

    if(window.walkthrough){
        if(window.walkthrough.running){
            window.walkthrough.callbacks["supplies_capacity"] = () => {
                actions.setParameter(dispatch, 'lotName', 'Lote 1');
                actions.setParameter(dispatch, 'workArea', '10');
                actions.setParameter(dispatch, 'capacity', '1000');
            };
            window.walkthrough.callbacks["supplies_add"] = () => {
                actions.newProduct(dispatch);
                actions.setProductParams(dispatch, 0, {name: "Producto 1"});
                actions.setProductParams(dispatch, 0, {dose: 100});
            };
        }
    }

    return (
        <Page>            
            <Navbar title="Calculador de insumos" style={{maxHeight:"40px", marginBottom:"0px"}}/>      
            <BlockTitle 
                style={{marginBottom:"0px", marginTop: "0px"}}
                className="help-target-supplies_form">
                    Datos del lote
            </BlockTitle>
            <List form noHairlinesMd style={{marginBottom:"10px", paddingLeft:"10px"}}>    
                <Input
                    slot="list"
                    label="Lote"
                    name="lotName"
                    type="text"
                    icon={iconName}
                    value={lotName}
                    onChange={v=>actions.setParameter(dispatch,'lotName', v.target.value)}
                    ></Input>
                <Input                    
                    slot="list"
                    label="Superficie"
                    name="workArea"
                    type="number"
                    unit="ha"
                    icon={iconArea}
                    value={workArea}
                    onChange={v=>actions.setParameter(dispatch,'workArea', parseFloat(v.target.value))}
                    ></Input>
                <div 
                    slot="list" 
                    style={{paddingLeft: 30, paddingBottom: 10}}
                    className="help-target-supplies_gps">
                    <Checkbox
                        checked={gpsEnabled}
                        onChange={v=>actions.toggleGPS(dispatch, v.target.checked)}/>
                    <span style={{paddingLeft: 10, color: gpsEnabled ? "#000000" : "#999999", fontSize: "0.8em"}}>Geoposición [{lotCoordinates[0]?.toFixed(4) || '?'}, {lotCoordinates[1]?.toFixed(4) || '?'}] </span>
                </div>
            </List>

            <BlockTitle style={{marginBottom:"0px", marginTop: "20px"}} className="help-target-supplies_capacity">Datos de aplicación</BlockTitle>
            <List form noHairlinesMd style={{marginBottom:"10px", paddingLeft:"10px"}}>
                <Input                    
                    slot="list"
                    label="Volumen de aplicación"
                    name="capacity"
                    type="number"
                    unit="l/ha"
                    icon={iconVolume}
                    value={workVolume2}
                    onChange={handleWorkVolumeChange}
                    ></Input>
                <Input                    
                    slot="list"
                    label="Capacidad de carga"
                    name="capacity"
                    type="number"
                    unit="l"
                    icon={iconCapacity}
                    value={capacity}
                    onChange={v=>actions.setParameter(dispatch,'capacity', parseFloat(v.target.value))}
                    ></Input>
                <div 
                    slot="list" 
                    style={{paddingLeft: 30, paddingBottom: 10}}
                    className="help-target-supplies_balancing">
                    <Checkbox
                        checked={loadBalancingEnabled}
                        onChange={v=>actions.setParameter(dispatch,'loadBalancingEnabled', v.target.checked)}/>
                    <span style={{paddingLeft: 10, color: loadBalancingEnabled ? "#000000" : "#999999", fontSize: "0.8em"}}>Balancear cargas</span>
                </div>
            </List>
            <Block style={{marginTop: "0px", marginBottom: "0px"}}>
                <BlockTitle className="help-target-supplies_add" style={{marginBottom:"0px", marginTop: "0px"}}>Lista de insumos</BlockTitle>
                {
                    products.map((p, index) =>(
                        <Card key={p.key} style={{margin:"0px 0px 10px 0px"}}>
                            <DeleteButton onClick={()=>actions.removeProduct(dispatch, index)}/>
                            <CardContent style={{paddingTop:0}}>
                                <span style={{color:"gray"}}>Producto {index+1}</span>
                                <List form noHairlinesMd style={{marginBottom:"0px", marginTop: "0px", paddingLeft:"10px"}}>
                                    <Input
                                        slot="list"
                                        label="Nombre"
                                        type="text" 
                                        icon={iconProduct}                                       
                                        value={p.name || ''}
                                        onInputClear={()=>actions.setProductParams(dispatch, index, {name: ""})}
                                        onChange={v=>actions.setProductParams(dispatch, index, {name: v.target.value})}
                                        ></Input>
                                    <Input                                        
                                        slot="list"
                                        label="Dosis"
                                        type="number"
                                        unit={presentationUnits[p.presentation]}
                                        icon={iconDose}
                                        value={p.dose || ''}
                                        onInputClear={()=>actions.setProductParams(dispatch, index, {dose: ""})}
                                        onChange={v=>actions.setProductParams(dispatch, index, {dose: parseFloat(v.target.value)})}
                                        ></Input>
                                </List>
                                <PresentationSelector 
                                    value={p.presentation} 
                                    onChange={e=>{actions.setProductParams(dispatch, index, {presentation: e.target.value})}}/>
                            </CardContent>                    
                        </Card>
                    ))
                }
                {
                    products.length > 0 ? 
                        null
                    :                        
                        <div style={{textAlign: "center", color:"rgb(150,150,150)"}}>
                            <p>Agregue productos a la lista presionando en "+"</p>
                        </div>
                }
            </Block>
            <Block style={{margin:0}}>
                <AddButton onClick={() => actions.newProduct(dispatch)}/>
            </Block>
            <Row style={{marginBottom:"15px"}} className="help-target-supplies_results">
                <Col width={20}></Col>
                <Col width={60}>
                    <Button fill onClick={submit} style={{textTransform:"none"}}>Calcular insumos</Button>
                </Col>
                <Col width={20}></Col>
            </Row>                
            <BackButton {...props} />
        </Page>
    );
};

export default Supplies;