/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, browserHistory} from 'react-router';
import {Icon} from 'antd';
import DetailIcon from '../detailIcon';
import './index.less';

// const PATH_DETAIL_URL = process.env.REACT_APP_DETAIL_PATH_URL;
// const PATH_URL = process.env.REACT_APP_PATH_URL;
const PATH_URL = "http://yq01-kg-log0.yq01:8700/v1/search/query/";

const getRate = rate => {
    if (rate < 50) {
        return '';
    }
    if (rate >= 50 && rate < 85) {
        console.log('3格');
        return <span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-box"></span>
            <span className="rate-box"></span>
        </span>;

    } else if (rate >= 85 && rate < 95) {
        // console.log('4');
        return <span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-box"></span>
        </span>;
    } else {
        console.log('5');
        return <span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-tip rate-box"></span>
            <span className="rate-tip rate-box"></span>
        </span>;
    }

};
class HeaderBar extends Component {
    componentDidMount() {
        this.init();
    }
    init = () => {
        localStorage.setItem('activeKey', '');
    }
    sendSearchRequest = (source, name) => {
        const pathName = 'emr';
        const path = PATH_URL + pathName;
        const query = name || '';
        this.props.searchDisease({
            path,
            body: {
                query,
                params: {'emr': source}
            }
        });
    }
    setActiveKey = (source, name, e) => {
        // e.preventDefault();
        localStorage.setItem('pathName', 'emr');
        localStorage.setItem('activeKey', 'emr');
        localStorage.setItem('backQuery', name);

        this.props.switchKey('emr');
        if (!Object.keys(source).length) {
            return;
        }
        this.sendSearchRequest(source, name);
        browserHistory.push('search');
    }
    render() {
        const {name, kgid, rate} = this.props;
        const source = JSON.parse(localStorage.getItem('changeFieldsValue'));
        const switchRate = Number(rate) * 100;

        return (
            <div className="clinic-header-bar">
                <div className="clinic-line"></div>
                <span className="clinic-name">
                    {name || ''}
                    {
                        kgid ? <DetailIcon {...this.props} from="disease"></DetailIcon> : ''
                    }
                </span>

                <b>{getRate(switchRate)}</b>
                <Link to="/search" onClick={this.setActiveKey.bind(this, source, name)}>相似病历</Link>
            </div>
        );
    }
}

HeaderBar.propTypes = {

};

HeaderBar.defaultProps = {
};

export default HeaderBar;
