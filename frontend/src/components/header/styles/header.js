import styled from 'styled-components/macro';
import { Link as ReachRouterLink } from 'react-router-dom';

export const Container = styled.div`
	display: flex;
	top: 2;
	justify-content: space-between;
	align-items: center;
	margin: 0 56px;
	height: 64px;
	padding: 48px 0;

	.add_book {
		width: fit-content;
		height: 50px;
		border: none;
		outline: none;
		color: #fff;
		background: #111;
		cursor: pointer;
		position: relative;
		z-index: 0;
		border-radius: 10px;
		&:before {
			content: '';
			background: linear-gradient(
				45deg,
				#ff0000,
				#ff7300,
				#fffb00,
				#48ff00,
				#00ffd5,
				#002bff,
				#7a00ff,
				#ff00c8,
				#ff0000
			);
			position: absolute;
			top: -2px;
			left: -2px;
			background-size: 400%;
			z-index: -1;
			filter: blur(5px);
			width: calc(100% + 4px);
			height: calc(100% + 4px);
			animation: glowing 20s linear infinite;
			opacity: 0;
			transition: opacity 0.3s ease-in-out;
			border-radius: 10px;
		}
		&:active {
			color: #000;
		}
		&:active:after {
			background: transparent;
		}
		&:hover:before {
			opacity: 1;
		}
		&:after {
			z-index: -1;
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			background: #111;
			left: 0;
			top: 0;
			border-radius: 10px;
		}
	}

	@keyframes glowing {
		0% {
			background-position: 0 0;
		}
		50% {
			background-position: 400% 0;
		}
		100% {
			background-position: 0 0;
		}
	}
`;

export const SearchIcon = styled.button`
	cursor: pointer;
	background-color: transparent;
	border: 0;
	img {
		filter: brightness(0) invert(1);
		width: 16px;
	}
`;
export const SearchInput = styled.input`
	background-color: #44444459;
	color: white;
	border: 1px solid white;
	transition: width 0.5s;
	height: 30px;
	font-size: 14px;
	margin-left: 10px;
`;

export const Search = styled.div`
	display: flex;
	align-items: center;
`;

export const NumOfItems = styled.div`
	top: -21px;
	width: 24px;
	height: 24px;
	right: -15px;
	font-size: 0.8rem;
	background: #fa2297;
	color: #fff;
	display: flex;
	border-radius: 50%;
	position: absolute;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	transform: translate(0, 0);
	transition: transform 0.3s cubic-bezier(0.1, 0.71, 0.58, 1.3);
`;

export const Icon = styled(ReachRouterLink)`
	cursor: pointer;
	margin: 4em;
	position: relative;
	.fa-shopping-cart {
		&::before {
			content: '';
		}
	}
`;

export const Title = styled.h1`
	font-size: 25px;
	color: white;
	text-align: center;
`;
