/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, browserHistory} from 'react-router';
import {Icon} from 'antd';
import './index.less';

// const PATH_URL = process.env.REACT_APP_DETAIL_PATH_URL;
const PATH_URL = 'http://yq01-kg-log0.yq01:8700/v1/search/id/';
class DetailIcon extends Component {
    sendSearchRequest = source => {
        const pathName = 'emr';
        const path = PATH_URL + pathName;
        const query = '';
        this.props.searchDisease({
            path,
            body: {
                query,
                source
            }
        });
    }
    gotoDetail = (kgid, title, name, from, e) => {
        try {
            // 放大窗口
            // window.jsObj.enlargeWindow();
            // window.jsObj.showDetailWindow('/detail');
            e.stopPropagation();
            localStorage.setItem('title', title || name);
            localStorage.setItem('id', kgid);
            localStorage.setItem('pathName', from);
            localStorage.setItem('query', title || name);

            const path = PATH_URL + from;
            const detailObj = {
                path,
                body: {
                    id: [kgid]
                }
            };
            this.props.searchDetail(detailObj);
            browserHistory.push('detail');
        } catch (error) {
            console.log(error);
        }

    }
    render() {
        const {source, kgid, title, name, from} = this.props;
        return (
            <span className="icon-search">
                <Icon type="search" theme="outlined" onClick={this.gotoDetail.bind(this, kgid, title, name, from)} />
            </span>
        );
    }
}
DetailIcon.propTypes = {

};

DetailIcon.defaultProps = {
};

export default DetailIcon;
