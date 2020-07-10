import React from 'react';

import '../Styles/Order.css';

const order = (props) => {
    return (
        <div className="text-left">
            <label>{props.itemName}</label>
            <input type="number" id={props.itemName} value={props.quantity} onChange={props.changed}/> <br/>
        </div>
    );
}

export default order;