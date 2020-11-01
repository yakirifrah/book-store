import React from 'react';
import { BrowseContainer } from '../../containers';
import { StoreProvider } from '../../context/store';

export default function Browse() {
  return (
    <StoreProvider>
      <BrowseContainer />
    </StoreProvider>
  );
}
