import React from 'react'; import ReactDOM from 'react-dom/client'; import { Auth0Provider } from '@auth0/auth0-react'; import App from './App'; import './index.css'; 

const AUTH0_DOMAIN = 'sloth-auth.us.auth0.com';
const AUTH0_CLIENT_ID = 'MzKoAZf18rONhnjBrqlRJxCKF2vqmojq';

const redirectUri = window.location.origin;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: 'https://sloth-auth.us.auth0.com/api/v2/',
        scope: 'read:current_user update:current_user_metadata'
      }}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
