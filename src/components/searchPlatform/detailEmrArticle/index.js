/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import 'style/antd/antd.css';
import './index.less';
// Object.entries polyfill
import image_error from '../../../style/img/image_error.png';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

const objectEntries = () => {
    return Object.entries = function (obj) {
        const ownProps = Object.keys(obj);
        let i = ownProps.length;
        let resArray = new Array(i);
        while (i--) {
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }
        return resArray;
    };
};
const getEmrDetailContent = result => {
    if (!result) {
        return '';
    }
    if (result === 'failure') {
        return <div className="no-recommend">
            <img src={image_error} />
            <p>加载错误</p>
        </div>;
    }
    if (result === 'requesting') {
        return <div>{result}</div>;
    }
    return result.length && result.map((del, index) => {
        const delObj = !Object.entries ? objectEntries()(del) : Object.entries(del);
        return delObj.map((dels, index) => {
            return <div key={index}>
                <div>
                    <div className="emr-detail">
                        {
                            dels[1] ?
                                <span>
                                    <span className="emrDetail-item">{dels[0]}</span>
                                    <span className="emrDetail-info">{dels[1]}</span>
                                </span>
                                : ''
                        }

                    </div>
                </div>
            </div>;
        });
    });
};
class DetailEmrArticle extends Component {
    render() {
        const result = get(this.props, 'detail.result', []);
        const title = localStorage.getItem('title');
        const type = localStorage.getItem('type');
        const dateTitle = type === '门诊' ? '门诊检查' : '入院检查';
        console.log('type', type);

        return (
            <div className="detail-box" >
                <Tabs defaultActiveKey="1">
                    <TabPane tab={`${type}记录`} key="1">
                        <Tabs
                            defaultActiveKey="1"
                            tabPosition="left"
                            className="child-Tabs">
                            <TabPane tab={`${dateTitle} 2018-01-27`} key="1">
                                <div className="detail-title">{title}</div>
                                {
                                    getEmrDetailContent(result)
                                }
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    {/* <TabPane tab="检验信息" disabled key="2">Tab 2</TabPane>
                    <TabPane tab="检查信息" disabled key="3">Tab 3</TabPane> */}
                </Tabs>
            </div>
        );
    }
}

DetailEmrArticle.propTypes = {

};

DetailEmrArticle.defaultProps = {
};

export default DetailEmrArticle;
