import React, { useState } from 'react';
import { Form } from '../../components';
import { useHistory } from 'react-router-dom';
import API from '../../api';

export default function Login({ role = 'user', path, modalLogin = false }) {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || userName === '';

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const res = await API.signInUser({
        userName,
        password,
        role,
      });
      if (role === 'admin') {
        sessionStorage.setItem(
          'login',
          JSON.stringify({
            token: res.data.token,
            user_id: res.data.user_id,
            login: true,
            role: role,
          }),
        );
        return history.push('/admin/browse', 'admin');
      }
      localStorage.setItem(
        'login',
        JSON.stringify({
          token: res.data.token,
          user_id: res.data.user_id,
          login: true,
          role: role,
        }),
      );

      return history.push('/');
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
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
            New Admin? <Form.Link to={path ? `${path}/signup` : '/signup'}>Sign up now.</Form.Link>
          </Form.Text>
          <Form.Submit disabled={isInvalid} type="submit">
            Sign In
          </Form.Submit>
        </Form.Base>
      </Form>
    </>
  );
}
