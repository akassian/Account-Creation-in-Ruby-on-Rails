import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { Router } from '../router.tsx';
import '../tailwind.css';
import store from '../store.ts';

// TODO: separate providers into their own file
ReactDOM.createRoot(document.getElementById('vite-app')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>
);
