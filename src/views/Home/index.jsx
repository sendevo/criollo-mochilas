import { Page, Link, PageContent, Block } from 'framework7-react';
import paramsIcon from '../../assets/icons/mochila.png'
import suppliesIcon from '../../assets/icons/calculador.png';
import reportsIcon from '../../assets/icons/reportes.png';
import securityIcon from '../../assets/icons/seguridad.png';
import infoIcon from '../../assets/icons/info.png';
import logoInta from '../../assets/backgrounds/logoInta.png';
import logoMin from '../../assets/backgrounds/logomin.png';
import logo from '../../assets/icons/iconocriollom.png';
import classes from '../style.module.css';

const Home = () => (
    <Page name="home" className={classes.HomePage}>
        <PageContent>
            <Block style={{textAlign: "center", marginBottom: "0px", marginTop:"20px"}}>
                <img className="app-logo" src={logo} height="100px" width="100px" alt="logo"/>
            </Block>
            <Block style={{textAlign: "center", marginTop:"5px"}}>
                <h2 className={classes.Title}>CRIOLLO</h2>
                <h3 className={classes.Title}>Mochilas</h3>
            </Block>
            <Block className={classes.ButtonContainer}>
                <Link href="/params/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={paramsIcon} alt="params"/>
                    <p>Parámetros de <br/> aplicación</p>
                </Link>
                <Link href="/pace/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={suppliesIcon} alt="pace"/>
                    <p>Ritmo</p>
                </Link>
                <Link href="/supplies/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={suppliesIcon} alt="supplies"/>
                    <p>Calculador de mezclas</p>
                </Link>
                <Link href="/security/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={securityIcon} alt="security"/>
                    <p>Seguridad y prevención</p>
                </Link>
                <Link href="/reports/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={reportsIcon} alt="reports"/>
                    <p>Reportes</p>
                </Link>
                <Link href="/info/" className={classes.MenuButton}>
                    <img className={classes.HomeIcon} src={infoIcon} alt="info"/>
                    <p>Información y ayuda</p>
                </Link>
            </Block>
            <div className={classes.LogoFooter}>
                <img src={logoInta} height="80%" className={classes.LogoInta} alt="inta"/>
                <img src={logoMin} height="80%" className={classes.LogoMin} alt="ministerio"/>
            </div>            
        </PageContent>
    </Page>
);

export default Home;