import React from 'react';
import { CartProvider } from '../../context/cart';
import { CartContainer } from '../../containers/cart';
import styled from 'styled-components/macro';
export default function MyCart() {
	return (
		<Wrapper>
			<NavBar>
				<h1 style={{ color: 'white' }}>My cart</h1>
			</NavBar>
			<CartProvider>
				<CartContainer />
			</CartProvider>
		</Wrapper>
	);
}

const NavBar = styled.div`
	position: fixed;
	top: 30px;
	right: 25%;
	left: 25%;
	text-align: center;
`;

const Wrapper = styled.div`
  position:relative;

`