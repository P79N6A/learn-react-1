/**
* @file Tablelist 组件
 * @author lixiaoqin
 */

import React from 'react';
import {Form} from 'antd';

import './index.less';

import FormList from './FormList.js';
export default Form.create({
    onFieldsChange(props, changedFields) {
    },
    mapPropsToFields(props) {
    }
})(FormList);
