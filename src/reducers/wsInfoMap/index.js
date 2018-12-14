/**
 * @file cardIds.js
 * @author lixiaoqin@baidu.com
 */

import keyMirror from 'keymirror';
import isEmpty from 'lodash/isEmpty';

export const actionTypes = keyMirror({
    CDSS_DU_NURSE_REQUEST: null,
    CDSS_DU_NURSE_SUCCESS: null,
    CDSS_DU_NURSE_FAILURE: null,
    CDSS_DU_NURSE_CLOSE: null
});

export default (state = {}, action) => {
    const type = action.type;
    const wsResult = action.payload;
    switch (type) {
        case actionTypes.CDSS_DU_NURSE_REQUEST: {
            const loadStatus = wsResult;
            return {...state, loadStatus};
        }
        case actionTypes.CDSS_DU_NURSE_SUCCESS: {
            const loadStatus = 'success';
            return {...state, wsResult, loadStatus};
        }
        case actionTypes.CDSS_DU_NURSE_FAILURE: {
            const loadStatus = wsResult;
            return {...state, loadStatus};
        }
        case actionTypes.CDSS_DU_NURSE_CLOSE: {
            const loadStatus = wsResult;
            return {...state, loadStatus};
        }
        default:
            return state;
    }
};
