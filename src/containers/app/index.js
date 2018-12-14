/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';
import AssistSys from '../assistSys';
import EmrTable from '../emrTable';

export default class App extends Component {
    render() {
        return (
            <div>
                <EmrTable></EmrTable>
                <AssistSys></AssistSys>
            </div>
        );
    }
}

App.propTypes = {

};

App.defaultProps = {

};
