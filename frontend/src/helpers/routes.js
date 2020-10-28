import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authAdminListener, authUserListener } from '../utils';

export function PrivateAdminRoute({ ...restProps }) {
	const isAdmin = authAdminListener();
	return isAdmin ? <Route {...restProps} /> : <Redirect to="/admin" />;
}

export function IsAdminRedirect({ ...restProps }) {
	const isAdmin = authAdminListener();
	return isAdmin ? <Redirect to="/admin/browse" /> : <Route {...restProps} />;
}

export function IsUserRedirect({ ...restProps }) {
	const isUser = authUserListener();
	return isUser ? <Redirect to="/" /> : <Route {...restProps} />;
}
