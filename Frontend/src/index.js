import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Context from './context/Context';
import { AuthProvider } from './context/auth';
import ReactGA from 'react-ga';

// Initialize Google Analytics with your tracking ID
ReactGA.initialize('G-NYNR53YLS6');

// Track initial page view
ReactGA.pageview(window.location.pathname + window.location.search);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Context>
  </React.StrictMode>
);

