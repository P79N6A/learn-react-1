/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import {Form, Input, Tabs, Pagination, Button, Select} from 'antd';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import AdvanceSearch from '../advanceSearch';
import 'style/antd/antd.css';
import './index.less';
import image_empty from '../../../style/img/image_empty.png';
import image_error from '../../../style/img/image_error.png';

// const PATH_URL = process.env.REACT_APP_PATH_URL;
// const PATH_DETAIL_URL = process.env.REACT_APP_DETAIL_PATH_URL;

const PATH_URL = 'http://yq01-kg-log0.yq01:8700/v1/search/query/';
const PATH_DETAIL_URL = 'http://yq01-kg-log0.yq01:8700/v1/search/id/';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const gotoDetail = (dthis, id, title, type) => {
    localStorage.setItem('title', title);
    localStorage.setItem('id', id);
    localStorage.setItem('type', type);
    const pathName = localStorage.getItem('pathName');
    console.log(pathName);

    // 病例库 不存query,保持原疾病库query
    pathName === 'emr' ? '' : localStorage.setItem('query', title);

    const detailObj = {
        path: PATH_DETAIL_URL + pathName,
        body: {
            id: [id]
        }
    };
    dthis.props.searchDetail(detailObj);
    browserHistory.push('detail');
};

const transValueToCurrent = value => {
    return !value ? '' : Number(value);
};

const transName = value => {
    let name = '';
    switch (value) {
        case 'drug':
            name = '药品';
            break;
        case 'emr':
            name = '病历';
            break;
        default:
            name = '疾病';
            break;
    }
    return name;
};

const getPaginationBar = (result, dthis, totalNum) => {
    return <div className="paginate-bar">
        <div className="paginate-right">
            <div>
                <Pagination current={dthis.state.current} pageSize={dthis.state.pageSize} total={totalNum}
                    onChange={dthis.handleChange} />
            </div>

            <div className="page-count">

                <span className="page-single">每页</span>
                <Select value={dthis.state.pageSize} onChange={dthis.handleEachChange}>
                    <Option value="10条">10条</Option>
                    <Option value="20条">20条</Option>
                    <Option value="30条">30条</Option>
                    <Option value="50条">50条</Option>
                </Select>
            </div>
            <div className="btn-wrap">
                <Button onClick={dthis.handleSubmit}> 确定</Button>
            </div>

        </div>

    </div>;
};

const getEmrResult = (result, dthis, totalNum) => {

    if (typeof (result) !== 'object') {
        if (result === 'failure') {
            return <div className="no-recommend">
                <img src={image_error} />
                <p>加载错误</p>
            </div>;
        }
        if (result === 'requesting') {
            return <div>{result}</div>;
        }
    }
    if (!result.length) {
        return <div className="no-recommend">
            <img src={image_empty} />
            <p>暂无内容</p>
            <p>请输入要查询的病历</p>
        </div>;
    }

    return [
        <div className="paginate-left">
            {`共检索到${totalNum}条${dthis.props.queryName ? `"${dthis.props.queryName}"` : ''}
            ${transName(dthis.props.pathName || 'disease')}`}
        </div>,
        result.length && result.map((res, index) => {
            const id = res['id'] || '';
            const time = res['就诊时间'] || '';
            const department = res['科室'] || '';
            const sex = res['性别'] || '';
            const age = res['年龄'] || '';
            const suit = res['主诉'] || '';
            const type = res['就诊类型'] || '';
            const nowHistory = res['现病史'] || '';
            const title = `${time}_${sex}_${age}_${department}`;
            return <div key={index} className="list-box">
                <div className="list-tag">{type}</div>
                <div className="list-title">
                    <a href="javascript:void(0)" onClick={gotoDetail.bind(dthis, dthis, id, title, type)}>
                        {title}
                    </a>
                </div>
                <div className="list-desc">{suit ? `主诉：${suit}` : ''}</div>
                <div className="list-desc">{nowHistory ? `现病史：${nowHistory}` : ''}</div>
            </div>;
        }),

        getPaginationBar(result, dthis, totalNum)
    ];
};

const getDiseaseResult = (result, dthis, totalNum) => {
    if (typeof (result) !== 'object') {
        if (result === 'failure') {
            return <div className="no-recommend">
                <img src={image_error} />
                <p>加载错误</p>
            </div>;
        }
        if (result === 'requesting') {
            return <div>{result}</div>;
        }
    }
    console.log(result);
    if (!result.length) {
        return <div className="no-recommend">
            <img src={image_empty} />
            <p>未找到相关疾病</p>
            <p>建议换个检索词试试看</p>
        </div>;
    }

    return [
        <div className="paginate-left">
            {`共检索到${totalNum}条${dthis.props.queryName ? `"${dthis.props.queryName}"` : ''}
            ${transName(dthis.props.pathName || 'disease')}`}
        </div>,
        result.length && result.map((res, index) => {
            const {title, summary, id} = res;
            return <div key={index} className="list-box">
                <div className="list-title">
                    <a href="javascript:void(0)" onClick={gotoDetail.bind(dthis, dthis, id, title)}>{title}</a>
                </div>
                <div className="list-desc">{summary}</div>
            </div>;
        }),
        getPaginationBar(result, dthis, totalNum)
    ];
};

class ResultLibrary extends Component {
    state = {
        current: 1,
        page: 1,
        pageSize: 10
    }
    init = () => {
        localStorage.setItem('activeKey', '');
    }
    componentDidMount() {
        this.init();
    }
    handleCallback = key => {
        this.props.switchKey(key);
        localStorage.setItem('pathName', key);
        const path = PATH_URL + key;
        const query = localStorage.getItem('searchQuery') || this.props.queryName;
        if (!query) {
            // throw Error('query 不能为空');
            return;
        }
        this.props.searchDisease({
            body: {query},
            path
        });
    }

    sendSearchRequest = (page, pageSize) => {
        const pathName = this.props.pathName || 'disease';
        console.log(pathName + '-------pathName');
        const queryName = this.props.queryName;
        const path = PATH_URL + pathName;
        // const query = queryName || '支气管哮喘';
        const query = queryName || '';
        this.props.searchDisease({
            path,
            body: {
                query,
                page,
                pageSize
            }
        });
    }
    handleChange = (page, pageSize) => {
        this.setState({
            current: page,
            page
        });
    }

    handleEachChange = value => {
        console.log(value);
        this.setState({
            pageSize: transValueToCurrent(value.substr(0, 2))
        });
    }
    handleInputChange = e => {
        console.log(e.target.value);
        const value = e.target.value;
        this.setState({
            page: value,
            current: transValueToCurrent(value)
        });
    }
    handleSubmit = () => {
        const page = this.state.page;
        const pageSize = this.state.pageSize;
        console.log(page + '--------' + pageSize);
        this.setState({
            current: transValueToCurrent(page)
        });
        this.sendSearchRequest(page, pageSize);
    }
    render() {
        const result = get(this.props, 'disease.result', []);
        const totalNum = get(this.props, 'disease.totalNum', '');
        const activeKey = localStorage.getItem('activeKey');
        return (
            <div className="search-box search-tabs-wrap">
                <Tabs onChange={this.handleCallback} animated={false} defaultActiveKey={activeKey || 'disease'} >
                    <TabPane tab="疾病库" key="disease" tag="disease">
                        {
                            !result.length
                                ? <div className="no-recommend">
                                    <img src={image_empty} />
                                    <p>暂无内容</p>
                                    <p>请输入您要查询的疾病名称</p>
                                </div>
                                : getDiseaseResult(result, this, totalNum)
                        }
                    </TabPane>
                    <TabPane tab="药品库" key="drug" tag="drug">
                        {
                            !result.length
                                ? <div className="no-recommend">
                                    <img src={image_empty} />
                                    <p>暂无内容</p>
                                    <p>请输入要查询的药品</p>
                                </div>
                                : getDiseaseResult(result, this, totalNum)
                        }
                    </TabPane>
                    <TabPane tab="病历库" key="emr" tag="emr">
                        <AdvanceSearch {...this.props}></AdvanceSearch>
                        {
                            getEmrResult(result, this, totalNum)
                        }
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

ResultLibrary.propTypes = {

};

ResultLibrary.defaultProps = {
};

export default ResultLibrary;
