/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PlatMain from 'components/searchPlatform/platMain';
import get from 'lodash/get';
import {searchDisease, switchKey, saveQuery, savePages} from 'actions/searchPlatform/searchRequest';
import {searchDetail} from 'actions/searchPlatform/detailRequest';

const mapStateToProps = state => {
    const disease = get(state, 'searchDisease.disease', null);
    const pathName = get(state, 'searchDisease.name.pathName', null);
    const queryName = get(state, 'searchDisease.name.queryName', null);
    const pages = get(state, 'searchDisease.pages.pages', null);
    return {
        disease,
        pathName,
        queryName,
        pages
    };
};

const mapDispatchToProps = {searchDisease, switchKey, saveQuery, savePages, searchDetail};

const ConnectedPlatMain = connect(mapStateToProps, mapDispatchToProps)(PlatMain);

ConnectedPlatMain.propTypes = {

};

ConnectedPlatMain.defaultProps = {
};

export default ConnectedPlatMain;
