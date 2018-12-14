/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import remindData from './remind';
import get from 'lodash/get';

import './index.less';
import 'style/base.less';
import icon_arrow_down from '../../style/img/icon_arrow_down.png';
import icon_arrow_up from '../../style/img/icon_arrow_up.png';

const transWord = type => {
    let word = '';
    switch (type) {
        case 'logic':
            word = '逻辑';
            break;
        case 'medication':
            word = '用药';
            break;
        case 'medicalExam':
            word = '检查';
            break;
        case 'medicalTest':
            word = '检验';
            break;
        default:
            word = '手术';
            break;
    }
    return word;
};

const getLevelClass = level => {
    return level === 'error' ? 'errorTip' : 'warningTip';
};

const getIcon = status => {
    return status ? icon_arrow_up : icon_arrow_down;
};

class Remind extends Component {
    state = {
        tipStatus: false
    };

    changeStatus = () => {
        this.setState({
            tipStatus: !this.state.tipStatus
        });

        if (this.state.tipStatus) {
            $('.moretip-wrapper').css('height', '0');
            // 更改箭头方向
            getIcon(this.state.tipStatus);

            // 文字收起
            $('.content-space').addClass('no-wrap');
            $('.tip-info').addClass('no-wrap');
        }
        else {
            setTimeout(function () {
                let tmp = $('.moretip-wrapper .tip-info').height() + 16;
                $('.moretip-wrapper').css('height', tmp);
            }, 0);

            // 更改箭头方向
            getIcon(this.state.tipStatus);

            // 省略的文字展开
            $('.content-space').removeClass('no-wrap');
            $('.tip-info').removeClass('no-wrap');
        }
    }

    render() {
        const data = get(this.props, 'alert.data.risks', null);
        const dataShow = data && data.slice(0, 2);
        const dataMore = data && data.slice(2);

        return (
            <div className="remind-content-box">
                {
                    data && dataShow.map((d, index) => {
                        const level = d.level;
                        return <div key={index} className="content-space">
                            <div className="tip-line"></div>
                            <div className="text-wrapper">
                                <span className={getLevelClass(level)}>{transWord(d.type)}</span>
                                <span className="tip-info no-wrap">{d.message}</span>
                            </div>
                        </div>;
                    })
                }

                {
                    dataMore && dataMore.length && dataMore.map((d, index) => {
                        const level = d.level;
                        return <div>
                            <div key={index} className="content-space no-wrap">
                                <div className="moretip-wrapper">
                                    <div className="tip-line"></div>
                                    <div className="text-wrapper">
                                        <span className={getLevelClass(level)}>{transWord(d.type)}</span>
                                        <span className="tip-info no-wrap">{d.message}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="tip-line"></div>
                            <div className="more-tips" onClick={this.changeStatus.bind(this)}>
                                {
                                    this.state.tipStatus ? <span>收起智能提醒</span> : <span>查看更多提醒</span>
                                }
                                <img src={getIcon(this.state.tipStatus)} />
                            </div>
                        </div>;
                    })
                }
            </div>
        );
    }
}

Remind.propTypes = {

};

Remind.defaultProps = {
};

export default Remind;
