/**
* @file Tablelist 组件
 * @author lixiaoqin
 */
/*eslint-disable*/

import React from 'react';
import _ from 'lodash';
import {
    Form, Select, Input, InputNumber, Switch, Radio, Slider,
    Button, Upload, Icon, Rate, Row, Col, Checkbox
} from 'antd';
import './index.less';
// const CDSS_PATH_URL = process.env.REACT_APP_EMR_PATH_URL;
const CDSS_PATH_URL = "http://yq01-yexianyi.epc.baidu.com:8080/medical-cdss/api/v1/analyze";

// const UUID = process.uuid;
// const UUID = +new Date();
console.log(window.UUID);

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {TextArea} = Input;

const formItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};
const buttonItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 30},
};
const emrAgeItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 16},
};
const pregnantItemLayout = {
    labelCol: {span: 0},
    wrapperCol: {span: 5},
};
const addressItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 21},
}
const mainItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 22},
}

function getLayout(layout) {
    let itemLayout = formItemLayout;
    switch (layout) {
        case 'address':
            itemLayout = addressItemLayout;
            break;
        case 'main':
            itemLayout = mainItemLayout;
            break;

        default:
            itemLayout = formItemLayout;
            break;
    }
    return itemLayout;
}
const FormInput = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    const initialValue = props.initialValue;
    const id = props.id;
    const label = props.label;
    const clName = props.clName || '';
    const itemLayout = getLayout(props.layout);
    const idList = ['nowHistory', 'pastHistory', 'checkBody', 'assistCheckBody', 'drugDiagnose'];
    function getDomEle(idList, id) {
        return idList.indexOf(id) === -1 ? <Input className={clName} /> : <TextArea rows={1} className={clName} />
    }
    const domEle = getDomEle(idList, id);
    return <FormItem
        {...itemLayout}
        label={label}
    >
        {getFieldDecorator(id, {
            initialValue,
            onChange: props.onChange,

        })(
            domEle
            )}
        {props.layout == 'age' ? <span>岁</span> : ''}
    </FormItem>
}
const FormSelect = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;

    return <FormItem
        {...formItemLayout}
        label="科室"
    >
        {getFieldDecorator('department', {
            initialValue: '呼吸内科',
            onChange: props.onChange,

        })(
            <Select placeholder="">
                <Option value="呼吸内科">呼吸内科</Option>
                <Option value="妇科">妇科</Option>
            </Select>
            )}
    </FormItem>
}
const FormSex = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;

    return <FormItem
        {...emrAgeItemLayout}
        label="性别"
    >
        {getFieldDecorator('sex', {
            initialValue: '男',
            onChange: props.onChange,

        })(
            <Select placeholder="" className='sex-select'>
                <Option value="男">男</Option>
                <Option value="女">女</Option>
            </Select>)}
    </FormItem>
}
const FormPregnant = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    return <FormItem
        {...pregnantItemLayout}
        className="pregnant-row"
    >
        {getFieldDecorator('pregnant', {
            valuePropName: 'checked'
        })(
            <Checkbox >孕妇</Checkbox>)}
    </FormItem>
}
const FormCom1 = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    return <div className='flex-wrap'>
        <FormSelect {...props}></FormSelect>
        <FormInput {...props} label='病历分类' initialValue='入院记录' id='classify'></FormInput>
        <FormItem
            {...buttonItemLayout}
        >

        </FormItem>
        <FormItem
            {...formItemLayout}
        >
        </FormItem>
    </div>
}
const FormCom2 = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    return <div className='flex-wrap'>
        <FormInput {...props} label='患者 ID' initialValue='88888888' id='patientID'></FormInput>
        <FormInput {...props} label='姓名' initialValue='李四' id='name'></FormInput>
        <FormInput {...props} label='年龄' initialValue='61' id='age' layout='age' clName='age-input'></FormInput>
        <FormSex {...props}></FormSex>
        <FormPregnant {...props}></FormPregnant>
    </div>
}
const FormCom3 = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    return <div className='flex-wrap  flex-less'>
        <FormInput {...props} label='电话' initialValue='13800138000' id='phone'></FormInput>
        <FormInput {...props} label='地址' initialValue='北京市海淀区西北旺路' id='address' layout='address'></FormInput>
    </div>
}
const FormCom4 = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    return <div className='flex-wrap'>
        <FormInput {...props} label='主诉' initialValue='' id='mainSuit' clName='main-input' layout='main'></FormInput>
    </div>
}
const FormCom5 = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    return <div className='flex-wrap'>
        <FormInput {...props} label='现病史' initialValue='' id='nowHistory' clName='main-input his-input' layout='main'></FormInput>
    </div>
}
const FormCom6 = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    return <div className='flex-wrap'>
        <FormInput {...props} label='即往史' initialValue='' id='pastHistory' clName='main-input his-input' layout='main'></FormInput>
    </div>
}
const FormCom8 = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    return <div className='flex-wrap'>
        <FormInput {...props} label='过敏史' initialValue='' id='allergenHistory' clName='main-input' layout='main'></FormInput>
    </div>
}

const FormCom7 = (props) => {
    const {getFieldDecorator} = props.getFieldDecorator;
    // return <div className='flex-wrap emr-table'>
    return <div className='flex-wrap'>
        <div className='flex-left-wrap'>
            <FormInput {...props} label='个人史' initialValue='' id='manHistory' clName='main-input' layout='main'></FormInput>
            <FormInput {...props} label='家族史' initialValue='' id='familyHistory' clName='main-input' layout='main'></FormInput>
            <FormInput {...props} label='婚育史' initialValue='' id='marryHistory' clName='main-input' layout='main'></FormInput>
            <FormInput {...props} label='体格检查' initialValue='' id='checkBody' clName='main-input' layout='main'></FormInput>
            <FormInput {...props} label='辅助检查' initialValue='' id='assistCheckBody' clName='main-input' layout='main'></FormInput>
            <FormInput {...props} label='初步诊断' initialValue='' id='initDiagnose' clName='main-input' layout='main'></FormInput>
            <FormInput {...props} label='鉴别诊断' initialValue='' id='distDiagnose' clName='main-input' layout='main'></FormInput>
            <FormInput {...props} label='医嘱检查' initialValue='' id='checkDiagnose' clName='main-input' layout='main'></FormInput>
            <FormInput {...props} label='医嘱检验' initialValue='' id='testDiagnose' clName='main-input' layout='main'></FormInput>
            <FormInput {...props} label='医嘱用药' initialValue='' id='drugDiagnose' clName='main-input' layout='main'></FormInput>
        </div>
    </div>
}

class FormList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'inline',
            value: ''
        };
    }

    sendRequest = (changeFieldsValue) => {
        console.log('changeFieldsValue', changeFieldsValue);
        this.props.sendEmrDetail({
            // path: CDSS_PATH_URL + '?MAC_ADDR=' + 22,
            path: CDSS_PATH_URL,
            body: changeFieldsValue
        });
    }

    handleDebounced = _.debounce(function () {
        const changeFieldsValue = this.props.form.getFieldsValue();
        localStorage.setItem('changeFieldsValue', JSON.stringify(changeFieldsValue));
        this.sendRequest(changeFieldsValue);
        console.log(changeFieldsValue);
    }, 500);

    handleChange = e => {
        if (e.target) {
            const value = e.target.value;
            const ID = e.target.id;
            console.log(value + '-------' + ID);
        }
        this.handleDebounced();
    }
    render() {
        const {formLayout} = this.state;

        return (
            <Form onSubmit={this.handleSubmit} layout={formLayout}>
                <FormCom1 getFieldDecorator={this.props.form} onChange={this.handleChange}></FormCom1>
                <FormCom2 getFieldDecorator={this.props.form} onChange={this.handleChange}></FormCom2>
                <FormCom3 getFieldDecorator={this.props.form} onChange={this.handleChange}></FormCom3>
                <FormCom4 getFieldDecorator={this.props.form} onChange={this.handleChange}></FormCom4>

                <FormCom5 getFieldDecorator={this.props.form} onChange={this.handleChange}></FormCom5>
                <FormCom6 getFieldDecorator={this.props.form} onChange={this.handleChange}></FormCom6>
                <FormCom8 getFieldDecorator={this.props.form} onChange={this.handleChange}></FormCom8>

                <FormCom7 getFieldDecorator={this.props.form} onChange={this.handleChange}></FormCom7>
            </Form >
        );
    }
}

export default FormList;