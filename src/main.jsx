import React from 'react';
import ReactDOM from 'react-dom/client';
import Framework7 from 'framework7/lite-bundle';
import Framework7React from 'framework7-react';
import CriolloMochilas from './App'

Framework7.use(Framework7React);

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <CriolloMochilas />
  </React.StrictMode>
)
