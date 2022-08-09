import { Link, Block } from 'framework7-react';
import { FaPlay, FaStop, FaArrowLeft, FaArrowRight, FaPlus, FaTrash } from 'react-icons/fa';
import classes from './style.module.css';

export const BackButton = props => (
    <Block className={classes.Container}>
        <Link tooltip="Volver" 
            onClick={() => props.f7router.back()}
            className={classes.RoundButton} 
            style={props.gray?{color:"black", backgroundColor:"rgba(200,200,200,.8)"}:{}}>
            <FaArrowLeft />
        </Link>
    </Block>   
); 

export const GoButton = props => (
    <Block className={classes.Container}>
        <Link 
            style={{backgroundColor: props.color || "blue"}}
            tooltip={props.tooltip} 
            onClick={props.onClick}
            className={classes.RoundButton}>
            <FaArrowRight />
        </Link>
    </Block>   
); 

export const LinkButton = props => (
    <Block style={{textAlign: "center", margin:"0px", padding:"0px", width:"100%"}}>
        <Link {...props} className={props.variant==="square" ? classes.SquaredButton:classes.RoundButton} style={{backgroundColor:props.color, marginTop: props.mt?props.mt:10}}>
            {props.children}
        </Link>
    </Block>   
);

export const DeleteButton = props => (
    <div style={{textAlign:"right", padding:"5px", height:"5px"}}>
        <Link
            tooltip="Quitar" 
            onClick={props.onClick}>
            <FaTrash size={15} color={"darkred"}/>
        </Link>   
    </div>
);

export const AddButton = props => (
    <Block style={{textAlign: "right", margin:"0px", padding:"0px"}}>
        <Link 
            tooltip="Agregar producto" 
            onClick={props.onClick}
            className={classes.RoundButton}
            style={{backgroundColor:"green", margin:"0px 0px 20px 0px"}}
        >
            <FaPlus size={20}/>
        </Link>
    </Block>   
);

export const PlayButton = props => ( // Boton de control del cronometro
    <span style={{minHeight:50}} onClick={()=>{if(!props.disabled) props.onClick()}}>
        {
            props.running ? 
                <FaStop color="red" size={props.size || 40}/>
            :
                <FaPlay color={props.disabled ? "gray":"green"} size={props.size || 40}/>
        }
    </span>
);