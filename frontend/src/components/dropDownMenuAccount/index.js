import { Dropdown, Header, MenuAccount } from '../index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function DropDownMenuAccount({ children }) {
  const menuAccount = <MenuAccount />;
  return (
    <Dropdown overlay={menuAccount} trigger={['click']}>
      <Header.Icon onClick={(e) => e.preventDefault()}>
        <FontAwesomeIcon icon={faUser} color="white" size="lg" title="Account" />
        {children}
      </Header.Icon>
    </Dropdown>
  );
}
