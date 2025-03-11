import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './App';
import { HashRouter } from "react-router-dom";
import store from './state/store';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as ChakraProvider } from "./components/ui/provider"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
        <ChakraProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>
);
