import React from 'react';
import { StoreProvider } from '../../context/store';
import { CartContainer } from '../../containers';
import styled from 'styled-components/macro';
export default function MyCart() {
  return (
    <Wrapper>
      <NavBar>
        <h1 style={{ color: 'white' }}>My cart</h1>
      </NavBar>
      <StoreProvider>
        <CartContainer />
      </StoreProvider>
    </Wrapper>
  );
}

const NavBar = styled.div`
  position: absolute;
  top: 13px;
  right: 25%;
  left: 25%;
  text-align: center;
`;

const Wrapper = styled.div`
  position: relative;
`;
