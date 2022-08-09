import { ListInput } from "framework7-react";
import classes from './style.module.css'

const Input = props => (
    <div className={classes.Container} style={props.style}>
        <ListInput
            className={classes.Input}
            outline
            readonly={props.readonly}
            floatingLabel
            inputStyle={{boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"}}
            {...props}>
            {
            props.icon ?
                <img className={classes.InputIcon} 
                    style={props.borderColor ? {
                        border: "3px solid "+props.borderColor, 
                        borderRadius: "10px"    
                    } : {}}
                    src={props.icon} 
                    onClick={props.onIconClick}
                    slot="media" alt="icon"/>
            :
                null
            }   
        </ListInput>
        {props.unit ? <span className={classes.UnitLabel}>{props.unit}</span> : null}
    </div>
);

export default Input;