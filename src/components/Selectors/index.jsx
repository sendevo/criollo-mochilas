import { Block, Radio, Row, Col, BlockTitle } from 'framework7-react';


const label = {
    display:"flex", 
    flexDirection: "column", 
    alignContent:"center", 
    alignItems: "center",
    color: "#777777"
};

export const PresentationSelector = ({value, onChange}) => (
    <div>
        <Row style={{fontSize:"0.8em", marginBottom: 5, marginTop: 10}}>
            <Col width={50}>
                <div style={label}>
                    Líquidos
                </div>
            </Col>
            <Col width={50}>
                <div style={label}>
                    Sólidos
                </div>
            </Col>
        </Row>
        <Row style={{fontSize:"0.7em"}}>
            <Col  width={25}>
                <Radio 
                    name="input-type" 
                    checked={value === 0} 
                    onChange={e=>onChange({target:{value:0}})}/> ml/ha
            </Col>
            <Col width={25}>
                <Radio 
                    name="input-type" 
                    checked={value === 2} 
                    onChange={e=>onChange({target:{value:2}})}/> ml/100l
            </Col>
            <Col  width={25}>
                <Radio 
                    name="input-type" 
                    checked={value === 1} 
                    onChange={e=>onChange({target:{value:1}})}/> gr/ha
            </Col>
            <Col width={25}>
                <Radio 
                    name="input-type" 
                    checked={value === 3} 
                    onChange={e=>onChange({target:{value:3}})}/> gr/100l
            </Col>
        </Row>
    </div>
);


export const ElapsedSelector = ({name, value, disabled, onChange}) => {

    const setElapsed = (el, val) => {
        if(el.target.checked)
            onChange({
                target:{
                    name, 
                    value: val
                }
            });
    };

    return (
        <Block style={{margin:"0px"}} className="help-target-control_sampling">
            <BlockTitle>Tiempo de muestreo</BlockTitle>
            <Row>
                <Col style={{textAlign:"center"}}>
                    <Radio 
                        disabled={disabled}
                        name="input-type" 
                        checked={value===30000} 
                        onChange={e=>setElapsed(e,30000)}/> 30 seg.
                </Col>
                <Col style={{textAlign:"center"}}>
                    <Radio 
                        disabled={disabled}
                        name="input-type" 
                        checked={value===60000} 
                        onChange={e=>setElapsed(e,60000)}/> 60 seg.
                </Col>
                <Col style={{textAlign:"center"}}>
                    <Radio 
                        disabled={disabled}
                        name="input-type" 
                        checked={value===90000} 
                        onChange={e=>setElapsed(e,90000)}/> 90 seg.
                </Col>
            </Row>
        </Block>
    );
};
