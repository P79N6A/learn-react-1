/**
* @file Tablelist 组件
 * @author lixiaoqin
 */

import React from 'react';

// 子组件
import CustomizedForm from './CustomizedForm';

export default class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {}
        };
    }

    handleFormChange = changedFields => {
        if (!changedFields) {
            return;
        }
        this.setState(({fields}) => ({
            fields: {...fields, ...changedFields}
        }));
    }

    render() {
        const fields = this.state.fields;
        console.log(this.props);
        return (
            <div className="emr-table">
                <CustomizedForm {...this.props} {...fields} onChange={this.handleFormChange}></CustomizedForm>
            </div >
        );
    }
}