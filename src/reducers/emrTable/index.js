/**
 * @file emrTable.js
 * @author lixiaoqin@baidu.com
 */
import keyMirror from 'keymirror';
import isEmpty from 'lodash/isEmpty';

export const actionTypes = keyMirror({
    EMR_REQUEST: null,
    EMR_SUCCESS: null,
    EMR_FAILURE: null
});

export default (state = {}, action) => {
    const type = action.type;
    const result = action.payload;
    switch (type) {
        case actionTypes.EMR_REQUEST: {
            const loadStatus = result;
            return {...state, loadStatus};
        }
        case actionTypes.EMR_SUCCESS: {
            const loadStatus = 'success';
            return {...state, result, loadStatus};
        }
        case actionTypes.EMR_FAILURE: {
            const loadStatus = result;
            return {...state, loadStatus};
        }
        default:
            return state;
    }
};
