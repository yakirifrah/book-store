import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AuthContextProvider } from './store/contexts';
import 'normalize.css';
import 'antd/dist/antd.css';
import './index.css';
import { enableLogging } from 'mobx-logger';
import { GlobalStyles } from './global-styles';

if (process.env.NODE_ENV === 'developer') {
  const config = {
    predicate: () => true,
    action: true,
    reaction: true,
    transaction: true,
    compute: true,
  };
  enableLogging(config);
}

ReactDOM.render(
  <>
    <GlobalStyles />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </>,
  document.getElementById('root'),
);
