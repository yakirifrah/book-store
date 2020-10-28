import React from 'react';
import { LockBody, ReleaseBody, Spinner } from './styles/loading';

export default function Loading({ ...restProps }) {
  return (
    <Spinner {...restProps}>
      <LockBody />
    </Spinner>
  );
}

Loading.ReleaseBody = function LoadingReleaseBody() {
  return <ReleaseBody />;
};
