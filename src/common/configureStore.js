/**
 * @file configureStore.js
 * @author lixiaoqin@baidu.com
 */

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {httpRequestMiddleware} from './requestApi';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const httpRequestOptions = { // optional configuration
    defaultHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

// const finalCreateStore = composeEnhancers(applyMiddleware(thunk,
//     httpRequestMiddleware(httpRequestOptions)))(createStore);

const finalCreateStore = applyMiddleware(thunk,
    httpRequestMiddleware(httpRequestOptions))(createStore);

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});
export default initialState => {
    const store = finalCreateStore(reducer, initialState);
    return store;
};
