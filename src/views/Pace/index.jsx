import { useState } from 'react';
import { Block, Col, Navbar, Page, Row } from 'framework7-react';
import { BackButton, PlayButton } from '../../components/Buttons';
import slowPaceIcon from '../../assets/icons/slow_pace.png';
import mediumPaceIcon from '../../assets/icons/slow_pace.png';
import fastPaceIcon from '../../assets/icons/slow_pace.png';

const PaceButton = ({selected, icon, onClick, text}) => {
    return (
        <div style={{padding: "10px"}}>
            <img
                style={{
                    border: "3px solid " + (selected ? "green":"yellow"), 
                    borderRadius: "10px",                                        
                    left: "0px",
                    width: "90%",  
                    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)"    
                }}
                src={icon} 
                onClick={onClick}
                slot="media" 
                alt="icon"/>
            <center>
                <span>{text}</span>
            </center>
        </div>
    );
};

const Pace = props => {

    const [selected, setSelected] = useState("slow");
    const [running, setRunning] = useState(false);
    
    return (
        <Page>
            <Navbar title="Ritmo" style={{maxHeight:"40px", marginBottom:"10px"}}/>            

            <Block style={{marginTop:"0px"}}>
                <h4>Seleccione el tipo de paso:</h4>
            </Block>

            <Block>
                <Row>
                    <Col width={33}>
                        <PaceButton 
                            text="Lento"
                            selected={selected==="slow"}
                            icon={slowPaceIcon}
                            onClick={()=>setSelected("slow")}/>
                    </Col>
                    <Col width={33}>
                        <PaceButton 
                            text="Medio"
                            selected={selected==="medium"}
                            icon={mediumPaceIcon}
                            onClick={()=>setSelected("medium")}/>
                    </Col>
                    <Col width={33}>
                        <PaceButton 
                            text="Rápido"
                            selected={selected==="fast"}
                            icon={fastPaceIcon}
                            onClick={()=>setSelected("fast")}/>
                    </Col>
                </Row>
            </Block>

            <Block>
                <Row style={{justifyContent:"center", marginTop:10}}>
                    <PlayButton 
                        size={80}
                        disabled={!selected}
                        running={running}
                        onClick={()=>setRunning(!running)}/>
                </Row> 
            </Block>       

            <BackButton {...props} />
        </Page>
    );
};

export default Pace;