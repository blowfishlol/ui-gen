import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import registerServiceWorker from './registerServiceWorker';
import storage from "./storage"
import './index.css';
import App from './App';
import config from "./example";

ReactDOM.render(<Provider store={storage}>
    <div>
      <App config={config} />
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
