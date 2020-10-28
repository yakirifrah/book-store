import React, { createContext } from 'react';
import { UseLocalStorage } from './../hooks';
const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [cart, setCart] = UseLocalStorage('cart', []);
	const [historyPurchase, setHistoryPurchase] = UseLocalStorage('history', {});
	const addToHistoryPurchase = (_id) => {
		let historyOrders = { ...historyPurchase };
		if (historyOrders[_id]) {
			historyOrders[_id].push(cart);
		}
		historyOrders[_id] = [...cart];
		setHistoryPurchase({ ...historyOrders });
		setCart([]);
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
	};

	const getHistoryPurchasesById = (_id) => {
		let history = JSON.parse(localStorage.getItem('history'));
		return history[_id];
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
				getHistoryPurchasesById: getHistoryPurchasesById,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
const CartConsumer = CartContext.Consumer;

export { CartConsumer, CartProvider };
