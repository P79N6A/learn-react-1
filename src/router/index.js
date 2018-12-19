import React from 'react';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';

import App from '../containers/app';

const SearchPlatform = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/searchPlatform/platMain').default);
    }, 'SearchPlatform');
};

const SearchPlatformDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/searchPlatform/platDetail').default);
    }, 'SearchPlatformDetail');
};

const Disclaimer = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../components/disclaimer').default);
    }, 'Disclaimer');
};

export default browserHistory => (
    <Router history={browserHistory}>
        <Route path="/" component={App}></Route>
        <Route path="/search" getComponents={SearchPlatform}></Route>
        <Route path="/detail" getComponents={SearchPlatformDetail}></Route>
        <Route path="/disclaimer" getComponents={Disclaimer}></Route>
    </Router>
);

