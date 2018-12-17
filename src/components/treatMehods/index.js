/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {Tabs, Icon} from 'antd';
import ModalComponent from '../modal';
import DetailIcon from '../detailIcon';
import './index.less';

const TabPane = Tabs.TabPane;

const getDrugComponent = (title, treatment, cthis) => {
    const desc = get(treatment, 'drugRecommends.desc', '');
    const drugLists = get(treatment, 'drugRecommends.list', []);
    if (!drugLists.length) {
        return '';
    }
    return [
        <div>
            <span className="drug-title">{title}:</span>
            {desc ? <Icon className="icon-search" type="question-circle" theme="outlined"
                onClick={cthis.showModal.bind(this, title, desc)} /> : ''}
        </div>,
        drugLists.map((list, index) => {
            const {name, method, kgid} = list;
            return <div className="recommend-bar" key={index}>
                <div className="treat-wrap">
                    <span className="auxi-name treat" data-clipboard-text={name + method}>{name}</span>
                    {
                        kgid ? <DetailIcon kgid={kgid} {...cthis.props} title={name} from="drug"></DetailIcon> : ''
                    }
                </div>
                <div>
                    <span className="auxi-name treat" data-clipboard-text={name + method}>{method}</span>
                </div>
            </div>;
        })];
};
const getSurgerComponent = (title, treatment, cthis) => {
    const desc = get(treatment, 'surgeryRecommends.desc', '');
    const surgeryLists = get(treatment, 'surgeryRecommends.list', []);
    if (!surgeryLists.length) {
        return '';
    }
    return [
        <div>
            <span className="surgery-title">{title}</span>
            {desc ? <Icon className="icon-search" type="question-circle" theme="outlined"
                onClick={cthis.showModal.bind(this, title, desc)} /> : ''}

        </div>,
        surgeryLists.map((list, index) => {
            const {approach, attention, indication, name, procedure, kgid} = list;
            return <div className="recommend-bar" key={index}>
                <div>
                    <span className="auxi-name treat" data-clipboard-text={name}>{name}</span>
                    {
                        kgid ? <DetailIcon kgid={kgid} {...cthis.props} title={name} from="drug"></DetailIcon> : ''
                    }
                </div>
                <div>
                    {
                        approach
                            ? <span className="auxi-name treat" data-clipboard-text={approach}>{approach}</span>
                            : ''
                    }
                    {
                        attention
                            ? <span className="auxi-name treat" data-clipboard-text={attention}>{attention}</span>
                            : ''
                    }
                    {
                        indication
                            ? <span className="auxi-name treat" data-clipboard-text={indication}>{indication}</span>
                            : ''
                    }
                    {
                        procedure
                            ? <span className="auxi-name treat" data-clipboard-text={procedure}>{procedure}</span>
                            : ''
                    }
                </div>
            </div>;
        })];
};
const getTabs = level => {
    let tabContent = '';
    switch (level) {
        case 1:
            tabContent = '轻度';
            break;
        case 2:
            tabContent = '中度';
            break;
        case 3:
            tabContent = '重度';
            break;
        default:
            break;
    }
    return tabContent;
};
function callback(key) {
    console.log(key);
}
const getTreatMehods = (treatments, dthis) => {

    if (!treatments.length) {
        return '';
    }
    return <div className="recommend-bar treat-recommend">
        <div>
            <span className="treat-name">治疗方案推荐：</span>
        </div>
        {
            dthis.diffLevelTreatments(treatments)
        }
    </div>;
};
class TreatMehods extends Component {
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
        console.log(e);
        this.setState({
            visible: false
        });
    }
    diffLevelTreatments = treatments => {
        let levelSum = 0;
        treatments.map((treatment, index) => (
            levelSum += treatment.level
        ));
        if (levelSum === 0) {
            return <div className="common-treatments">
                {
                    treatments.map((treatment, index) => {
                        const cthis = this;
                        return [
                            getDrugComponent('用药方案', treatment, cthis),
                            getSurgerComponent('手术方案', treatment, cthis)
                        ];
                    })
                }
            </div>;
        }
        return <Tabs
            defaultActiveKey="1"
            onChange={callback}
            type="card">
            {
                treatments.map((treatment, index) => {
                    const cthis = this;
                    // 手术方案
                    const drugLists = get(treatment, 'drugRecommends.list', []);
                    // 用药方案
                    const surgeryLists = get(treatment, 'surgeryRecommends.list', []);

                    return <TabPane tab={getTabs(treatment.level)} key={index + 1} level={treatment.level}>

                        <Tabs defaultActiveKey="1" tabPosition="left">
                            {
                                drugLists.length
                                    ? <TabPane tab="用药方案" key="1">{getDrugComponent('用药方案', treatment, cthis)}</TabPane>
                                    : ''
                            }
                            {
                                surgeryLists.length
                                    ? <TabPane tab="手术方案" key="2">{getSurgerComponent('手术方案', treatment, cthis)}</TabPane>
                                    : ''
                            }
                            {/* <TabPane tab="用药方案" key="1">{getDrugComponent('用药方案', treatment, cthis)}</TabPane> */}
                            {/* <TabPane tab="手术方案" key="2">{getSurgerComponent('手术方案', treatment, cthis)}</TabPane> */}
                        </Tabs>
                    </TabPane>;
                })
            }
        </Tabs>;
    }
    render() {
        const treatments = get(this.props, 'treatments', []);

        return (
            <div className="auxiliary-box">
                {
                    getTreatMehods(treatments, this)
                }
                <ModalComponent name={this.state.name} desc={this.state.desc}
                    onCancel={this.handleCancel} visible={this.state.visible}></ModalComponent>
            </div >
        );
    }
}

TreatMehods.propTypes = {

};

TreatMehods.defaultProps = {
};

export default TreatMehods;
