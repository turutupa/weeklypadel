import React from 'react';
import styled from 'styled-components';
import { fontColor, fontWeight, fontFamily } from 'utils/fontProperties';

const properties = function (family: fontFamily, weight: fontWeight): string {
  return `
    font-family: ${family};
    font-weight: ${weight};
  `;
};

export const H1 = styled.h1`
  ${properties(fontFamily.primary, fontWeight.bold)}

  position: relative;
  font-variant: small-caps;
  font-size: 130px;
  -webkit-transform: skew(-5deg, -5deg) perspective(300px);
  padding-left: 80px;
  background-image: -webkit-linear-gradient(
    ${fontColor.primary} 0%,
    #f9f9f7 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  margin-top: 100px;
  -webkit-filter: drop-shadow(2px 2px 20px #f008b7);

  &:before {
    content: '-';
    position: absolute;
    bottom: -88px;
    left: 250px;
    background-image: -webkit-linear-gradient(#f3c8f3 0%, #f3c8f3 100%);
    -webkit-background-clip: text;
    text-shadow: 70px -7px #f3c8f3;
  }

  &:after {
    content: '-';
    position: absolute;
    bottom: -80px;
    left: 380px;
    background-image: -webkit-linear-gradient(#f3c8f3 0%, #f3c8f3 100%);
    -webkit-background-clip: text;
    text-shadow: 70px -5px #f3c8f3;
  }
`;

export const H2 = styled.h2`
  ${properties(fontFamily.secondary, fontWeight.bold)}
`;
export const H3 = styled.h3`
  ${properties(fontFamily.secondary, fontWeight.bold)}
`;

export const H4 = styled.h4`
  ${properties(fontFamily.secondary, fontWeight.bold)}
`;
