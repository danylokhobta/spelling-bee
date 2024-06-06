import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './App';
import { HashRouter } from "react-router-dom";
import { AnimationProvider } from './contexts/AnimationContext';
import store from './state/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
        <HashRouter>
          <AnimationProvider>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </AnimationProvider>
        </HashRouter>
    </ReduxProvider>
  </React.StrictMode>
);
