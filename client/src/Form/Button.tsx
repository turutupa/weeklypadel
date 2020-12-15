import React from 'react';
import styled from 'styled-components';

import { primary, electricBlue } from 'utils/colors';

const Wrapper = styled.button`
  width: 100%;
  padding: 20px;
  outline: none;
  font-size: 1rem;
  font-family: Commando;
  box-shadow: 8px 8px 0 ${electricBlue};
  cursor: pointer;
  border: none;
  margin-top: 10px;
  margin-bottom: 30px;

  &:hover {
    box-shadow: 8px 8px 0 ${primary};
  }
`;

interface Props {
  children?: React.ReactNode;
  onClick?: (...args: any) => void;
}

export default function Button(props: Props) {
  const { children, onClick } = props;
  return (
    <Wrapper
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </Wrapper>
  );
}
