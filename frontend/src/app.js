import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Browse, NotFound, Login, Signup } from './pages/common';
import { Admin } from './pages/adminArea';
import { MyCart, PurchaseHistory } from './pages/userArea';
import { IsUserRedirect } from './helpers/routes';
import * as ROUTES from './constants/routes';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.ADMIN} component={Admin} />
        <Route exact path={ROUTES.HOME} component={Browse} />
        <Route exact path={ROUTES.MY_CART} component={MyCart} />
        <Route exact path={ROUTES.MY_ORDER_HISTORY} component={PurchaseHistory} />
        <IsUserRedirect exact path={ROUTES.LOGIN} component={Login} />
        <IsUserRedirect exact path={ROUTES.SIGNUP} component={Signup} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
