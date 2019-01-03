/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import $ from 'zepto';
import PropTypes from 'prop-types';
import {browserHistory, Link} from 'react-router';
import get from 'lodash/get';
import {Icon} from 'antd';
import DetailIcon from '../detailIcon';
import ModalComponent from '../modal';

// const PATH_URL = process.env.REACT_APP_PATH_URL;
// const PATH_DETAIL_URL = process.env.REACT_APP_DETAIL_PATH_URL;

const PATH_URL = 'http://yq01-kg-log0.yq01:8700/v1/search/query/';
const PATH_DETAIL_URL = 'http://yq01-kg-log0.yq01:8700/v1/search/id/';

class DiffialDiagnosis extends Component {
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
    // gotoDetail = kgid => {
    //     const detailObj = {
    //         path: PATH_DETAIL_URL + 'disease',
    //         body: {
    //             id: [kgid]
    //         }
    //     };
    //     this.props.searchDetail(detailObj);
    //     browserHistory.push('detail');
    // }
    render() {
        const differentialDiagnosis = get(this.props, 'differentialDiagnosis', []);
        const source = this.props.source;
        return (
            <div className="auxiliary-box">
                {
                    differentialDiagnosis.length
                        ? <div className="recommend-bar">
                            <span className="name">鉴别诊断：</span>
                            <div className="auxi-wrapper">
                                {
                                    differentialDiagnosis.map((diagnosis, index) => {
                                        const {name, desc, kgid} = diagnosis;
                                        return <div key={index}>
                                            <span className="auxi-name" data-clipboard-text={name}
                                                data-type='auxiliary'>{name || ''}</span>
                                            {
                                                kgid ? <DetailIcon kgid={kgid} name={name} source={source}
                                                    {...this.props} from="disease"></DetailIcon> : ''
                                            }

                                            {
                                                desc ? <Icon className="icon-search" type="question-circle"
                                                    theme="outlined"
                                                    onClick={this.showModal.bind(this, name, desc)} /> : ''
                                            }
                                        </div>;
                                    })
                                }

                                <ModalComponent name={this.state.name} desc={this.state.desc}
                                    onCancel={this.handleCancel} visible={this.state.visible}></ModalComponent>
                            </div>
                        </div>
                        : ''
                }
            </div>
        );
    }
}

DiffialDiagnosis.propTypes = {

};

DiffialDiagnosis.defaultProps = {
};

export default DiffialDiagnosis;
