import React from 'react';
import { AdminContainer } from '../../containers';
import { signOutUser } from '../../utils';

export default function admin({ match }) {
  signOutUser();
  return <AdminContainer match={match} />;
}
