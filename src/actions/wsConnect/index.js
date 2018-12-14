/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import get from 'lodash/get';
// import wsApi from 'common/wsConnect';
import {actionTypes as wsActionTypes} from 'reducers/wsInfoMap';

export const websocketConnect = url => (dispatch, getState) => {
    dispatch({
        type: wsActionTypes.CDSS_DU_NURSE_REQUEST,
        payload: 'requesting'
    });
    const ws = new WebSocket(url);
    ws.onmessage = event => {
        const data = event.data;
        dispatch({
            type: wsActionTypes.CDSS_DU_NURSE_SUCCESS,
            payload: data
        });
    };
    ws.onerror = event => {
        dispatch({
            type: wsActionTypes.CDSS_DU_NURSE_FAILURE,
            payload: 'error'
        });
        // throw new Error('WebSocket error observed:', event);
        console.log(event);
        // throw new Error('WebSocket error observed:', event);
    };
    ws.onclose = event => {
        dispatch({
            type: wsActionTypes.CDSS_DU_NURSE_CLOSE,
            payload: 'WebSocket is closed now'
        });
        console.log("WebSocket is closed now.");
    };
};
