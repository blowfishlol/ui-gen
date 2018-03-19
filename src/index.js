import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import '@progress/kendo-theme-bootstrap/dist/all.css';
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"

import storage from "./storage"
import ActionList from "./reducer/actionList"
import PageNavigator from './PageNavigator';
import page from "./example2";
import registerServiceWorker from './registerServiceWorker';

storage.dispatch({type:ActionList.SET_PAGE, payload: page});
storage.dispatch({type:ActionList.PUSH_STACK, payload: {"index": 0}});
ReactDOM.render(<Provider store={storage}>
    <div className="container-fluid">
      <PageNavigator page={storage.getState().page} />
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
