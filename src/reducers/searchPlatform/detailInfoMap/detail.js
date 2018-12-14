/**
 * @file detail.js
 * @author lixiaoqin@baidu.com
 */

import keyMirror from 'keymirror';

export const actionTypes = keyMirror({
    SEARCH_DETAIL_REQUEST: null,
    SEARCH_DETAIL_SUCCESS: null,
    SEARCH_DETAIL_FAILURE: null
});

export default (state = {}, action) => {
    const type = action.type;
    const result = action.payload;
    switch (type) {
        case actionTypes.SEARCH_DETAIL_REQUEST: {
            return {...state, result};
        }
        case actionTypes.SEARCH_DETAIL_SUCCESS: {
            return {...state, ...result};
        }
        case actionTypes.SEARCH_DETAIL_FAILURE: {
            return {...state, result};
        }
        default:
            return state;
    }
};
