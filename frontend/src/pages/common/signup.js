import { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '../../components';
import { AuthContext } from '../../store/contexts';
import { observer } from 'mobx-react-lite';

import * as ROUTES from '../../constants/routes';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SignUp = observer(() => {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const role = location.pathname === '/admin/signup' ? 'admin' : 'user';
  const isInvalid = userName === '' || password === '';

  const handleSignup = async (event) => {
    event.preventDefault();
    await auth
      .createUser({
        userName,
        password,
        role,
      })
      .catch((error) => {
        setUserName('');
        setPassword('');
        return setError(error.response.data.message);
      });
    return role === 'admin' ? history.push('/admin/browse') : history.push(ROUTES.HOME);
  };

  return (
    <>
      <Form signUp>
        <Form.Title>Sign Up</Form.Title>
        {error && <Form.Error>{error}</Form.Error>}
        <Form.Base onSubmit={handleSignup}>
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
          <Form.Submit disabled={isInvalid || auth.state === 'done'} type="submit">
            {auth.state === 'pending' && <Form.Indicator icon={faSpinner} />}
            Sign Up
          </Form.Submit>
        </Form.Base>
      </Form>
    </>
  );
});
export default SignUp;
