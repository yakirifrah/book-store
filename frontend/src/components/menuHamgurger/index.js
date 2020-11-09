import { useContext } from 'react';
import { Menu } from './styles/menuHamburger';
import { Header, DropDownMenuAccount } from '../index';
import * as ROUTES from '../../constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BookContext } from '../../store/contexts';
export default function MenuHamburger({ openBurger, ...props }) {
  const isHidden = openBurger ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const { sumQuantity } = useContext(BookContext);
  return (
    <Menu openBurger={openBurger} aria-hidden={!isHidden} {...props}>
      <Header.IconLink to={ROUTES.MY_ORDER_HISTORY} tabIndex={tabIndex}>
        <FontAwesomeIcon icon={faHistory} color="white" size="lg" title="order history" />
        <h6 className="icon_title">my order</h6>
      </Header.IconLink>
      <Header.IconLink to={ROUTES.MY_CART} tabIndex={tabIndex}>
        <FontAwesomeIcon icon={faShoppingCart} color="white" size="lg" title="shooing cart" />
        <h6 className="icon_title">my cart</h6>
        {sumQuantity() > 0 && <Header.NumOfItems>{sumQuantity()}</Header.NumOfItems>}
      </Header.IconLink>
      <DropDownMenuAccount>
        <h6 className="icon_title">Account</h6>
      </DropDownMenuAccount>
    </Menu>
  );
}
