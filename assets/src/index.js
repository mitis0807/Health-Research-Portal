import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import NextApp from './NextApp';
import registerServiceWorker from './registerServiceWorker';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Add this import:
//console.warn = console.log = console.error = () => { };
// Wrap the rendering in a function:
console.log('document.title');

console.log(document.title);

ReactDOM.render(
  <GoogleOAuthProvider 
  clientId="234058942313-h7c95pa5ohvt1gb54vjbjdr0jn81hsur.apps.googleusercontent.com">
    <NextApp />
  </GoogleOAuthProvider>,
  document.getElementById('root'),
);


// Do this once
registerServiceWorker();

// Render once
// render(NextApp);

// Webpack Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./NextApp', () => {
//     render(NextApp);
//   });
// }
