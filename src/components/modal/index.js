/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import {Modal} from 'antd';

export default class ModalComponent extends Component {
    state = {
        visible: false,
        name: '',
        desc: ''
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
            name: nextProps.name,
            desc: nextProps.desc
        });
    }
    render() {
        // const {name, desc} = this.props;
        return (
            <Modal
                footer={null}
                title={this.state.name}
                visible={this.state.visible}
                onCancel={this.props.onCancel}
            >
                <p>{this.state.desc}</p>
            </Modal>
        );
    }
}
