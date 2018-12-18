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
        // const query = localStorage.getItem('title');
        const query = localStorage.getItem('query');

        this.setState({
            query
        });
        // 对query 取括号前的部分处理
        const querySearch = query.split('（')[0].trim();
        this.handleSearch(querySearch);
        localStorage.setItem('searchQuery', query);
    }

    handleSearch = query => {
        localStorage.setItem('query', query);
        // localStorage.setItem('searchQuery', query);
        if (!query) {
            // throw Error('query 不能为空');
            this.elem.style.display = 'block';
            return;
        }
        const pathName = this.props.pathName || 'disease';
        const path = PATH_URL + pathName;
        this.props.searchDisease({body: {query}, path});
        this.props.saveQuery(query);
    }

    handleChange = e => {
        this.setState({
            query: e.target.value
        });
        localStorage.setItem('searchQuery', e.target.value);
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
