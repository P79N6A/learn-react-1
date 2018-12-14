

import ReactDOM from 'react-dom';
import React from 'react';
import configureStore from 'common/configureStore';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from './router';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <div>
            {routes(history)}
        </div>
    </Provider>,
    document.getElementById('root')
);