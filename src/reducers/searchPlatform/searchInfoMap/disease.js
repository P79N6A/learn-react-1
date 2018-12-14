/**
 * @file cardIds.js
 * @author lixiaoqin@baidu.com
 */

import keyMirror from 'keymirror';
// import isEmpty from 'lodash/isEmpty';

export const actionTypes = keyMirror({
    SEARCH_DISEASE_REQUEST: null,
    SEARCH_DISEASE_SUCCESS: null,
    SEARCH_DISEASE_FAILURE: null
});

export default (state = {}, action) => {
    const type = action.type;
    const result = action.payload;

    switch (type) {
        case actionTypes.SEARCH_DISEASE_REQUEST: {
            return {...state, result};
        }
        case actionTypes.SEARCH_DISEASE_SUCCESS: {
            return {...state, ...result};
        }
        case actionTypes.SEARCH_DISEASE_FAILURE: {
            return {...state, result};
        }
        default:
            return state;
    }
};
