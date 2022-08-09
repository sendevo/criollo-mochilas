import { Navbar, Page, Block, Row, Col, Button, BlockTitle } from 'framework7-react';
import { loadReport } from '../../entities/Model/reportsActions';
import { BackButton } from '../../components/Buttons';
import { SuppliesTable, PrescriptionTable } from '../../components/SuppliesTable';
import { formatNumber } from '../../utils';
import moment from 'moment';
import { Capacitor } from '@capacitor/core';
import PDFExport from '../../entities/PDF';
import classes from './style.module.css';

const ReportDetails = props => {
    
    const report = loadReport(props.id);

    const exportReport = share => {
        PDFExport(report, share);
    };

    return (
        <Page>            
            <Navbar title={"Reporte de la labor"} style={{maxHeight:"40px", marginBottom:"0px"}}/>
            <Block className={classes.HeaderBlock}>
                <p><b>Nombre: </b>{report.name}</p>
                <p><b>Fecha y hora: </b>{moment(report.timestamp).format("DD/MM/YYYY - HH:mm")}</p>
            </Block>
            {
                report.completed.params &&
                <Block className={classes.SectionBlock}>
                    <h3>Parámetros de aplicación</h3>
                    <table className={classes.Table}>
                        <tbody>                                                        
                            <tr>
                                <td><b>Distancia entre filas:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.rowSeparation)} m</td>
                            </tr>
                            <tr>
                                <td><b>Cantidad de arcos:</b></td>
                                <td className={classes.DataCell}>{report.params.arcNumber}</td>
                            </tr>
                            <tr>
                                <td><b>Velocidad de trabajo:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.workVelocity)} km/h</td>
                            </tr>
                            <tr>
                                <td><b>Presión de trabajo:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.workPressure)} bar</td>
                            </tr>
                            <tr>
                                <td><b>Volumen de aplicación:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.workVolume)} l/ha</td>
                            </tr>
                            <tr>
                                <td><b>Caudal de aire:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.params.airFlow)} m³/h</td>
                            </tr>
                        </tbody>
                    </table>
                </Block>
            }
            {
                report.completed.control &&
                <Block className={classes.SectionBlock}>
                    <h3>Verificación de picos</h3>

                    <b>Arco derecho</b>
                    <table className={classes.Table}>
                        <tbody>
                            <tr>
                                <td><b>Volumen efectivo:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.control.outputs.right.effectiveSprayVolume)} l/min</td>
                            </tr>
                            <tr>
                                <td><b>Diferencia:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.control.outputs.right.diff)} l/min ({formatNumber(report.control.outputs.right.diffp)} %)</td>
                            </tr>
                        </tbody>
                    </table>
                    {
                        report.control.arcNumber === 2 &&
                        <>
                            <br/>
                            <b>Arco izquierdo</b>
                            <table className={classes.Table}>
                                <tbody>
                                    <tr>
                                        <td><b>Volumen efectivo:</b></td>
                                        <td className={classes.DataCell}>{formatNumber(report.control.outputs.left.effectiveSprayVolume)} l/min</td>
                                    </tr>
                                    <tr>
                                        <td><b>Diferencia:</b></td>
                                        <td className={classes.DataCell}>{formatNumber(report.control.outputs.left.diff)} l/min ({formatNumber(report.control.outputs.left.diffp)} %)</td>
                                    </tr>
                                </tbody>
                            </table>
                            <NozzlesControlTable 
                                data={report.control.tableData.left} 
                                onDataChange={()=>{}} 
                                rowSelectDisabled={true}
                                evalCollected={()=>{}}/>
                        </>
                    }
                </Block>
            }  
            {
                report.completed.supplies &&
                <Block className={classes.SectionBlock}>
                    <h3>Cálculo de mezcla</h3>
                    <BlockTitle className={classes.SectionTitle}>Parámetros de mezcla</BlockTitle>
                    <table className={classes.Table}>
                        <tbody>
                            <tr>
                                <td><b>Lote:</b></td>
                                <td className={classes.DataCell}>{report.supplies.lotName}</td>
                            </tr>
                            {
                                report.supplies.lotCoordinates &&
                                <tr>
                                    <td><b>Ubicación:</b></td>
                                    <td className={classes.DataCell}>{report.supplies.lotCoordinates.length > 0 ? "lat: "+report.supplies.lotCoordinates.join(', long:') : " - "}</td>
                                </tr>
                            }
                            <tr>
                                <td><b>Superficie:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.supplies.workArea)} ha</td>
                            </tr>
                            <tr>
                                <td><b>Volumen pulverizado:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.supplies.workVolume)} l/ha</td>
                            </tr>
                            <tr>
                                <td><b>Capacidad del tanque:</b></td>
                                <td className={classes.DataCell}>{formatNumber(report.supplies.capacity, 0)} litros</td>
                            </tr>
                            <tr>
                                <td><b>Cantidad de cargas:</b></td>
                                <td className={classes.DataCell}>{report.supplies.loadsText}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <BlockTitle className={classes.SectionTitle}>Prescripción</BlockTitle>
                    <PrescriptionTable supplies={report.supplies}/>

                    <BlockTitle className={classes.SectionTitle}>Insumos</BlockTitle>
                    <SuppliesTable supplies={report.supplies} loadBalancing={report.supplies.loadBalancingEnabled}/>
                    
                    {report.supplies.comments && 
                    <div>
                        <BlockTitle className={classes.SectionTitle}>Observaciones</BlockTitle> 
                        <p className={classes.CommentsBlock}>{report.supplies.comments.length > 0 ? report.supplies.comments : " - "}</p>
                    </div>
                    }
                </Block>
            }
            <Row style={{marginTop:10, marginBottom: 10}}>
                <Col width={20}></Col>
                <Col width={60}>
                    <Button fill onClick={()=>exportReport(false)} style={{textTransform:"none"}}>Guardar como  PDF</Button>
                </Col>
                <Col width={20}></Col>
            </Row>

            {Capacitor.isNativePlatform() &&
                <Row>
                    <Col width={20}></Col>
                    <Col width={60}>
                        <Button fill color="teal" onClick={()=>exportReport(true)} style={{textTransform:"none"}}>Compartir</Button>
                    </Col>
                    <Col width={20}></Col>
                </Row>
            }
            
            <BackButton {...props}/>
            
        </Page>
    );
};

export default ReportDetails;