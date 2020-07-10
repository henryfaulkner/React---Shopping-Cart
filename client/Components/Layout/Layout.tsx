import React from 'react';

import Aux from '../../hoc/Aux';


const layout = (props) => (
    <Aux>
        <h1>Shopping Cart</h1>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;