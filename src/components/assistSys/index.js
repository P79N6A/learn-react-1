/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */
import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Search from '../search';
import Remind from '../remind';
import ClinicRecommend from '../clinicRecommend';

import 'style/antd/antd.css';
import './index.less';
import image_empty from '../../style/img/image_empty.png';
import image_error from '../../style/img/image_error.png';

// const CDSS_PATH_URL = process.env.REACT_APP_EMR_PATH_URL;
const CDSS_PATH_URL = 'http://yq01-yexianyi.epc.baidu.com:8080/medical-cdss/api/v1/analyze';
// const WS_CDSS_DEV_PATH = process.env.REACT_APP_WS_PATH_URL;
const loadError = loadStatus => {
    return loadStatus === 'error' ? (
        <div className="no-recommend">
            <img src={image_error} />
            <p>加载错误</p>
        </div>)
        : '';
};
// 计算"免责声明"位置
const computedMinHeight = cthis => {
    let clientHeight = document.documentElement.clientHeight;
    let searchHeight = $('.search-box').height();
    let remindHeight = $('.remind-wrapper').height();
    // let disclaimerHeight = $('.disclaimer-content').height();
    let disclaimerHeight = 68;

    // tip-content
    let result = clientHeight - searchHeight - remindHeight - disclaimerHeight;
    cthis.adviceElem.style.minHeight = result + 'px';
};


class AssistSys extends Component {
    componentWillMount() {
        // const websocketConnect = this.props.websocketConnect;
        // // const url = WS_CDSS_DEV_PATH + '?MAC_ADDR=' + 33;
        // const url = WS_CDSS_DEV_PATH;
        // websocketConnect(url);
    }
    componentDidMount() {
        window.getEmrData = emrData => {
            const event = new CustomEvent('nv-enter', {
                detail: {
                    message: emrData
                },
                bubbles: true,
                cancelable: true
            });
            this.nv.dispatchEvent(event);
        };
        this.nv.addEventListener('nv-enter', this.handleNvEnter);
        // this.props.sendEmrDetail({
        //     path: CDSS_PATH_URL,
        //     // body:window.emrData,
        //     body: {
        //         'department': '呼吸内科', 'classify': '入院记录', 'patientID': '88888888', 'name': '李四', 'age': '61',
        //         'sex': '男', 'phone': '13800138000', 'address': '北京市海淀区西北旺路', 'mainSuit': '咳嗽咳痰6天',
        //         'nowHistory': '', 'pastHistory': '', 'allergenHistory': '', 'manHistory': '', 'familyHistory': '',
        //         'marryHistory': '', 'checkBody': '', 'assistCheckBody': '', 'initDiagnose': '', 'distDiagnose': '',
        //         'checkDiagnose': '', 'testDiagnose': '', 'drugDiagnose': ''
        //     }
        // });

        // 计算免责声明的位置:
        setTimeout(() => {
            computedMinHeight(this);
        }, 0);
    }

    handleNvEnter = event => {
        // alert(event.detail.message);
        this.props.sendEmrDetail({
            path: CDSS_PATH_URL,
            body: event.detail.message
        });
    };

    enlargeWindow = () => {
        // window.jsObj.showDetailWindow('disclaimer');
    }

    render() {
        const {advice, alert, loadStatus} = this.props;
        const errorNum = get(alert.data, 'errorNum', 0);
        const warningNum = get(alert.data, 'warningNum', 0);
        return (
            <div ref={elem => this.nv = elem} className="tip-wrapper">
                <Search {...this.props}></Search>
                <div className="remind-wrapper">
                    <div className="tip-before"></div>
                    <div className="tip-item">
                        <div className="header-wrapper">
                            <div className="cdss-header-word">智能提醒</div>
                            <div className="cdss-header-tip">
                                {errorNum > 0 ? <span>{errorNum}项警告 </span> : ''}
                                {warningNum > 0 ? <span>{warningNum}项风险</span> : ''}
                            </div>
                        </div>

                        <div className="header-line"></div>
                        {
                            alert.data && Object.keys(alert.data).length
                                ? <Remind alert={alert} {...this.props}></Remind>
                                : <div className="no-tip">暂无信息提醒</div>
                        }
                    </div>
                    <div className="tip-after"></div>
                </div>

                <div className="tip-content" ref={elem => this.adviceElem = elem}>
                    <div className="cdss-header-word">临床建议</div>
                    {
                        advice && advice.length ? <div className="tip-count">{advice.length}项建议</div> : ''
                    }
                    {
                        advice && advice.length
                            ? <div>
                                {
                                    < ClinicRecommend advice={advice} {...this.props}>
                                    </ClinicRecommend>
                                }
                            </div>
                            : <div className="no-recommend">
                                <img src={image_empty} />
                                <p>暂无推荐</p>
                                <p>请填写患者症状体征再试试</p>
                            </div>
                    }
                    {
                        loadError(loadStatus)
                    }
                </div>

                {
                    advice && advice.length
                        ? <div className="disclaimer-content">
                                <Link to="/disclaimer" className="disclaimer-title"
                                    onClick={this.enlargeWindow}>免责声明</Link>
                                <p className="disclaimer-note">以上资料及内容仅供参考，实际情况以医生诊断为准</p>
                            </div>
                        : ''
                }

            </div >
        );
    }
}
AssistSys.propTypes = {
};
AssistSys.defaultProps = {
    advice: '',
    alert: ''
};
export default AssistSys;
