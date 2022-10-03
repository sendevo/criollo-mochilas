import { useState, useEffect } from 'react';
import { Block, Col, Navbar, Page, Row } from 'framework7-react';
import { BackButton, PlayButton } from '../../components/Buttons';
import Select from '../../components/Select';
import slowPaceIcon from '../../assets/icons/slow_pace.png';
import mediumPaceIcon from '../../assets/icons/medium_pace.png';
import fastPaceIcon from '../../assets/icons/fast_pace.png';
import soundIcon from '../../assets/icons/sound.png';
//import beepSfx from "../../assets/sounds/beep.wav";
//import beep2Sfx from "../../assets/sounds/beep2.wav";
import chirpSfx from "../../assets/sounds/chirp.wav";
import chirp2Sfx from "../../assets/sounds/chirp2.wav";
import kissSfx from "../../assets/sounds/kiss.wav";

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

const tracks = [
    //{src: beepSfx, name: "Tono 1"},
    //{src: beep2Sfx, name: "Tono 2"},
    {src: chirpSfx, name: "Pájaro 1"},
    {src: chirp2Sfx, name: "Pájaro 2"},
    {src: kissSfx, name: "Chasquido"},
];

const Pace = props => {

    const [selected, setSelected] = useState(2000);
    const [running, setRunning] = useState(false);
    const [step, setStep] = useState(false);
    const [sound, setSound] = useState(0);

    const audio = new Audio(tracks[sound].src);
    
    useEffect(() => {
        if(running){
            audio.play(); //console.log("tic");
            setTimeout(()=>{ 
                setStep(!step);
            }, selected);
        }
    }, [step, running]);

    return (
        <Page>
            <Navbar title="Ritmo" style={{maxHeight:"40px", marginBottom:"10px"}}/>            

            <Select 
                label="Efecto de sonido"
                name="sound"
                icon={soundIcon}
                options={tracks.map((value, index) => ({value: index, text: value.name}))}
                onChange={e => setSound(e.target.value)}/>

            <Block style={{marginTop:"0px", marginBottom:"10px"}}>
                <h4>Velocidad de marcha:</h4>
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