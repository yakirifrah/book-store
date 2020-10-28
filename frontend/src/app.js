import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import { Browse, NotFound, Login, Signup } from './pages/common';
import * as ROUTES from './constants/routes';
import { Admin } from './pages/adminArea';
import { MyCart, PurchaseHistory } from './pages/userArea';
import { IsUserRedirect } from './helpers/routes';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.ADMIN} component={Admin} />
        <Route exact path={ROUTES.HOME} component={Browse} />
        <Route exact path={ROUTES.MY_CART} component={MyCart} />
        <Route exact path={ROUTES.MY_ORDER_HISTORY} component={PurchaseHistory} />
        <IsUserRedirect exact path={ROUTES.LOGIN} component={Login} />
        <IsUserRedirect exact path={ROUTES.SIGNUP} component={Signup} />

        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
