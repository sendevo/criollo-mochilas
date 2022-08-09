import { Page, Navbar, Link } from 'framework7-react';
import { BackButton } from '../../components/Buttons';
import pictogram from '../../assets/pictograma_seguridad.jpg';
import infoIcon from '../../assets/icons/info.png';
import classes from '../style.module.css';


const styles = {
    container:{padding: "0px 15px"},
    important:{fontSize:"1.5em", fontWeight:"bold", margin:0},
    text: {textAlign: "justify", margin: "5px 0px 0px 0px", lineHeight: "1.5em", color: "black"},
    red: {color: "red"},
    center: {textAlign: "center", display:"flex", flexDirection:"column", alignItems:"center"},
    redSquare: {border: "4px solid red", padding: "10px", margin: "10px 0px", borderRadius: "10px"},
    phone1: {color: "black", fontWeight: "bold", fontSize: "1.5em"},
    phone2: {width: "100%", color: "white", backgroundColor: "black", fontWeight: "bold", fontSize: "1.5em", padding: "5px"}
};

const Security = props => (
    <Page name="info">
        <Navbar title="Seguridad y prevención" style={{maxHeight:"40px", marginBottom:"0px"}}/>      
        <div style={styles.container}>
            <p style={styles.text}><span style={{...styles.important, ...styles.red}}>ATENCIÓN:</span> Consulte en la etiqueta del producto las medidas de seguridad recomendadas.</p>
            <img src={pictogram} alt="pictogram" style={{width:"100%", marginTop:"20px"}}/>
            <div style={styles.redSquare}>
                <p style={styles.text}>En caso de</p>
                <div style={styles.center}>
                    <h3 style={{...styles.important, ...styles.red}}>INTOXICACIONES</h3>
                    <p style={{...styles.text, ...styles.red}}>Centro de Consultas Toxicológicas</p>
                    <p style={styles.text}><Link external style={styles.phone1} href="tel:08008888694">0800 888 8694</Link></p>
                    <p style={styles.text}><Link external style={styles.phone2} href="tel:+5493414242727">0341 424 2727</Link></p>
                    <p style={{...styles.text, ...styles.red}}>las 24 hs.</p>
                    <p style={{...styles.text, fontSize: "0.75em"}}># Tenga a mano el nombre del producto empleado</p>
                    <p style={{...styles.text, fontSize: "0.75em"}}># Agende este número y el del centro de salud más cercano</p>
                </div>
            </div>
            <Link external href="https://inta.gob.ar/documentos/seguridad-y-prevencion-de-accidentes" target="_blank" className={classes.MenuButton}>
                <img className={classes.HomeIcon} src={infoIcon} alt="info"/>
                <p>Más información</p>
            </Link>

        </div>
        <BackButton {...props} gray/>
    
    </Page>
);

export default Security;