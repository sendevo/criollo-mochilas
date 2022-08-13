import { ListInput, List } from "framework7-react";
import classes from './style.module.css'

const Select = props => (
    <List className={classes.Container}>
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
    </List>
);

export default Select;