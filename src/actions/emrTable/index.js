/**
 * @file test request
 * @author lixiaoqin@baidu.com
 */

import {HTTP_REQUEST} from 'common/requestApi';
const EMR_REQUEST = 'EMR_REQUEST';
const EMR_SUCCESS = 'EMR_SUCCESS';
const EMR_FAILURE = 'EMR_FAILURE';

/**
 * Create the "searchDisease" action.
 * @param {Object}  queryObj 对象
 * @return {Object} 返回一个 action
 */
export const sendEmrDetail = queryObj => ({
    [HTTP_REQUEST]: {
        path: queryObj.path,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(queryObj.body), // this will be sent as a json
        // body: queryObj.body, // this will be sent as a json
        handlers: {
            request: result => ({
                type: EMR_REQUEST,
                payload: result
            }),
            success: result => ({ // the actions that will be dispatched on success response
                type: EMR_SUCCESS,
                payload: result
            }),
            failure: error => ({ // the action that will be dispatched if request failures
                type: EMR_FAILURE,
                message: `Error: ${error.message}`
            })
        },
        requestContent: 'requesting',
        successContent: 'success',
        failureContent: 'failure'
    }
});