/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import $ from 'zepto';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {Collapse} from 'antd';
import get from 'lodash/get';
import HeaderBar from 'components/headerBar';
import AuxiliaryContent from 'components/auxiliary';
import DiffialDiagnosis from 'components/diffialDiagnosis';
import TestRecommends from 'components/testRecommends';
import TreatMehods from 'components/treatMehods';
import './index.less';

const Panel = Collapse.Panel;

const clipboard = new Clipboard('.auxi-name');
clipboard.on('success', function (e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    console.log('已经复制到剪贴板');
    const pos = $(e.trigger).position();
    console.log(pos.left);
    console.log(pos.top);

    $('.copied').css({
        display: 'inline-block',
        position: 'absolute',
        left: pos.left + 80,
        top: pos.top
    });

    setTimeout(function () {
        $('.copied').css({
            display: 'none'
        });
    }, 1000);
    e.clearSelection();
});

clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

class ClinicRecommend extends Component {
    componentDidMount() {
        if (!Clipboard.isSupported()) {
            throw Error('浏览器不支持 clipboard');
        }
    }
    componentWillUnmount() {
        clipboard.destroy();
    }

    render() {
        const {advice, searchDetail, source} = this.props;
        console.log(advice);
        return (
            <div>
                <Collapse accordion>

                    {
                        advice.map((adv, index) => {
                            const {
                                name,
                                rate,
                                kgid,
                                differentialDiagnosis,
                                testRecommends,
                                examRecommends,
                                treatments
                            } = adv;

                            const symptom = get(adv, 'auxiliaryDiagnosis.symptom', []);
                            const sign = get(adv, 'auxiliaryDiagnosis.sign', []);
                            const headerBar = <HeaderBar name={name} rate={rate}
                                kgid={kgid} {...this.props} ></HeaderBar>;

                            // 判断content内容是否都为空，若是，则隐藏content内容并去除箭头;
                            if (!sign.length && !differentialDiagnosis.length && !testRecommends.length
                                && !examRecommends.length && !treatments.length) {
                                // return <Panel key={index} header={headerBar} showArrow={false} disabled></Panel>;
                                return headerBar;
                            }
                            else {
                                return <Panel key={index} header={headerBar}>
                                    <div className="cdss-recommend-box">
                                        <AuxiliaryContent symptom={symptom} sign={sign}></AuxiliaryContent>

                                        <DiffialDiagnosis differentialDiagnosis={differentialDiagnosis}
                                            {...this.props}></DiffialDiagnosis>

                                        <TestRecommends testRecommends={testRecommends}
                                            examRecommends={examRecommends}></TestRecommends>

                                        <TreatMehods treatments={treatments} index={index} {...this.props}></TreatMehods>
                                        <span className="copied">已复制</span>
                                    </div>
                                </Panel>;
                            }
                        })
                    }

                </Collapse>

            </div>
        );
    }
}

ClinicRecommend.propTypes = {

};

ClinicRecommend.defaultProps = {
};

export default ClinicRecommend;
