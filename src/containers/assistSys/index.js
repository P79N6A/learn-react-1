/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AssistSys from 'components/assistSys';
import get from 'lodash/get';
import {websocketConnect} from 'actions/wsConnect';
import {searchDetail} from 'actions/searchPlatform/detailRequest';
import {searchDisease, switchKey, saveQuery} from 'actions/searchPlatform/searchRequest';
import {sendEmrDetail} from 'actions/emrTable';

const mapStateToProps = state => {
    // const wsDatas = get(state, 'ws.wsResult', '{}');
    // const parseWsData = JSON.parse(wsDatas);
    // const {advice = null, alert = null, source = {}} = parseWsData;
    // const loadStatus = get(state, 'ws.loadStatus', '');

    const assistData = get(state, 'emr.result', '{}');
    const {advice = [], alert = {}, source = {}} = assistData;
    const loadStatus = get(state, 'emr.loadStatus', '');
    const pathName = get(state, 'searchDisease.name.pathName', '');
    console.log(loadStatus);
    return {
        advice,
        alert,
        source,
        loadStatus,
        pathName
    };
};

const mapDispatchToProps = {websocketConnect, searchDetail, searchDisease, switchKey, saveQuery, sendEmrDetail};

const ConnectedAssistSys = connect(mapStateToProps, mapDispatchToProps)(AssistSys);

ConnectedAssistSys.propTypes = {

};

ConnectedAssistSys.defaultProps = {
};

export default ConnectedAssistSys;
