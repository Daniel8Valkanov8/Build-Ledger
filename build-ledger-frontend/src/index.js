import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  // Увери се, че е импортирано
import App from './App';  // Твоето главно приложение
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
