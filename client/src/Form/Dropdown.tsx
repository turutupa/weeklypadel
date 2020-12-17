import React from 'react';
import styled from 'styled-components';
import { primary, electricBlue } from 'utils/colors';
import { border, boxShadow, borderRadius, fontSize, padding } from './helpers';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Label = styled.label`
  ${fontSize}
  margin-bottom: 10px;
  font-family: Commando;
`;

const Select = styled.select`
  ${border(electricBlue)}
  ${boxShadow(electricBlue)}
  ${borderRadius}
  ${fontSize}
  ${padding}

  cursor: pointer;
  outline: none;
  font-family: Neon;

  &:focus {
    ${border(primary)}
    ${boxShadow(primary)}
  }
`;

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  callback?: (value: string) => void;
}

export default function Dropdown(props: Props) {
  const { label, options, callback } = props;

  function renderOptions() {
    return options.map((option) => {
      const { label, value } = option;

      return (
        <option key={value} value={value}>
          {label}
        </option>
      );
    });
  }

  return (
    <Wrapper>
      <Label htmlFor='cars'>{label}</Label>
      <Select
        placeholder='Select one...'
        name='tournamentType'
        id='tournamentType'
        onChange={(e) => {
          e.stopPropagation();
          if (callback) callback(e.target.value);
        }}
      >
        {renderOptions()}
      </Select>
    </Wrapper>
  );
}
