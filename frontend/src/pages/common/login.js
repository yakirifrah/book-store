import React, { useState } from 'react';
import { Form } from '../../components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Login({ role, path }) {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || userName === '';

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/admin/api/v1/users/login', {
        userName,
        password,
        role,
      });
      sessionStorage.setItem(
				'login',
				JSON.stringify({
					token: res.data.token,
					user_id:res.data.user_id,
					login: true,
					role: role,
				}),
			);
      history.push('/admin/browse', 'admin');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
		<>
			<Form>
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
						New Admin? <Form.Link to={`${path}/signup`}>Sign up now.</Form.Link>
					</Form.Text>
					<Form.Submit disabled={isInvalid} type="submit">
						Sign In
					</Form.Submit>
				</Form.Base>
			</Form>
		</>
	);
}
