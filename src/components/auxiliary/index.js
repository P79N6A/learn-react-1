/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import $ from 'zepto';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import './index.less';
const getAuxiliaryContent = (name, auxis) => {
    if (!auxis || !auxis.length) {
        return '';
    }
    return <div className="recommend-bar">
        <span className="name">{name}：</span>
        <div className="auxi-wrapper">
            {auxis.map((auxi, index) => {
                const {name, polarity} = auxi;
                const getClassName = polarity => {
                    let polaritys = '';
                    switch (polarity) {
                        case -1:
                            polaritys = 'grayPolarity';
                            break;
                        case 1:
                            polaritys = 'yelllowPolarity';
                            break;
                        default:
                            polaritys = '';
                            break;
                    }
                    return polaritys + ' auxi-name';
                };
                return <div>
                    <span key={index} className={getClassName(polarity)}
                        data-clipboard-text={name}>{name}</span>
                </div>;
            })}
        </div>
    </div>;
};

class AuxiliaryContent extends Component {

    render() {
        const {symptom, sign} = this.props;
        return (
            <div className="auxiliary-box">
                {
                    getAuxiliaryContent('症状', symptom)
                }
                {
                    getAuxiliaryContent('体征', sign)

                }
                {/* <span className="copied">已复制</span> */}
            </div>
        );
    }
}

AuxiliaryContent.propTypes = {

};

AuxiliaryContent.defaultProps = {
};

export default AuxiliaryContent;
