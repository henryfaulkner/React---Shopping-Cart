import React from "react";
import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";

const ZoomIn = styled.div`
  animation: 2s ${keyframes`${zoomIn}`} 1;
`;

const layout = (props: any) => (
  <div>
    <ZoomIn>
      <h1>Shopping Cart</h1>
      <main>{props.children}</main>
    </ZoomIn>
  </div>
);

export default layout;
