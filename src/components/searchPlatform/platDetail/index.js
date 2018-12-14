/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import DetailArticle from '../detailArticle';
import DetailEmrArticle from '../detailEmrArticle';
import get from 'lodash/get';

import 'style/antd/antd.css';
import './index.less';

import icon_arrow_back from '../img/icon_arrow_back.png';
import icon_arrow_right from '../img/icon_arrow_right.png';

const Search = Input.Search;
const getSourceName = path => {
    let sourceName = '';
    switch (path) {
        case 'emr':
            sourceName = '病历库';
            break;
        case 'drug':
            sourceName = '药品库';
            break;
        case 'disease':
            sourceName = '疾病库';
            break;
        default:
            break;
    }
    return sourceName;
};
class PlatDetail extends Component {
    componentDidMount() {
    }

    handleBack(path) {
        localStorage.setItem('activeKey', path);
        browserHistory.push('search');
    }

    render() {
        const pathName = localStorage.getItem('pathName');
        const title = localStorage.getItem('title') || '';
        const id = localStorage.getItem('id') || '';
        return (
            <div>
                <div className="crumbs-nav">
                    <img src={icon_arrow_back} className="crumbs-back"
                        onClick={this.handleBack.bind(this, pathName)} />
                    <span onClick={this.handleBack.bind(this, pathName)} className="detail-cate">
                        {
                            getSourceName(pathName)
                        }
                    </span>
                    <img src={icon_arrow_right} className="crumbs-right"></img>
                    <span className="detail-info">
                        {
                            `${pathName === 'emr' ? id : title}`
                        }
                    </span>
                </div>
                {
                    pathName === 'emr'
                        ? <DetailEmrArticle {...this.props}></DetailEmrArticle>
                        : <DetailArticle {...this.props}></DetailArticle>
                }
            </div>
        );
    }
}

PlatDetail.propTypes = {

};

PlatDetail.defaultProps = {
};

export default PlatDetail;
