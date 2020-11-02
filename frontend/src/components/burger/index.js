import React from 'react';

import { StyledBurger } from './styles/burger';

export default function Burger({ children, openBurger, setOpenBurger, ...props }) {
  const isExpanded = openBurger ? true : false;
  return (
    <StyledBurger
      aria-label="Toggle menu"
      aria-expanded={isExpanded}
      openBurger={openBurger}
      onClick={() => setOpenBurger(!openBurger)}
      {...props}
    >
      <span />
      <span />
      <span />
      {children}
    </StyledBurger>
  );
}
