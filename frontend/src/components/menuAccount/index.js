import { getUser, signOut } from '../../utils';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';

export default function MenuAccount() {
  const user = getUser();
  const history = useHistory();
  return (
    <Menu
      style={{
        backgroundColor: '#1e272e',
        border: '0.5px solid #95a5a6',
        borderRadius: '2%',
        color: 'white',
      }}
    >
      <Menu.Item key="0">
        {user?.userName ? (
          <span>{user.userName}</span>
        ) : (
          <sapn onClick={(e) => history.push('/Login')}>Login</sapn>
        )}
      </Menu.Item>
      {user && (
        <>
          <Menu.Divider />
          <Menu.Item key="1">
            <span
              className="logout-item"
              onClick={() => {
                signOut();
                history.push('/');
              }}
            >
              Log out
            </span>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}
