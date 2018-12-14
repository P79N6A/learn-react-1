/**
 * @file cardIds.js
 * @author lixiaoqin@baidu.com
 */

import keyMirror from 'keymirror';

export const actionTypes = keyMirror({
    SAVE_SEARCH_PAGES: null
});

export default (state = {}, action) => {
    const type = action.type;
    switch (type) {
        case actionTypes.SAVE_SEARCH_PAGES: {
            const pages = action.pages;
            return {...state, pages};
        }

        default:
            return state;
    }
};
