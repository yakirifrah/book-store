import React from 'react';
import { AdminContainer } from '../../containers';
import { signOutUser } from '../../utils';

export default function admin({ match }) {
  console.log('admin');
  signOutUser();
  return <AdminContainer match={match} />;
}
