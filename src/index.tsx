// Importing core dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing the global stylesheet
import './index.css';

// Importing the main application component
import App from './App';

// Importing performance reporting function (optional)
import reportWebVitals from './reportWebVitals';

// Locating the root DOM element where the app will be mounted
const appRoot = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Rendering the application within React's StrictMode to catch potential issues
appRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Call the performance reporting function
// You can customize or send results to an analytics endpoint
reportWebVitals();
