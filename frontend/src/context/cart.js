import React, { createContext, useState } from 'react';
import { UseLocalStorage } from './../hooks';
const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = UseLocalStorage('cart', []);
	const [historyPurchase, setHistoryPurchase] = useState({});
	const addToHistoryPurchase = (_id, items) => {
		setHistoryPurchase({
			_id: [...items],
		});
	};

	const deleteItem = (_id) => {
		let tempCart = JSON.parse(localStorage.getItem('cart'));
		tempCart = tempCart.filter((item) => item._id !== _id);
		setCart(tempCart);
	};

	const addToCart = (item) => {
		let quantity;
		let tempCart = JSON.parse(localStorage.getItem('cart'));

		if (!tempCart?.length) {
			quantity = 1;
			item.quantity = quantity;
			console.log(item);
			return setCart((prevCart) => [...prevCart, item]);
		}
		const selectedCart = tempCart.find((el) => el._id === item._id);
		if (selectedCart) {
			const index = tempCart.indexOf(selectedCart);
			tempCart[index].quantity++;
			return setCart((prevCart) => [...tempCart]);
		}
		item.quantity = 1;
		return setCart((prevCart) => [...prevCart, item]);
	};

	const sumQuantity = () => {
		return cart.reduce((a, b) => a + (b.quantity || 0), 0);
	};

	const totalPurchaseToPay = () => {
				return cart.reduce((a, b) => a + (b.quantity * b.price || 0), 0);

	}

	return (
		<CartContext.Provider
			value={{
				cart,
				historyPurchase,
				addToCart: addToCart,
				deleteItem: deleteItem,
				addToHistoryPurchase: addToHistoryPurchase,
				sumQuantity: sumQuantity,
				totalPurchaseToPay: totalPurchaseToPay,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
const CartConsumer = CartContext.Consumer;

export { CartConsumer, CartProvider };
