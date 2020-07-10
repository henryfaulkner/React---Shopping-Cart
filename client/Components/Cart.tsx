import React from 'react';

//Stateless component
const cart = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.quantity}</td>
        </tr>
    );
}

export default cart;