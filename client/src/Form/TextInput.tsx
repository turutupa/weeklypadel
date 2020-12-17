import React from 'react';
import styled from 'styled-components';

import { primary, electricBlue } from 'utils/colors';
import { border, boxShadow, borderRadius, fontSize, padding } from './helpers';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;

const Label = styled.label`
  ${fontSize}
  margin-bottom: 10px;
  font-family: Commando;
`;

const Input = styled.input`
  ${border(electricBlue)}
  ${boxShadow(electricBlue)}
  ${borderRadius}
  ${fontSize}
  ${padding}

  outline: none;
  font-family: Neon;
  text-align: left;

  &:focus {
    ${boxShadow(primary)}
    ${border(primary)}
  }
`;

const Error = styled.div`
  position: absolute;
  bottom: -30px;
  left: 15px;
  font-size: 0.8rem;
  color: ${primary};
`;

interface Props {
  label: string;
  value: string;
  callback?: (...args: any) => void;
  error?: string;
}

export default function FormInput(props: Props) {
  const { label, value, callback, error } = props;

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(e) => {
          e.stopPropagation();
          if (callback) {
            callback(e.target.value);
          }
        }}
      />
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
}
