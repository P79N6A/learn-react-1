
/**
 * @file index.js
 * @author fengdanping@baidu.com
 */

import React, {Component} from 'react';
import './index.less';

class Disclaimer extends Component {
    render() {
        return <div className="disclaimer-wrapper">
                    <div className="content">
                        <div className="title">免责声明</div>

                        <div className="text">
                            <p>1.用户同意使用本临床辅助决策支持系统及其相关服务（以下简称“本产品”）是出于用户个人的意愿，同时表明用户凡
                                以任何方式登陆本产品或直接、间接使用本产品服务或资料者，则表明完全理解并接受本免责声明的全部内容。</p>
                            <p>2.用户保证及承诺拥有所有必需的法定资质、权利、 能力和授权使用本产品及服务并履行相应义务，遵守所有适用
                                的法律。</p>
                            <p>3.本产品基于用户提供的真实准确信息为依据，仅为用户诊断提供相关建议。本产品提供的一切建议不能作为诊断及
                                医疗的依据，仅供用户在诊疗过程中参考使用，诊疗过程中最终决定权属于用户。我们对本产品提出的任何建议导致的
                                后果（包括但不限于误诊、错诊、医疗事故等）不承担任何法律责任。除非另有明确的书面说明，我们不对由于使用本
                                产品或服务引起的任何损害承担责任（除非根据中国法律应承担责任的以外），包括但不限于直接、间接或附带的惩罚
                                性和结果性损害赔偿。</p>
                            <p>4.我们将根据相关法律法规和行业标准严格对患者信息严格保密，未经书面同意我们不会将患者信息及与本产品进行数
                                据交互的非公开内容提供给第三方（公司或个人），但以下情况除外：</p>
                            <p className="second-level">一、 相关法律法规或监管机构、司法机构要求提供用户的个人资料；</p>
                            <p className="second-level">二、国家司法机关符合法律规定并经法定程序的检查及其他操作；</p>
                            <p className="second-level">三、任何第三方盗用、冒用或未经许可擅自披露、使用或对外公开的情况；</p>
                            <p>5.本产品及服务所包含或提供的所有内容诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据
                                编辑和软件都是我们或其内容提供者的财产，受中国和国际版权法的保护。未经产品权利人同意，用户不得将上述资
                                料在任何媒介（包括但不限于媒体、网络、报纸、杂志等）直接或间接发布、播放或被用于其它任何商业目的。</p>
                            <p>6.违反者必须销毁任何已经取得的上述信息、资料、软件或产品，同时，我们保留采用技术、行政及法律手段挽回损失
                                的权利，并可依照有关法律规定和产品相关规定，追究其行政或民事责任，情节严重的，还将提请司法机关追究刑事责
                                任。我们有权要求违反者赔偿我们所受到的任何实际损失。</p>
                            <p>7. 本产品如因系统维护或升级而需暂停服务时，将事先告知。若因线路及非本公司控制范围外的硬件故障或其它不可
                                抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，本产品不负任何责任。</p>
                            <p>8. 除非另有明确的书面说明，我们不对本产品和服务的运营及包含在本网站上的信息、内容、材料、软件或服务作任
                                何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的除外）；用户明确同意自担风险使用本
                                产品及服务。</p>
                            <p>9. 本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。</p>
                            <p>10. 本产品之声明以及其修改权、更新权及最终解释权均属本产品所有。我们有权随时更新本免责声明，并只需在本
                                产品上发布即生效，用户应当定期查阅本条款。</p>
                        </div>
                    </div>
                </div>;
    }
}

Disclaimer.propTypes = {

};

Disclaimer.defaultProps = {
};

export default Disclaimer;
