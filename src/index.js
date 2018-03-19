import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"

import '@progress/kendo-theme-material/dist/all.css';
import "./index.css"

import storage from "./storage"
import ActionList from "./reducer/actionList"
import PageNavigator from './PageNavigator';
import page from "./example2";
import registerServiceWorker from './registerServiceWorker';

<<<<<<< HEAD
//import evaluator from "./util/evaluator2"

=======
>>>>>>> 8524265cfde776b95d12d7ec566b0601be2ed3c0
storage.dispatch({type:ActionList.SET_PAGE, payload: page});
storage.dispatch({type:ActionList.PUSH_STACK, payload: {"index": 0}});
ReactDOM.render(<Provider store={storage}>
    <div className="k-form">
      <PageNavigator page={storage.getState().page} />
    </div>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
