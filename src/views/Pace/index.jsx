import { useState } from 'react';
import { useSound } from 'use-sound';
import { Block, Col, Navbar, Page, Row } from 'framework7-react';
import { BackButton, PlayButton } from '../../components/Buttons';
import slowPaceIcon from '../../assets/icons/slow_pace.png';
import mediumPaceIcon from '../../assets/icons/medium_pace.png';
import fastPaceIcon from '../../assets/icons/fast_pace.png';
import ticSfx from "../../assets/sounds/tic.mp3";
import { useEffect } from 'react';

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

    const [selected, setSelected] = useState(2000);
    const [running, setRunning] = useState(false);
    const [step, setStep] = useState(false);
    const [playTic] = useSound(ticSfx);
    
    useEffect(() => {
        if(running){
            playTic(); //console.log("tic");
            setTimeout(()=>{ 
                setStep(!step);
            }, selected);
        }
    }, [step, running]);

    return (
        <Page>
            <Navbar title="Ritmo" style={{maxHeight:"40px", marginBottom:"10px"}}/>            

            <Block style={{marginTop:"0px", marginBottom:"10px"}}>
                <h4>Seleccione la velocidad de marcha:</h4>
            </Block>

            <Block className="help-target-pace_speed" style={{marginTop:"0px"}}>
                <Row>
                    <Col width={33}>
                        <PaceButton 
                            text="Lento"
                            selected={selected===2000}
                            icon={slowPaceIcon}
                            onClick={()=>setSelected(2000)}/>
                    </Col>
                    <Col width={33}>
                        <PaceButton 
                            text="Medio"
                            selected={selected===1500}
                            icon={mediumPaceIcon}
                            onClick={()=>setSelected(1500)}/>
                    </Col>
                    <Col width={33}>
                        <PaceButton 
                            text="Rápido"
                            selected={selected===1000}
                            icon={fastPaceIcon}
                            onClick={()=>setSelected(1000)}/>
                    </Col>
                </Row>
            </Block>

            <Block className='help-target-pace_start'>
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