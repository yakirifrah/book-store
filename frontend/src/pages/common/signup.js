import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '../../components';
import axios from 'axios';
import * as ROUTES from '../../constants/routes';

export default function SignUp() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = userName === '' || password === '';

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
    await axios.post('http://localhost:3001/admin/api/v1/users/signup', {
        userName,
        password,
        role: 'admin',
      });
    } catch (error) {
      setError(error.message);
    }
    await history.push(ROUTES.HOME);
  };

  return (
    <>
      <Form>
        <Form.Title>Sign Up</Form.Title>
        {error && <Form.Error>{error}</Form.Error>}

        <Form.Base onSubmit={handleSignup} method="POST">
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
