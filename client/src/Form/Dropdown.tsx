import React from 'react';
import styled from 'styled-components';
import { electricBlue } from 'utils/colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-family: Commando;
`;

const Select = styled.select`
  font-family: Commando;
  font-size: 1rem;
  padding: 20px;
  box-shadow: 8px 8px ${electricBlue};
  border: none;
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
          if (callback) callback(e.target.value);
        }}
      >
        {renderOptions()}
      </Select>
    </Wrapper>
  );
}
