import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GetDrivers from './GetDrivers'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<GetDrivers />, document.getElementById("getDrivers"));

registerServiceWorker();
