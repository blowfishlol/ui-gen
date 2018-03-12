import { applyMiddleware, createStore } from 'redux';
import promise from "redux-promise-middleware";
import thunk from "redux-thunk"
import { createLogger } from "redux-logger";

import reducer from "./reducer";
const middleware = applyMiddleware(  promise(),  thunk,  createLogger() );
export default createStore(reducer, middleware);
