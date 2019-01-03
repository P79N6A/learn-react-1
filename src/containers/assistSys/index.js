/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AssistSys from 'components/assistSys';
import get from 'lodash/get';
import {websocketConnect} from 'actions/wsConnect';
import {searchDetail} from 'actions/searchPlatform/detailRequest';
import {searchDisease, switchKey, saveQuery} from 'actions/searchPlatform/searchRequest';
import {sendEmrDetail} from 'actions/emrTable';

const mapStateToProps = state => {
    // const wsDatas = get(state, 'ws.wsResult', '{}');
    // const parseWsData = JSON.parse(wsDatas);
    // const {advice = null, alert = null, source = {}} = parseWsData;
    // const loadStatus = get(state, 'ws.loadStatus', '');

    const assistData = get(state, 'emr.result', '{}');
    // const assistData = {
    //     "code": 0,
    //     "message": "",
    //     "alert": {
    //         "data": {
    //             "errorNum": 1,
    //             "warningNum": 2,
    //             "risks": [{
    //                 "level": "error",
    //                 "message": "test胸部透视：患者为【孕妇】，此类检查应谨慎！",
    //                 "type": "medicalExam"
    //             }, {
    //                 "level": "warning",
    //                 "message": "XXX可能存在异常！",
    //                 "type": "medicalExam"
    //             }, {
    //                 "level": "warning",
    //                 "message": "XXX可能存在异常XXX可能存在异常XXX可能存在异常XXX可能存在异常XXX可能存在异常XXX可能存在异常XXX可能存在异常",
    //                 "type": "medicalExam"
    //             }]
    //         }
    //     },
    //     "advice": [
    //         {
    //             "auxiliaryDiagnosis": {
    //                 "sign": [{
    //                     "kgid": "Y018kb7dz",
    //                     "name": "两肺哮鸣音",
    //                     "selected": 1,
    //                     "polarity": 1
    //                 }, {
    //                     "kgid": "Y01ggj2z2",
    //                     "name": "三凹征",
    //                     "selected": 0,
    //                     "polarity": -1
    //                 }],
    //                 "symptom": [{
    //                     "kgid": "Y01h97_sm",
    //                     "name": "呼吸困难",
    //                     "selected": 1,
    //                     "polarity": 1
    //                 }, {
    //                     "kgid": "Y01mwxb41",
    //                     "name": "咳嗽",
    //                     "selected": 0,
    //                     "polarity": -1
    //                 }]
    //             },
    //             "differentialDiagnosis": [{
    //                 "kgid": "100001",
    //                 "desc": "推荐理由",
    //                 "name": "原发性支气管肺癌"
    //             }],
    //             "examRecommends": [{
    //                 "kgid": "100001",
    //                 "desc": "推荐理由",
    //                 "name": "皮肤点刺试验"
    //             }, {
    //                 "desc": "推荐理由",
    //                 "kgid": "100001",
    //                 "name": "胸部X线检查"
    //             }],
    //             "name": "支气管哮喘",
    //             "rate": 0.917,
    //             "kgid": "100001",
    //             "testRecommends": [{
    //                 "kgid": "",
    //                 "desc": "推荐理由",
    //                 "name": "痰涂片镜检"
    //             }],
    //             "treatments": [{
    //                 "drugRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [
    //                         {
    //                             "kgid": "",
    //                             "category": "青霉素类",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "kgid": "",
    //                             "category": "头孢类",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "kgid": "",
    //                             "category": "抗生素类",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "kgid": "",
    //                             "category": "中成药类",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "kgid": "",
    //                             "category": "放射性类",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         }

    //                     ]
    //                 },
    //                 "level": 1,
    //                 "surgeryRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "",
    //                         "name": "肺病损切除术111"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术111"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术111"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术111"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术111"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术111"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术111"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术111"
    //                     }]
    //                 }
    //             }, {
    //                 "drugRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "",
    //                         "method": "100~250μg/次，吸入，2次/日",
    //                         "name": "丙酸氟替卡松222"
    //                     }]
    //                 },
    //                 "level": 2,
    //                 "surgeryRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     }]
    //                 }
    //             }, {
    //                 "drugRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "100001",
    //                         "method": "100~250μg/次，吸入，2次/日",
    //                         "name": "丙酸氟替卡松333"
    //                     }]
    //                 },
    //                 "level": 3,
    //                 "surgeryRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "",
    //                         "name": "肺病损切除术333"
    //                     }]
    //                 }
    //             }]
    //         },
    //         {
    //             "auxiliaryDiagnosis": {
    //                 "sign": [{
    //                     "kgid": "Y018kb7dz",
    //                     "name": "两肺哮鸣音",
    //                     "selected": 1,
    //                     "polarity": 1
    //                 }, {
    //                     "kgid": "Y01ggj2z2",
    //                     "name": "三凹征",
    //                     "selected": 0,
    //                     "polarity": -1
    //                 }],
    //                 "symptom": [{
    //                     "kgid": "Y01h97_sm",
    //                     "name": "呼吸困难",
    //                     "selected": 1,
    //                     "polarity": 1
    //                 }, {
    //                     "kgid": "Y01mwxb41",
    //                     "name": "咳嗽",
    //                     "selected": 0,
    //                     "polarity": -1
    //                 }]
    //             },
    //             "differentialDiagnosis": [{
    //                 "kgid": "100001",
    //                 "desc": "推荐理由",
    //                 "name": "原发性支气管肺癌"
    //             }],
    //             "examRecommends": [{
    //                 "kgid": "100001",
    //                 "desc": "推荐理由",
    //                 "name": "皮肤点刺试验"
    //             }, {
    //                 "desc": "推荐理由",
    //                 "kgid": "100001",
    //                 "name": "胸部X线检查"
    //             }],
    //             "name": "肚子痛",
    //             "rate": 0.917,
    //             "kgid": "100001",
    //             "testRecommends": [{
    //                 "kgid": "",
    //                 "desc": "推荐理由",
    //                 "name": "痰涂片镜检"
    //             }],
    //             "treatments": [{
    //                 "drugRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [
    //                         {
    //                             "kgid": "",
    //                             "category": "青霉素类2",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "kgid": "",
    //                             "category": "头孢类2",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "kgid": "",
    //                             "category": "抗生素类2",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "kgid": "",
    //                             "category": "中成药类2",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             "kgid": "",
    //                             "category": "放射性类2",
    //                             "drugList": [
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日，3次/日",
    //                                     "name": "丙酸氟替卡松"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "100~250μg/次，吸入，2次/日",
    //                                     "name": "倍氯米松气雾剂"
    //                                 },
    //                                 {
    //                                     "kgid": "",
    //                                     "method": "0.2g/次，口服，2次/日",
    //                                     "name": "茶碱缓释片"
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 "level": 1,
    //                 "surgeryRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     },
    //                     {
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     }]
    //                 }
    //             }, {
    //                 "drugRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "",
    //                         "method": "100~250μg/次，吸入，2次/日",
    //                         "name": "丙酸氟替卡松222"
    //                     }]
    //                 },
    //                 "level": 2,
    //                 "surgeryRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "",
    //                         "name": "肺病损切除术222"
    //                     }]
    //                 }
    //             }, {
    //                 "drugRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "100001",
    //                         "method": "100~250μg/次，吸入，2次/日",
    //                         "name": "丙酸氟替卡松333"
    //                     }]
    //                 },
    //                 "level": 3,
    //                 "surgeryRecommends": {
    //                     "desc": "推荐理由",
    //                     "list": [{
    //                         "kgid": "",
    //                         "name": "肺病损切除术333"
    //                     }]
    //                 }
    //             }]
    //         }],
    //     "source": {
    //         "age": "61岁",
    //         "tentativeDiagnosis": "支气管哮喘,子宫内膜炎,肺炎",
    //         "personalHistory": "北京出生，北京居住。无不良嗜好",
    //         "familyHistory": "父母已故，兄妹、子女体健",
    //         "currentHistory": "患者于50年前开始无明显诱因出现发作性喘息、胸闷，当时症状不重，可自行缓解，未作任何诊治；20余年前症状开始加重，每次受凉后发作喘息伴咳嗽，经抗感染、激素（地塞米松）治疗后症状缓解，此后患者常于哮喘发作时自行口服“强的松”（泼尼松），每次2片，服用7～10天不等。入院前半个月症状加重，痰为黄白色、拉丝，难以咳出，胸闷，到当地医院治疗，予“氨茶碱、地塞米松”等药物治疗效果不好转我院。门诊胸片：右中下肺及左肺弥漫性斑片状影，边缘模糊，考虑“支气管哮喘，社区获得性肺炎”收住院。",
    //         "chiefComplaint": "反复发作性喘息50年，胸闷，哮鸣音",
    //         "allergenHistory": "对头孢类药物过敏",
    //         "medicalExams": "T　36.8℃，P　82次/分，R　25次/分，BP　105/78mmHg，SaO<sub>2</sub>90%。端坐呼吸，唇甲发绀，桶状胸，双肺满布哮鸣音，双下肺可闻及湿性啰音。心率82次/分、律齐，腹软，无压痛，肝脾肋下未扪及，双下肢不肿。\n",
    //         "medicalTests": "血常规示WBC　21.2×10<sup>9</sup>/L，中性粒细胞比值85.20%，淋巴细胞比值9.10%，Hb　121g/L，Pt　223×10<sup>9</sup>/L；大、小便常规，肾功能，电解质，血脂，免疫学检查正常。肝功能：总蛋白65.4g/L，白蛋白29.4g/L，球蛋白36g/L，余正常。血沉87mm/h；CRP 211mg/L；空腹血糖7.2mmol/L；餐后血糖18mmol/L，动脉血气：pH　7.467，PO<sub>2</sub> 60.9mmHg，PCO<sub>2</sub>43.1mmHg。"
    //     }
    // };

    const {advice = [], alert = {}, source = {}} = assistData;
    const loadStatus = get(state, 'emr.loadStatus', '');
    const pathName = get(state, 'searchDisease.name.pathName', '');
    return {
        advice,
        alert,
        source,
        loadStatus,
        pathName
    };
};

const mapDispatchToProps = {websocketConnect, searchDetail, searchDisease, switchKey, saveQuery, sendEmrDetail};

const ConnectedAssistSys = connect(mapStateToProps, mapDispatchToProps)(AssistSys);

ConnectedAssistSys.propTypes = {

};

ConnectedAssistSys.defaultProps = {
};

export default ConnectedAssistSys;
