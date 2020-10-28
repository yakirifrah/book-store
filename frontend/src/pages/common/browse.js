import React from 'react';
import { BrowseContainer } from '../../containers';
import { CartProvider } from '../../context/cart';

export default function Browse() {

  return (
		<CartProvider>
			<BrowseContainer />
		</CartProvider>
	);
}
