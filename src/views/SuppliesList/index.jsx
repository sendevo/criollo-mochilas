import { f7, Navbar, Page, Row, Col, Button, BlockTitle, List, Block } from 'framework7-react';
import React, { useContext, useState } from 'react';
import { addSupplies } from '../../entities/Model/reportsActions';
import { SuppliesStateContext } from '../../context/SuppliesContext';
import { ReportsDispatchContext } from '../../context/ReportsContext';
import { BackButton } from '../../components/Buttons';
import Input from '../../components/Input';
import { SuppliesTable, PrescriptionTable } from '../../components/SuppliesTable';
import { formatNumber } from '../../utils';
import iconReport from '../../assets/icons/reportes.png';
import classes from './style.module.css';


const SuppliesList = props => {

    const {
        lotName,
        workArea,
        workVolume,
        lotCoordinates,
        loadBalancingEnabled,
        supplies,
        capacity
    } = useContext(SuppliesStateContext);
    
    const dispatch = useContext(ReportsDispatchContext);
    
    const [comments, setComments] = useState('');

    const loadsText = loadBalancingEnabled ? 
        supplies.Ncb+" carga(s) de " +Math.round(supplies.Vcb)+ " litros " 
        : 
        supplies.Ncc+" carga(s) completa(s)"+(supplies.Vf > 0 ? " y 1 fracción de carga de " +Math.round(supplies.Vf)+ " litros" : "");

    const addToReport = () => {        
        addSupplies(dispatch, {
            lotName,
            workArea,
            workVolume,
            lotCoordinates,
            loadBalancingEnabled,
            loadsText,
            pr:supplies.pr,
            capacity,
            comments
        });
        f7.panel.open();
    };

    return (
        <Page>
            <Navbar title="Lista de insumos" style={{maxHeight:"40px", marginBottom:"0px"}} />
            <BlockTitle className={classes.SectionTitle}>Parámetros de Mezcla</BlockTitle>
            <Row>
                <table className={["data-table", classes.MainTable].join(' ')}>
                    <tr>
                        <td><b>Lote:</b></td>
                        <td>{lotName}</td>
                    </tr>
                    {
                        lotCoordinates && 
                        <tr>
                            <td><b>Ubicación:</b></td>
                            <td>{lotCoordinates.length > 0 ? "lat: "+lotCoordinates.join(', long:') : " - "}</td>
                        </tr>
                    }
                    <tr>
                        <td><b>Superficie:</b></td>
                        <td>{formatNumber(workArea,0)} m²</td>
                    </tr>
                    <tr>
                        <td><b>Volumen de pulverización:</b></td>
                        <td>{formatNumber(workVolume)} l/ha</td>
                    </tr>
                    <tr>
                        <td><b>Capacidad del tanque:</b></td>
                        <td>{capacity} litros</td>
                    </tr>
                    <tr>
                        <td><b>Cantidad de cargas:</b></td>
                        <td>{loadsText}</td>
                    </tr>
                </table>
            </Row>

            <Block style={{marginTop:20}}>
                <BlockTitle className={classes.SectionTitle}>Prescripción</BlockTitle>
                <PrescriptionTable supplies={supplies}/>
                
                <BlockTitle className={classes.SectionTitle}>Insumos</BlockTitle>
                <SuppliesTable supplies={supplies} loadBalancing={loadBalancingEnabled}/>
            </Block>
            

            <List form noHairlinesMd style={{marginBottom:"10px", marginTop: "10px"}}>    
                <Input
                    slot="list"
                    label="Observaciones"
                    name="comments"
                    type="textarea"
                    icon={iconReport}
                    value={comments}
                    onChange={e => setComments(e.target.value)}>
                </Input>
            </List>

            <Row style={{marginTop:"20px", marginBottom: "15px"}}>
                <Col width={20}></Col>
                <Col width={60}>
                    <Button className="help-target-add-report" fill onClick={addToReport} style={{textTransform:"none"}}>
                        Agregar a reporte
                    </Button>
                </Col>
                <Col width={20}></Col>
            </Row>

            <BackButton {...props} />

        </Page>
    );
};

export default SuppliesList;