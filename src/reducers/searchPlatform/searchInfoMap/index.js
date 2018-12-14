/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import {combineReducers} from 'redux';
import disease, {actionTypes as diseaseActionTypes} from './disease';
// import drug, {actionTypes as drugActionTypes} from './drug';
// import emr, {actionTypes as emrActionTypes} from './emr';
import name from './name';
import pages from './pages';

// export const actionTypes = {
//     ...diseaseActionTypes,
//     ...drugActionTypes,
//     ...emrActionTypes
// };

export default combineReducers({
    disease,
    name,
    pages
});
