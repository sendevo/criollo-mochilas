import { ListInput } from "framework7-react";
import classes from './style.module.css'

const Select = props => (
    <div className={classes.Container} style={props.style}>
        <ListInput
            className={classes.Select}
            outline
            floatingLabel
            type="select"
            {...props}>
            {
            props.icon ?
                <img className={classes.SelectIcon} 
                    style={props.borderColor ? {
                        border: "3px solid "+props.borderColor, 
                        borderRadius: "10px", 
                        marginLeft: -5
                    } : {}}
                    src={props.icon} 
                    onClick={props.onIconClick}
                    slot="media" alt="icon"/>
            :
                null
            }   
            {
                props.options.map((op, index) => (
                    <option key={index} value={op.value}>{op.text}</option>
                ))
            }
        </ListInput>
    </div>
);

export default Select;