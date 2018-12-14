/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import SearchBar from '../searchBar';
import ResultLibrary from '../resultLibrary';
import {searchDisease} from 'actions/searchPlatform/searchRequest';
import get from 'lodash/get';

import 'style/antd/antd.css';
import './index.less';

const Search = Input.Search;

class PlatMain extends Component {
    componentDidMount() {
    }
    // getSearchPath = path => {
    //     console.log(path);
    // }
    render() {

        return (
            <div className="search-box" >
                <div>
                    <div className="search-wrapper">
                        <SearchBar {...this.props}></SearchBar>
                    </div>

                    <ResultLibrary {...this.props}></ResultLibrary>
                </div>

            </div>
        );
    }
}

PlatMain.propTypes = {

};

PlatMain.defaultProps = {
};

export default PlatMain;
