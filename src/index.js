// Current content of src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; //
import App from './App'; //
import { LanguageProvider } from './context/LanguageContext'; // <-- ADD THIS LINE

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // UPDATE THESE LINES
  <LanguageProvider>
    <App />
  </LanguageProvider>
);