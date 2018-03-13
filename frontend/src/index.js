import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import "../node_modules/firebaseui/dist/firebaseui.css";

import App from './app/index'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
