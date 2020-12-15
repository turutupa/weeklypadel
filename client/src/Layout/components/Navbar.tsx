import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { homeRoute } from 'utils/routes';
import { siteAcronym } from 'utils/constants';
import { primary, dark } from 'utils/colors';

const NavContainer = styled.div`
  position: fixed;
  height: 80px;
  width: 100%;
  background-color: ${dark};
  z-index: 9999;
  font-family: Commando;
  top: 0;
  color: white;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding: 30px 5vw;

  @media (min-width: 768px) {
    padding: 30px 20vw;
  }
`;

const NavItem = styled.div`
  margin-right: 3%;
`;

const Strong = styled.strong`
  color: ${({ color }: { color?: string }) =>
    color ? `${color} !important` : `${primary} !important`};
  font-size: 1.2rem;
  font-family: Commando;
  cursor: pointer;

  &:hover {
    filter: brightness(1.4);
  }
`;

export default function Navbar() {
  return (
    <NavContainer>
      <Nav>
        <NavItem>
          <Link to={homeRoute} style={{ textDecoration: 'none' }}>
            <Strong color={primary}>{siteAcronym}</Strong>
          </Link>
        </NavItem>
      </Nav>
    </NavContainer>
  );
}
