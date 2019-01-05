import fetch from 'cross-fetch';
export const HTTP_REQUEST = Symbol('HTTP_REQUEST');
export const HTTP_RESPONSE = Symbol('HTTP_RESPONSE');


/**
 * request
 * @param {Object} options 选项
 * @param {Object} payload payload 对象
 * @param {string} payload.path  路径类似 url
 * @param {string} [payload.method]  方法
 * @param {Object<String, *>} [payload.body]  请求的参数
 * @return {Promise} fetch Promise object
 */
const request = (options, payload) => {
    const fetch = require('cross-fetch');
    const {
        defaultHeaders = undefined
    } = options;

    const {
        path,
        method = 'get',
        headers = undefined,
        body = undefined
    } = payload;

    return fetch(path, {
        method,
        body,
        headers: headers
    }).then(res => res.json());
};

/**
 *
 * Http request middleware factory.
 *
 * @param {Object} [options] – http request middleware options
 * @param {Object} [options.defaultHeaders] – default headers
 * @return {Function} dispatch action
 */
export function httpRequestMiddleware(options) {
    options || (options = {});

    return store => next => action => {
        const httpRequestPayload = action[HTTP_REQUEST];
        if (typeof httpRequestPayload === 'undefined') {
            return next(action);
        }
        const {handlers = {}, requestContent = '', successContent = '', failureContent = ''} = httpRequestPayload;
        if (handlers.request) {
            next(handlers.request(requestContent));
        }
        return request(options, httpRequestPayload)
            .then(res => {
                if (res.code === 0 && handlers.success) {
                    res = {...res, loadStatus: successContent};
                    next(handlers.success(res));
                } else if (res.code !== 0 && handlers.failure) {
                    // res = {...res, loadStatus: failureContent};
                    next(handlers.failure(failureContent));
                }
            }, err => {
                if (handlers.failure) {
                    // err = {err, loadStatus: failureContent};
                    next(handlers.failure(failureContent));
                }
            }).catch(err => {
                // err = {err, loadStatus: failureContent};
                if (handlers.failure) {
                    next(handlers.failure(failureContent));
                }
                throw new Error('request err message:' + err);
            });
    };
}
