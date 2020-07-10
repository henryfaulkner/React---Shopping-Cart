import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import HistoryHeader from './Containers/HistoryHeader';
import HistoryRow from './Containers/HistoryRow';
import { prependOnceListener } from 'process';



const history = (props: any) => {
    const name = props.names;

    let itemNames = (
        props.items.map((item: any, index: any) => {
            return <HistoryHeader
                name={item.name}
                key={index}
                />
        })
      )

    let quantityRows = (
        props.orders.map((order: any, index: any) => {
            return <HistoryRow
                order={order}
                key={index}
                handleDeleteOrder={props.handleDeleteOrder}
                index={index}
            />
        })
    )

    return (
        <div>
            <h1>Order History</h1>
            <table className="table">
                <thead>
                    <tr>
                        {itemNames}
                    </tr>
                </thead>
                <tbody>
                    {quantityRows}
                </tbody>
            </table>
        </div>);  
}

export default history;