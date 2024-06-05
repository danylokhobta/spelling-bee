import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './App';
import { HashRouter } from "react-router-dom";
import { AnimationProvider } from './contexts/AnimationContext';
import store from './state/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <AnimationProvider>
          <App />
        </AnimationProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
