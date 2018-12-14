/**
 * @file test request
 * @author lixiaoqin@baidu.com
 */

import {HTTP_REQUEST} from 'common/requestApi';
const SEARCH_DETAIL_REQUEST = 'SEARCH_DETAIL_REQUEST';
const SEARCH_DETAIL_SUCCESS = 'SEARCH_DETAIL_SUCCESS';
const SEARCH_DETAIL_FAILURE = 'SEARCH_DETAIL_FAILURE';

/**
 * Create the "searchDisease" action.
 * @param {Object}  queryObj 对象
 * @return {Object} 返回一个 action
 */
export const searchDetail = queryObj => ({
    [HTTP_REQUEST]: {
        path: queryObj.path,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: JSON.stringify(queryObj.body), // this will be sent as a json
        handlers: {
            request: result => ({
                type: SEARCH_DETAIL_REQUEST,
                payload: result
            }),
            success: result => ({ // the actions that will be dispatched on success response
                type: SEARCH_DETAIL_SUCCESS,
                payload: result
            }),
            failure: error => ({ // the action that will be dispatched if request failures
                type: SEARCH_DETAIL_FAILURE,
                message: `Error: ${error.message}`
            })
        },
        requestContent: 'requesting',
        successContent: 'success',
        failureContent: 'failure'
    }
});