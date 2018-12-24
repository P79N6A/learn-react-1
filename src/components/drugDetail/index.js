/**
 * @file index.js
 * @author fengdanping@baidu.com
 */

import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {Tabs, Icon} from 'antd';
import ModalComponent from '../modal';
import DetailIcon from '../detailIcon';
import './index.less';

const TabPane = Tabs.TabPane;

const changeLineWidth = result => {
    if (!result || !result.length || typeof (result) === 'string') {
        return '';
    }

    let parWidth = $('.category-bar').width();
    return result.map((cont, index) => {
            let newIndex = index + 2;
            let currWidth = $(`.category-bar:nth-child(${newIndex}) .drug-category`).width();
            let lineWidth = parWidth - currWidth - 11;
            $(`.line-${index}`).css('width', lineWidth);
        });
};

const getDrugComponent = (title, treatment, cthis) => {
    const desc = get(treatment, 'drugRecommends.desc', '');
    const drugLists = get(treatment, 'drugRecommends.list', []);
    if (!drugLists.length) {
        return '';
    }

    setTimeout(() => {
        changeLineWidth(drugLists);
    }, 0);

    return  drugLists.map((categoryList, index) => {
        const {kgid, category, drugList} = categoryList;
        const MAXLEN = 2;
        const listId = index;
        const currname = `detail-line line-${index}`;

        return <div className="category-bar" key={index} id={category}>
            <div className="drug-category">{category}</div>
            <span className={currname}></span>

            {
                drugList && drugList.map((list, index) => {
                    const {name, method, kgid} = list;
                    return <div className="recommend-bar" key={index}>
                        <div className="treat-wrap">
                            <span className="auxi-name treat" data-clipboard-text={name + method}>{name}</span>
                            {
                                kgid ? <DetailIcon kgid={kgid} {...cthis.props} title={name} from="drug"></DetailIcon> : ''
                            }
                        </div>
                        <div className="usage-text">
                            <span className="auxi-name treat" data-clipboard-text={name + method}>{method}</span>
                        </div>
                    </div>;
                })
            }
        </div>
    })
};

const getSurgerComponent = (title, treatment, cthis) => {
    const desc = get(treatment, 'surgeryRecommends.desc', '');
    const surgeryLists = get(treatment, 'surgeryRecommends.list', []);

    if (!surgeryLists.length) {
        return '';
    }
    return [
        surgeryLists.map((list, index) => {
            const {approach, attention, indication, name, procedure, kgid} = list;
            return <div className="recommend-bar" key={index}>
                <div className="treat-wrap">
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
        {
            dthis.diffLevelTreatments(treatments)
        }
    </div>;
};

const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if (anchorElement) {
            anchorElement.scrollIntoView();
        }
    }
};

class DrugDetail extends Component {
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
        const level = localStorage.getItem('level');

        if (levelSum === 0) {
            return <div className="common-treatments">
                {
                    treatments.map((treatment, index) => {
                        const cthis = this;
                        // 手术方案
                        const drugLists = get(treatment, 'drugRecommends.list', []);
                        // 用药方案
                        const surgeryLists = get(treatment, 'surgeryRecommends.list', []);
                        const type = localStorage.getItem('tabType');

                        return  <Tabs defaultActiveKey={type}>
                                {
                                    drugLists.length
                                        ? <TabPane tab="用药方案" key="drug">{getDrugComponent('用药方案', treatment, cthis)}</TabPane>
                                        : ''
                                }
                                {
                                    surgeryLists.length
                                        ? <TabPane tab="手术方案" key="surger">{getSurgerComponent('手术方案', treatment, cthis)}</TabPane>
                                        : ''
                                }
                            </Tabs>;
                    })
                }
            </div>;
        }

        return <Tabs
            defaultActiveKey={level}
            onChange={callback}
            type="card"
            className="treat-tab">
            {
                treatments.map((treatment, index) => {
                    const cthis = this;
                    // 手术方案
                    const drugLists = get(treatment, 'drugRecommends.list', []);
                    // 用药方案
                    const surgeryLists = get(treatment, 'surgeryRecommends.list', []);
                    const type = localStorage.getItem('tabType');

                    return <TabPane tab={getTabs(treatment.level)} key={index + 1} level={treatment.level}>
                        <Tabs defaultActiveKey={type} className="child-tabs">
                            {
                                drugLists.length
                                    ? <TabPane tab="用药方案" key="drug">{getDrugComponent('用药方案', treatment, cthis)}</TabPane>
                                    : ''
                            }
                            {
                                surgeryLists.length
                                    ? <TabPane tab="手术方案" key="surger">{getSurgerComponent('手术方案', treatment, cthis)}</TabPane>
                                    : ''
                            }
                        </Tabs>
                    </TabPane>;
                })
            }
        </Tabs>;
    }

    render() {
        const {advice, alert, loadStatus} = this.props;
        const index = localStorage.getItem('id');
        const category = localStorage.getItem('category');
        const treatments = get(advice[index], 'treatments', []);

        console.log('index', index);
        console.log('advice', advice);
        console.log('treatments', treatments);

        setTimeout(() => {
            category === '' ? window.scrollTo(0, 0) : scrollToAnchor(category);
        }, 0);

        return (
            <div className="drug-detail">
                 <div className="auxiliary-box">
                    {
                        getTreatMehods(treatments, this)
                    }
                    <ModalComponent name={this.state.name} desc={this.state.desc}
                        onCancel={this.handleCancel} visible={this.state.visible}></ModalComponent>
                </div >
            </div>
        );
    }
}

DrugDetail.propTypes = {

};

DrugDetail.defaultProps = {
};

export default DrugDetail;
