import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import { Browse, NotFound } from './pages/common';
import * as ROUTES from './constants/routes';
import { Admin } from './pages/adminArea';
import { MyCart } from './pages/userArea';
function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path={ROUTES.ADMIN} component={Admin} />
				<Route exact path={ROUTES.HOME} component={Browse} />
				<Route exact path={ROUTES.MY_CART} component={MyCart} />
				<Route path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
