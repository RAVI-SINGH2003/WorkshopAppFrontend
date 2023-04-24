import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export const server_url = "https://workshopappbackend.onrender.com/api/v1";
// export const server_url = "http://localhost:5000/api/v1";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

