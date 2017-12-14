import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from '../_reducers/index'
import {updateUserMiddleware} from './firebaseDB'
const logger = createLogger();

const authMiddleware = updateUserMiddleware;

const middleware = applyMiddleware(promise(), thunk, logger);

export default createStore(reducer, middleware);
