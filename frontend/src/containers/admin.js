import { Switch, Route } from 'react-router-dom';
import { Browse, Login, Signup, NotFound } from '../pages/common';
import { AddBook } from '../pages/adminArea';
import { PrivateAdminRoute, IsAdminRedirect } from '../helpers/routes';

export default function AdminContainer({ match }) {
  return (
    <Switch>
      <IsAdminRedirect
        exact
        path={`${match.path}`}
        component={() => <Login role="admin" path={match.path} />}
      />
      <IsAdminRedirect exact path={`${match.path}/signup`} component={Signup} role="admin" />
      <PrivateAdminRoute exact path={`${match.path}/browse`} component={Browse} role="admin" />
      <PrivateAdminRoute exact path={`${match.path}/add-book`} component={AddBook} role="admin" />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
