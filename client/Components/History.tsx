import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import HistoryHeader from './Containers/HistoryHeader';
import HistoryRow from './Containers/HistoryRow';
import { prependOnceListener } from 'process';



const history = (props) => {
    const name = props.names;

    let itemNames = (
        props.items.map((item, index) => {
            return <HistoryHeader
                name={item.name}
                key={index}
                />
        })
      )

    let quantityRows = (
        props.orders.map((order, index) => {
            return <HistoryRow
                order={order}
                key={index}
                handleDeleteOrder={props.handleDeleteOrder}
                index={index}
            />
        })
    )

    return (
        <table className="table">
            <thead>
                <tr>
                    {itemNames}
                </tr>
            </thead>
            <tbody>
                {quantityRows}
            </tbody>
        </table>);  
}

export default history;