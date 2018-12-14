/**
 * @file cardIds.js
 * @author lixiaoqin@baidu.com
 */

import keyMirror from 'keymirror';

export const actionTypes = keyMirror({
    SWITCH_PATH_NAME: null,
    SAVE_QUERY_NAME: null
});

export default (state = {}, action) => {
    const type = action.type;
    switch (type) {
        case actionTypes.SWITCH_PATH_NAME: {
            const pathName = action.pathName;
            return {...state, pathName};
        }
        case actionTypes.SAVE_QUERY_NAME: {
            const queryName = action.queryName;
            return {...state, queryName};
        }
        default:
            return state;
    }
};
