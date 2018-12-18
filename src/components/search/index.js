/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import {browserHistory, Link} from 'react-router';
import 'style/antd/antd.css';
import './index.less';
const Search = Input.Search;
// const PATH_URL = process.env.REACT_APP_PATH_URL;
const PATH_URL = "http://yq01-kg-log0.yq01:8700/v1/search/query/";

class SearchBar extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.init();
    }
    init = () => {
    }

    handleSearch = query => {
        if (!query) {
            this.elem.style.display = 'block';
            return;
        }
        localStorage.setItem('pathName', 'disease');
        // 保存query
        localStorage.setItem('query', query);
        // localStorage.setItem('title', query);
        browserHistory.push('search');
        const pathName = 'disease';
        const path = PATH_URL + pathName;
        this.props.searchDisease({body: {query}, path});
        this.props.saveQuery(query);
    }

    render() {
        return (
            <div className="search-box">
                <Search
                    placeholder="疾病/药品/症状/体征"
                    enterButton="查询"
                    size="large"
                    onSearch={this.handleSearch}
                />
                <div className="search-tip" ref={(elem) => this.elem = elem} >请输入查询关键词！</div>
            </div>
        );
    }
}

SearchBar.propTypes = {

};

SearchBar.defaultProps = {
};

export default SearchBar;
