/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import 'style/antd/antd.css';
import './index.less';

const Search = Input.Search;
// const PATH_URL = process.env.REACT_APP_PATH_URL;
const PATH_URL = "http://yq01-kg-log0.yq01:8700/v1/search/query/";

class SearchBar extends Component {
    state = {
        query: ''
    }
    componentDidMount() {
        // 如果没有主搜索 就用返回的query
        let query = localStorage.getItem('searchQuery');
        console.log('query', query);

        if (!query) {
            // query = localStorage.getItem('backQuery');
            return '';
        }
        console.log('query', query);

        this.setState({
            query
        });
        // 对query 取括号前的部分处理
        const querySearch = query !== null ? query.split('（')[0].trim() : '';
        this.handleSearch(querySearch);
    }

    handleSearch = query => {
        localStorage.setItem('searchQuery', query);
        const pathName = localStorage.getItem('pathName') || 'disease';
        const path = PATH_URL + pathName;
        this.props.searchDisease({body: {query}, path});
        this.props.saveQuery(query);
    }

    handleChange = e => {
        this.setState({
            query: e.target.value
        });
    }
    render() {
        return (
            <div className="search-box">
                <Search
                    placeholder="疾病/药品/症状/体征"
                    enterButton="查询"
                    size="large"
                    value={this.state.query}
                    onChange={this.handleChange}
                    onSearch={this.handleSearch}
                />
            </div>
        );
    }
}

SearchBar.propTypes = {

};

SearchBar.defaultProps = {
};

export default SearchBar;
