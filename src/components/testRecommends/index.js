/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import $ from 'zepto';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import ModalComponent from '../modal';
import 'style/antd/antd.css';

class TestRecommends extends Component {
    state = {
        visible: false,
        name: '',
        desc: ''
    }
    showModal = (name, desc) => {
        this.setState({
            visible: true,
            name,
            desc
        });

    }
    handleCancel = e => {
        this.setState({
            visible: false
        });
    }
    getTestRecommend = (name, recommends) => {
        if (!recommends || !recommends.length) {
            return '';
        }
        return <div className="recommend-bar">
            <span className="name" >{name}：</span>
            <div className="auxi-wrapper">
                {recommends.map((test, index) => {
                    const {name, desc} = test;
                    return <div key={index}>
                        <span className="auxi-name" data-clipboard-text={name}>
                            {name}
                        </span>
                        {desc ? <Icon className="icon-search" type="question-circle" theme="outlined"
                            onClick={this.showModal.bind(this, name, desc)} /> : ''}
                    </div>;
                })}
            </div>
        </div>;
    };
    render() {
        const {testRecommends, examRecommends} = this.props;
        return (
            <div className="auxiliary-box">
                {
                    this.getTestRecommend('检验项目推荐', testRecommends)
                }
                {
                    this.getTestRecommend('检查项目推荐', examRecommends)
                }
                <ModalComponent name={this.state.name} desc={this.state.desc}
                    onCancel={this.handleCancel} visible={this.state.visible}></ModalComponent>
            </div>
        );
    }
}

TestRecommends.propTypes = {

};

TestRecommends.defaultProps = {
};

export default TestRecommends;
