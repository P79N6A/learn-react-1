/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DrugDetail from 'components/drugDetail';
import get from 'lodash/get';
import {sendEmrDetail} from 'actions/emrTable';
import {searchDetail} from 'actions/searchPlatform/detailRequest';

const mapStateToProps = state => {
    const assistData = get(state, 'emr.result', '{}');

    const {advice = [], alert = {}, source = {}} = assistData;
    const loadStatus = get(state, 'emr.loadStatus', '');
    const pathName = get(state, 'searchDisease.name.pathName', '');
    return {
        advice,
        alert,
        source,
        loadStatus,
        pathName
    };
};

const mapDispatchToProps = {sendEmrDetail, searchDetail};

const ConnectedDrugDetail = connect(mapStateToProps, mapDispatchToProps)(DrugDetail);

ConnectedDrugDetail.propTypes = {

};

ConnectedDrugDetail.defaultProps = {
};

export default ConnectedDrugDetail;
