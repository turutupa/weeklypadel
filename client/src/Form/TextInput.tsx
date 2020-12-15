import React from 'react';
import styled from 'styled-components';

import { primary, electricBlue } from 'utils/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-family: Commando;
`;

const Input = styled.input`
  box-shadow: 8px 8px 0 ${electricBlue};

  outline: none;
  padding: 20px;
  font-family: Commando;
  font-size: 1rem;
  text-align: left;
  border: none;

  &:focus {
    box-shadow: 8px 8px 0 ${primary};
  }
`;

interface Props {
  label: string;
  value: string;
  callback?: (...args: any) => void;
}

export default function FormInput(props: Props) {
  const { label, value, callback } = props;

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(e) => {
          console.log(e.target.value);
          if (callback) {
            callback(e.target.value);
          }
        }}
      />
    </Wrapper>
  );
}
