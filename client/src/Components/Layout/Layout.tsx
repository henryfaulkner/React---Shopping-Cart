import React from 'react';

const layout = (props: any) => (
    <div>
        <h1>Shopping Cart</h1>
        <main>
            {props.children}
        </main>
    </div>
);

export default layout;