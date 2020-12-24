import React from 'react';
import styled, { keyframes } from 'styled-components';

const throughSpace = keyframes`
0% {
  transform: perspective(300px) rotateX(80deg) translateY(0%);
}
100% {
  transform: perspective(300px) rotateX(80deg) translateY(6%);
}
`;

const Grid = styled.div`
z-index: 3;
position: absolute;
top: -400px;
bottom: -400px;
left: -400px;
right: -400px;
background-color: rgb(15, 0, 25);
background-image: linear-gradient(
    rgba(255, 41, 116, 0.3) 1px,
    transparent 2px
  ),
  linear-gradient(90deg, rgb(255, 41, 117, 0.3) 1px, transparent 2px);
background-size: 3% 3%, 3% 3%;
background-position: 0 0, 0 0;

transform: perspective(300px) rotateX(80deg);
animation: ${throughSpace} 2s linear;
animation-iteration-count: infinite;
}
`;

export default Grid;
