import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import '@progress/kendo-theme-material/dist/all.css';

import registerServiceWorker from './registerServiceWorker';
import storage from "./storage"
import './index.css';
import App from './ui-component/App';
import config from "./example";

console.log(config);

ReactDOM.render(<Provider store={storage}>
    <div className="row">
      <App config={config} />
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
