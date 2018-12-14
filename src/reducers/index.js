/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import {combineReducers} from 'redux';
import ws from './wsInfoMap';
import emr from './emrTable';
import searchDisease from './searchPlatform/searchInfoMap';
import detailArticle from './searchPlatform/detailInfoMap';
export default {
    emr,
    ws,
    searchDisease,
    detailArticle
};