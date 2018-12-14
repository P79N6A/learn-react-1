/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PlatDetail from 'components/searchPlatform/platDetail';
import get from 'lodash/get';
import {searchDetail} from 'actions/searchPlatform/detailRequest';

const mapStateToProps = state => {
    const detail = get(state, 'detailArticle.detail', null);
    return {
        detail
    };
};

const mapDispatchToProps = {searchDetail};

const ConnectedPlatDetail = connect(mapStateToProps, mapDispatchToProps)(PlatDetail);

ConnectedPlatDetail.propTypes = {

};

ConnectedPlatDetail.defaultProps = {
};

export default ConnectedPlatDetail;
