import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import storage from "./storage"
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={storage}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
