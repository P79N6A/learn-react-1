/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    DatePicker,
    TimePicker,
    Select,
    Checkbox
} from 'antd';
import 'style/antd/antd.css';
import './index.less';

// const PATH_URL = process.env.REACT_APP_PATH_URL;
const PATH_URL = 'http://yq01-kg-log0.yq01:8700/v1/search/query/';
const FormItem = Form.Item;
const Option = Select.Option;
let schema = require('async-validator');
const formItemLayout = {
    labelCol: {
        lg: {span: 7},
        sm: {span: 9}
    },
    wrapperCol: {
        sm: {span: 15}
    }
};

const formItemLayout1 = {
    labelCol: {
        lg: {span: 7},
        sm: {span: 9}
    },
    wrapperCol: {
        sm: {span: 14}
    }
};

const formItemLayout3 = {
    labelCol: {
        lg: {span: 6},
        sm: {span: 10}
    },
    wrapperCol: {
        sm: {span: 14}
    }
};

const formItemLayout2 = {
    labelCol: {
        lg: {span: 6}, // >992px
        sm: {span: 8}
    },
    wrapperCol: {
        sm: {span: 15}
    }
};
const onChange = e => {
    console.log(`checked = ${e.target.checked}`);
};
// 校验年龄
const validateValue = value => {
    const reg = /^\d{0,3}$/;
    const ageFrom = value['age-from'];
    const ageTo = value['age-to'];

    if (!ageFrom || !ageTo) {
        return true;
    }
    if (!reg.test(ageFrom) || !reg.test(ageTo)) {
        console.log('年龄必须是数字');
        return false;
    }

    if (ageFrom > ageTo) {
        console.log('开始的数字必须小于结束的数字');
        return false;
    }

    return true;
};

const formatDate = date => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    m < 10 ? `0${m}` : m;
    d < 10 ? `0${d}` : d;
    return `${y}-${m}-${d}`;
};

const getcurrData = () => {
    const currDate = new Date();
    return formatDate(currDate);
};

const getLastWeek = () => {
    const currDate = new Date();
    const lastWeek = new Date(currDate - 7 * 24 * 3600 * 1000);
    return formatDate(lastWeek);
};

const getLastMonth = () => {
    const currDate = new Date();
    const lastMonth = new Date(currDate - 30 * 24 * 3600 * 1000);
    return formatDate(lastMonth);
};

const getLastYear = () => {
    const currDate = new Date();
    const lastYear = new Date(currDate - 365 * 24 * 3600 * 1000);
    return formatDate(lastYear);
};

const getDate = time => {
    switch (time) {
        case '一周内':
            return [getLastWeek(), getcurrData()];
        case '一个月内':
            return [getLastMonth(), getcurrData()];
        case '一年内':
            return [getLastYear(), getcurrData()];
        default:
            return [];
    }
};

const formatSex = sex => {
    return sex == '性别不限' ? '' : sex;
}

const formatDepartment = depart => {
    return depart == '全部科室' ? '' : depart;
}

const formatAge = ageRanage => {
    let ageStack = [];
    if (ageRanage[0] && ageRanage[1] && ageRanage[0] != 'undefined' && ageRanage[1] != 'undefined') {
        ageStack = ageRanage;
    }
    return ageStack;
}

class AdvanceSearch extends Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {

            if (!validateValue(fieldsValue)) {
                return;
            }
            const values = {
                ...fieldsValue,
                // 'date-picker': fieldsValue['date-picker'] && fieldsValue['date-picker'].format('YYYY-MM-DD'),
                'select-age': `${fieldsValue['age-from']}-${fieldsValue['age-to']}`
            };

            const dateRange = getDate(values['date-picker']);
            const ageRanage = values['select-age'].split('-');

            const advanceObj = {
                path: PATH_URL + 'emr',
                body: {
                    // query: this.props.queryName || '支气管哮喘',
                    query: this.props.queryName || '',
                    params: {
                        '就诊时间': dateRange,
                        '所属科室': formatDepartment(values['select-department']),
                        '性别': formatSex(values['select-sex']),
                        '年龄': formatAge(ageRanage)
                    }
                }
            };

            this.props.searchDisease(advanceObj);
        });
    }

    render() {
        const getFieldDecorator = this.props.form.getFieldDecorator;
        const config = {
            rules: []
        };
        const ageConfig = {
            rules: [{
                type: 'number',
                validator: (rule, value, callback) => {
                    let reg = /^\d{0,3}$/;
                    const min = 0;
                    const max = 100;
                    if (value && !reg.test(value)) {
                        callback('必须是数字');
                    } else if (value < min || value > max) {
                        callback('年龄范围出错');
                    }
                    callback();
                }
            }]
        };

        return (
            <div className="advance-search-box">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Row type="flex" justify="space-between">
                        <Col span={4} className="form-item">
                            <FormItem
                                label="就诊时间"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('date-picker', config)(
                                    <Select>
                                        <Option value="全部时间">全部时间</Option>
                                        <Option value="一周内">一周内</Option>
                                        <Option value="一个月内">一个月内</Option>
                                        <Option value="一年内">一年内</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4} className="form-item">
                            <FormItem
                                label="所在科室"
                                {...formItemLayout1}

                            >
                                {getFieldDecorator('select-department', config)(
                                    <Select>
                                        <Option value="全部科室">全部科室</Option>
                                        <Option value="妇科">妇科</Option>
                                        <Option value="呼吸科">呼吸科</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={3} className="form-item">
                            <FormItem
                                label="性别"
                                hasFeedback
                                validateStatus=""
                                {...formItemLayout3}

                            >
                                {getFieldDecorator('select-sex', config)(
                                    <Select>
                                        <Option value="性别不限">性别不限</Option>
                                        <Option value="男">男</Option>
                                        <Option value="女">女</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={3} className="form-item">
                            <FormItem
                                label="年龄"
                                {...formItemLayout2}
                            >
                                <Col span={10}>
                                    <FormItem>
                                        {getFieldDecorator('age-from', ageConfig)(
                                            <Input />
                                        )}
                                    </FormItem>

                                </Col>
                                <Col span={2}>
                                    <span>-</span>
                                </Col>
                                <Col span={10}>
                                    <FormItem>
                                        {getFieldDecorator('age-to', ageConfig)(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </FormItem>
                        </Col>
                        {/* <Col span={3}>
                            {getFieldDecorator('is-first-diagnose', config)(
                                <Checkbox onChange={onChange} className="check-box">仅显示首诊</Checkbox>
                            )}
                        </Col> */}
                        <Col span={4}>
                            <Button htmlType="submit">确定</Button>
                        </Col>

                    </Row>
                </Form>
            </div>
        );
    }
}
const AdvanceRelatedForm = Form.create()(AdvanceSearch);

AdvanceRelatedForm.propTypes = {

};

AdvanceRelatedForm.defaultProps = {
};

export default AdvanceRelatedForm;
