import { createContext } from 'react';
import { useLocalStorage } from '../../hooks';

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('cart', {});
  const [historyPurchase, setHistoryPurchase] = useLocalStorage('history', {});

  const addToHistoryPurchase = (userId) => {
    let copyHistoryPurchase = { ...historyPurchase };
    let copyCart = { ...cart };
    if (copyHistoryPurchase[userId]) {
      for (const [key, value] of Object.entries(cart)) {
        if (copyHistoryPurchase[userId][key]) {
          copyCart = { ...copyHistoryPurchase[userId] };
          copyCart[key].quantity = copyCart[key].quantity + value.quantity;
        }
      }
      copyHistoryPurchase[userId] = { ...copyHistoryPurchase[userId], ...copyCart };
    } else {
      copyHistoryPurchase[userId] = { ...copyCart };
    }
    setHistoryPurchase((prevState) => ({ ...prevState, ...copyHistoryPurchase }));
    setCart({});
  };

  const deleteItem = (_id) => {
    const copyCart = { ...cart };
    delete copyCart[_id];
    setCart(copyCart);
  };

  const addToCart = (item) => {
    const itemId = item._id;
    const copyCart = { ...cart };
    if (!copyCart[itemId]) {
      item.quantity = 1;
      copyCart[itemId] = { ...item };
      return setCart((prevCart) => ({ ...prevCart, ...copyCart }));
    }
    copyCart[itemId].quantity++;
    return setCart((prevCart) => ({ ...prevCart, ...copyCart }));
  };

  const sumQuantity = () => {
    return Object.keys(cart).length;
  };

  const totalPurchaseToPay = () => {
    return Object.keys(cart).reduce(
      (sum, key) => sum + parseFloat(cart[key].quantity * cart[key].price || 0),
      0,
    );
  };

  const getHistoryPurchasesByUser = (userId) => {
    if (!historyPurchase[userId]) return;
    return Object.values(historyPurchase[userId]);
  };

  const addQuantity = (id) => {
    const copyCart = { ...cart };
    copyCart[id].quantity += 1;
    setCart(copyCart);
  };
  const minusQuantity = (id) => {
    const copyCart = { ...cart };
    if (copyCart[id].quantity <= 1) {
      return deleteItem(id);
    }
    copyCart[id].quantity -= 1;
    setCart(copyCart);
  };

  return (
    <BookContext.Provider
      value={{
        cart,
        historyPurchase,
        addToCart: addToCart,
        deleteItem: deleteItem,
        addToHistoryPurchase: addToHistoryPurchase,
        sumQuantity: sumQuantity,
        totalPurchaseToPay: totalPurchaseToPay,
        getHistoryPurchasesByUser: getHistoryPurchasesByUser,
        addQuantity: addQuantity,
        minusQuantity: minusQuantity,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
