/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {Tabs, Icon} from 'antd';
import ModalComponent from '../modal';
import DetailIcon from '../detailIcon';
import icon_arrow_right from '../../style/img/icon_right.png';
import './index.less';

const TabPane = Tabs.TabPane;

const enlargeWindow = (type, id, category, cthis, e) => {
    e.stopPropagation();
    const level = cthis.state.level;
    browserHistory.push(`/drugDetail/${id}/${level}/${type}/${category}`);
};

const getDrugComponent = (title, treatment, id, cthis) => {
    const desc = get(treatment, 'drugRecommends.desc', '');
    const drugLists = get(treatment, 'drugRecommends.list', []);

    if (!drugLists.length) {
        return '';
    }

    return [
            drugLists.map((categoryList, index) => {
                const {kgid, category, drugList} = categoryList;
                const MAXLEN = 2;

                return <div className="category-bar" key={index}>
                            <div className="category-line"></div>
                                <div className="drug-category">{category}</div>
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
                                {
                                    drugList
                                        && drugList.length > MAXLEN
                                        // && <Link to={`/drugDeail/${id}`} className="check-more">查看更多</Link>
                                        && <span className="check-more" onClick={(e) => enlargeWindow('drug', id, category, cthis, e)}>查看更多</span>
                                }
                    </div>;
            }),
            <div className="check-all" onClick={(e) => enlargeWindow('drug', id, '', cthis, e)}>查看全部 &nbsp;(13) <img src={icon_arrow_right}/> </div>
        ];
};

const getSurgerComponent = (title, treatment, id, cthis) => {
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
        }),
        <div className="check-all" onClick={(e) => enlargeWindow('surger', id, '', cthis, e)}>查看全部 &nbsp;(13) <img src={icon_arrow_right}/> </div>
    ];
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

const getTreatMehods = (treatments, index, dthis) => {

    if (!treatments.length) {
        return '';
    }
    return <div className="recommend-bar treat-recommend">
        <div>
            <span className="treat-name">治疗方案推荐：</span>
        </div>
        {
            dthis.diffLevelTreatments(treatments, index)
        }
    </div>;
};
class TreatMehods extends Component {
    state = {
        visible: false,
        name: '',
        desc: '',
        level: 1,
        tabType: ''
    }
    showModal = (name, desc) => {
        this.setState({
            visible: true,
            name,
            desc
        });
    }

    callback = key => {
        this.setState({
            level: key
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false
        });
    }

    diffLevelTreatments = (treatments, index) => {
        let levelSum = 0;
        treatments.map((treatment, index) => (
            levelSum += treatment.level
        ));
        let id = index;

        if (levelSum === 0) {
            return <div className="common-treatments">
                {
                    treatments.map((treatment, index) => {

                        const cthis = this;
                        // 手术方案
                        const drugLists = get(treatment, 'drugRecommends.list', []);
                        // 用药方案
                        const surgeryLists = get(treatment, 'surgeryRecommends.list', []);
                        return <Tabs defaultActiveKey="1">
                                {
                                    drugLists.length
                                        ? <TabPane tab="用药方案" key="1">{getDrugComponent('用药方案', treatment, id, cthis)}</TabPane>
                                        : ''
                                }
                                {
                                    surgeryLists.length
                                        ? <TabPane tab="手术方案" key="2">{getSurgerComponent('手术方案', treatment, id, cthis)}</TabPane>
                                        : ''
                                }
                            </Tabs>;
                    })
                }
            </div>;
        }
        return <Tabs
            defaultActiveKey="1"
            onChange={this.callback}
            type="card"
            className="treat-tab">
            {
                treatments.map((treatment, index) => {
                    const cthis = this;
                    // 手术方案
                    const drugLists = get(treatment, 'drugRecommends.list', []);
                    // 用药方案
                    const surgeryLists = get(treatment, 'surgeryRecommends.list', []);

                    return <TabPane tab={getTabs(treatment.level)} key={index + 1} level={treatment.level}>

                        <Tabs defaultActiveKey="1" className="second-tab">
                            {
                                drugLists.length
                                ? <TabPane tab="用药方案" key="1">{getDrugComponent('用药方案', treatment, id, cthis)}</TabPane>
                                : ''
                            }
                            {
                                surgeryLists.length
                                ? <TabPane tab="手术方案" key="2">{getSurgerComponent('手术方案', treatment, id, cthis)}</TabPane>
                                : ''
                            }
                        </Tabs>
                    </TabPane>;
                })
            }
        </Tabs>;
    }
    render() {
        const treatments = get(this.props, 'treatments', []);
        const index = get(this.props, 'index', 0);

        return (
            <div className="auxiliary-box">
                {
                    getTreatMehods(treatments, index, this)
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
