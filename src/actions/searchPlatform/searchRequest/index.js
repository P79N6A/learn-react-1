/**
 * @file test request
 * @author lixiaoqin@baidu.com
 */

import {HTTP_REQUEST} from 'common/requestApi';
const SEARCH_DISEASE_REQUEST = 'SEARCH_DISEASE_REQUEST';
const SEARCH_DISEASE_SUCCESS = 'SEARCH_DISEASE_SUCCESS';
const SEARCH_DISEASE_FAILURE = 'SEARCH_DISEASE_FAILURE';
const SWITCH_PATH_NAME = 'SWITCH_PATH_NAME';
const SAVE_QUERY_NAME = 'SAVE_QUERY_NAME';
const SAVE_SEARCH_PAGES = 'SAVE_SEARCH_PAGES';

export const savePages = pageObj => ({
    type: SAVE_SEARCH_PAGES,
    pages: pageObj
});
export const switchKey = path => ({
    type: SWITCH_PATH_NAME,
    pathName: path
});
export const saveQuery = query => ({
    type: SAVE_QUERY_NAME,
    queryName: query
});

/**
 * Create the "searchDisease" action.
 * @param {Object} queryObj 对象
 * @return {Object} 返回一个 action
 */
export const searchDisease = queryObj => ({
    [HTTP_REQUEST]: { // here we go!
        path: queryObj.path,
        method: 'post', // or simply 'post'
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: JSON.stringify(queryObj.body), // this will be sent as a json
        handlers: {
            request: result => ({
                type: SEARCH_DISEASE_REQUEST,
                payload: result
            }),
            success: result => ({ // the actions that will be dispatched on success response
                type: SEARCH_DISEASE_SUCCESS,
                payload: result
            }),
            failure: error => ({ // the action that will be dispatched if request failures
                type: SEARCH_DISEASE_FAILURE,
                payload: error
            })
        },
        requestContent: 'requesting',
        successContent: 'success',
        failureContent: 'failure'
    }
});