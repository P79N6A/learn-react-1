import React from 'react';
import {Router, Route} from 'react-router';

import App from '../containers/app';

export default browserHistory => (
    <Router history={browserHistory}>
        <Route path="/" component={App}></Route>
    </Router>
);
