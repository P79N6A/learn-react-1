/**
 * @file index.js
 * @author lixiaoqin@baidu.com
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import 'style/antd/antd.css';
import './index.less';
import image_error from '../../../style/img/image_error.png';

const getDetailContent = result => {
    if (!result || !result.length) {
        return '';
    }

    if (typeof (result) === 'string') {
        if (result === 'failure') {
            return <div className="no-recommend">
                <img src={image_error} />
                <p>加载错误</p>
            </div>;
        }
        if (result === 'requesting') {
            return <div>{result}</div>;
        }
    }
    return result.map((res, index) => {
        const content = res.content;
        if (!content || !content.length) {
            return '';
        }
        return <div key={index}>
            <div className="detail-title">{res.name}</div>
            {
                content.length && content.map((cont, index) => {
                    const currname = `detail-line line-${index}`;
                    return <div key={index} className="detail-content">
                        <div className="detail-class2">
                            <div className="detail-title2">{cont && cont['subtitle'] || ''}</div>
                            <span className={currname}></span>
                            <div className="display-linebreak">{cont && cont['value'] || ''}</div>
                        </div>
                    </div>;
                })
            }
        </div>;
    });
};

const changeLineWidth = result => {
    if (!result || !result.length || typeof (result) === 'string') {
        return '';
    }

    let parWidth = $('.detail-class2').width();

    return result.map((res, index) => {
        const content = res.content;
        content.length && content.map((cont, index) => {
            let newIndex = index + 2;
            let currWidth = $(`.detail-box .detail-content:nth-child(${newIndex}) .detail-title2`).width();
            let lineWidth = parWidth - currWidth - 10;
            $(`.line-${index}`).css('width', lineWidth);
        });
    });
};

class DetailArticle extends Component {
    componentDidMount() {
        const result = get(this.props, 'detail.result', null);

        // 初始化线的宽度
        changeLineWidth(result);

        // 监听窗口大小改变事件
        $(document).ready(function () {
            $(window).resize(function () {
                changeLineWidth(result);
            });
        });
    }

    render() {
        const result = get(this.props, 'detail.result', null);
        return (
            <div className="detail-box">
                {
                    getDetailContent(result)
                }
            </div>
        );
    }
}

DetailArticle.propTypes = {

};

DetailArticle.defaultProps = {
};

export default DetailArticle;
