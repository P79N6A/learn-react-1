/**
 * @file emr table
 * @author lixiaoqin
 */

import React from 'react';
import {connect} from 'react-redux';
import TableList from 'components/tableList';
import {sendEmrDetail} from 'actions/emrTable';
class Tables extends React.Component {
    constructor(props, context) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <TableList {...this.props} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log(state);
    return {
    };
}
export default connect(mapStateToProps, {sendEmrDetail})(Tables);