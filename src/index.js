import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import registerServiceWorker from './registerServiceWorker';
import storage from "./storage"
import './index.css';
import App from './ui-component/App';
import config from "./example";

console.log(config);

ReactDOM.render(<Provider store={storage}>
    <div>
      <App config={config} />
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
