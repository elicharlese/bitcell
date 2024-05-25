// index.js or index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './store';
import client from './apolloClient';
import App from './App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);