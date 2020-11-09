import { useState, useContext } from 'react';
import { Form } from '../../components';
import { observer } from 'mobx-react-lite';
import { AuthContext } from '../../store/contexts';
import { useHistory, useLocation } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components/macro';

const Login = observer(
  ({ role = 'user', path, modalLogin = false, setShowModalLogin, setUserId }) => {
    const history = useHistory();
    const location = useLocation();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);
    const isInvalid = password === '' || userName === '';

    const handleSignIn = async (event) => {
      event.preventDefault();
      await auth.login({ userName, password, role }).catch((error) => {
        setError(error.response.data.message);
        setPassword('');
        setUserName('');
      });
      if (role === 'admin') {
        return history.push('/admin/browse', 'admin');
      }
      if (location.pathname === '/my-cart') return setShowModalLogin(false);
      else if (location.pathname === '/my-orders') return setUserId(auth.user?.user_id || '');
      return history.push('/');
    };
    return (
      <Wrapper>
        <Form modalLogin={modalLogin} login={!modalLogin}>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSignIn}>
            <Form.Input
              placeholder="user name"
              value={userName}
              onChange={({ target }) => setUserName(target.value)}
            />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Text>
              New Admin?{' '}
              <Form.Link to={path ? `${path}/signup` : '/signup'}>Sign up now.</Form.Link>
            </Form.Text>
            <Form.Submit disabled={isInvalid || auth.state === 'done'} type="submit">
              {auth.state === 'pending' && <Form.Indicator icon={faSpinner} />}
              Sign In
            </Form.Submit>
          </Form.Base>
        </Form>
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: inherit;
`;
export default Login;
