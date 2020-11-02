import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Form } from '../../components';
import API from '../../api';
import * as ROUTES from '../../constants/routes';

export default function SignUp() {
  const history = useHistory();
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const role = location.pathname === '/admin/signup' ? 'admin' : 'user';
  const isInvalid = userName === '' || password === '';

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const res = await API.signUpUser({
        userName,
        password,
        role,
      });
      if (role === 'admin') {
        sessionStorage.setItem(
          'login',
          JSON.stringify({ userName, password, role, token: res.data.token, login: true }),
        );
      } else {
        localStorage.setItem(
          'login',
          JSON.stringify({ userName, password, role, token: res.data.token, login: true }),
        );
      }
    } catch (error) {
      setUserName('');
      setPassword('');
      return setError(error.response.data.message);
    }
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
          <Form.Submit disabled={isInvalid} type="submit">
            Sign Up
          </Form.Submit>
        </Form.Base>
      </Form>
    </>
  );
}
