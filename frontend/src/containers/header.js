import React, { useContext } from 'react';
import * as ROUTES from '../constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import FocusLock from 'react-focus-lock';
import { Burger, Header, Menu } from '../components';
import styled from 'styled-components/macro';
import { BookContext } from '../store/contexts/bookContext';

export default function HeaderContainer({ props }) {
  const { searchTerm, setSearchTerm, node, openBurger, setOpenBurger } = props;
  const { sumQuantity } = useContext(BookContext);
  return (
    <HeaderWrapper>
      <Header>
        <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="wrapper__icon__user">
          <Header.Icon to={ROUTES.MY_ORDER_HISTORY}>
            <FontAwesomeIcon icon={faHistory} color="white" size="lg" title="order history" />
          </Header.Icon>
          <Header.Icon to={ROUTES.MY_CART}>
            <FontAwesomeIcon icon={faShoppingCart} color="white" size="lg" title="shooing cart" />
            {sumQuantity() > 0 && <Header.NumOfItems>{sumQuantity()}</Header.NumOfItems>}
          </Header.Icon>
          <Header.Icon>
            <FontAwesomeIcon icon={faUser} color="white" size="lg" title="Account" />
          </Header.Icon>
        </div>
        <div className="menu__hamburger" ref={node}>
          <FocusLock disabled={!openBurger}>
            <Burger openBurger={openBurger} setOpenBurger={setOpenBurger} />
            <Menu openBurger={openBurger} setOpenBurger={setOpenBurger} />
          </FocusLock>
        </div>
      </Header>
    </HeaderWrapper>
  );
}
const HeaderWrapper = styled.div`
  z-index: 115;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
  position: sticky;
  top: 0;
  background-color: #1e272e;
`;
