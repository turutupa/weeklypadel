import React from 'react';
import styled from 'styled-components';

import { primary, electricBlue } from 'utils/colors';
import { border, boxShadow, borderRadius, padding } from './helpers';

interface ButtonProps {
  bg?: string;
  color?: string;
  solid?: boolean;
  disabled?: boolean;
}

const Wrapper = styled.button`
  ${borderRadius}
  ${padding}

  ${({ bg, color, solid, disabled }: ButtonProps): string => {
    return `
      ${solid ? 'box-shadow: none !important;' : boxShadow(electricBlue)}
      ${solid ? 'border: none;' : border(electricBlue)}
      background-color: ${bg};
      color: ${color};
      ${disabled ? 'filter: grayscale(100%);' : null}
      ${disabled ? `cursor: not-allowed;` : `cursor: pointer;`}
    `;
  }};

  font-size: 1rem;
  width: 100%;
  outline: none;
  font-family: Commando;
  margin-top: 10px;
  margin-bottom: 30px;

  &:hover {
    ${({ disabled }) =>
      disabled
        ? `
      filter: grayscale(100%);
      cursor: not-allowed;
      `
        : `
      filter: brightness(1.2);
      cursor: pointer;
      `}
    ${boxShadow(primary)}
  }
`;

interface Props {
  children?: React.ReactNode;
  fontColor?: string;
  bg?: string;
  color?: string;
  solid?: boolean;
  onClick?: (...args: any) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export default function Button(props: Props) {
  let { children, onClick, type, solid, color, bg, disabled } = props;

  // default Background && Font Color
  if (!color) color = 'black';
  if (!bg) bg = 'white';

  return (
    <Wrapper
      solid={solid}
      color={color}
      bg={bg}
      type={type}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      disabled={disabled}
    >
      {children}
    </Wrapper>
  );
}
