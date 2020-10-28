import React from 'react';
import { BrowseContainer } from '../../containers/browse';
import { CartProvider } from '../../context/cart';

export default function Browse() {

  return (
		<CartProvider>
			<BrowseContainer />
		</CartProvider>
	);
}
