import { Card } from "framework7-react";
import classes from './style.module.css';
import { formatNumber } from '../../utils';

const SuppliesTable = props => (
    <Card className={classes.Card}>
        <table className={["data-table", classes.SuppliesTable].join(' ')}>
            <tr>
                <th height="40" className="label-cell" style={{margin:0, padding:0}}>Producto</th>
                {!props.loadBalancing && <th className="label-cell" style={{margin:0, padding:0}}><div>Carga</div><div>completa</div></th>}
                {!props.loadBalancing && <th className="label-cell" style={{margin:0, padding:0}}><div>Fracción</div><div>de carga</div></th>}
                {props.loadBalancing && <th className="label-cell" style={{margin:0, padding:0}}>Carga</th>}
                <th className="label-cell" style={{margin:0, padding:0}}><div>Total</div><div>insumos</div></th>
            </tr>
            <tbody>
            {
                props.supplies.pr?.map(prod => {
                    const unit = prod.presentation === 0 || prod.presentation === 2 ? "l" : "kg";
                    return (
                        <tr key={prod.key}>
                            <td>{prod.name}</td>
                            {!props.loadBalancing && <td>{formatNumber(prod.cpp)} {unit}</td>}
                            {!props.loadBalancing && <td>{formatNumber(prod.cfc)} {unit}</td>}
                            {props.loadBalancing && <td>{formatNumber(prod.ceq)} {unit}</td>}
                            <td>{formatNumber(prod.total)} {unit}</td>
                        </tr>
                    )}
                )
            }
            </tbody>
        </table>
    </Card>
);

export default SuppliesTable;