/**
 * 调用接口名文件
 */
import {baseUrl} from './url'
import fetch from './fetch'
/**
 * 上传files图片
 *
 */
export const uploadGoodsImg = ()=>{return baseUrl+'/timestoremanage/storeCommodity/uploadImages'};
/**
 * 获取验证码
 */
export const getCode = () =>{return baseUrl+'/timestoremanage/common/captcha'};
/**
 * 用户登陆
 */
export const userLogin=(username,password,captcha) =>fetch('/timestoremanage/ajaxLogin',{
    userPhone:username,
    password:password,
    captcha:captcha
},'POST',true);
/**
 * 测试接口
 * @param username
 * @param password
 * @param captcha
 * @returns {Promise<*>}
 */
export const userLoginaaa=(username,password,captcha) =>fetch('/timestoremanage/storeCommodity/add',{
    userName:username,
    password:password,
    captcha:captcha
},'POST');
/**
 * 商户入驻申请
 * @param msgObj
 * @returns {Promise<*>}
 */
export const userRegister = (msgObj) =>fetch('/timestoremanage/register',{
    userName:msgObj.userName,
    password:msgObj.password,
    commercialType:msgObj.commercialType,
    commercialName:msgObj.commercialName,
    commercialIntroduction:msgObj.commercialIntroduction,
    linkPhone:msgObj.linkPhone,
    linkName:msgObj.linkName,
    bankNo:msgObj.bankNo,
    cardNo:msgObj.cardNo,
    cardFrontImgPath:msgObj.cardFrontImgPath,
    cardBackImgPath:msgObj.cardBackImgPath,
    creditCode:msgObj.creditCode,
    licenseImgPath:msgObj.licenseImgPath,
    otherImgPath:msgObj.otherImgPath
},'POST',true);

/**
 * 检验商户名是否可用
 * @param val
 * @returns {Promise<*>}
 */
export const checkUser = (val) =>fetch('/timestoremanage/common/queryUserNameOrCommercialName',val,'POST');

/**
 * 发送短信验证码
 * @param phone
 * @returns {Promise<*>}
 */
export const sendPhoneCode = (phone) =>fetch('/timestoremanage/common/forgotPasswordSendVcode',{
    phoneNum:phone
},'POST');


export const getUntreatedOrdersList = (pageNumber,pageSize,tenantUid,keyword) =>fetch('/timestoremanage/order/listStaySend',{
    pageNumber:pageNumber,
    pageSize:pageSize,
    tenantUid:tenantUid,
    keyword:keyword
},'POST');
/**
 * 获取首页默认地址
 */

export const testa = (pageNumber) => fetch('storeTimecoin/listTop', {
    pageNumber,
},'POST');

export const getList = () => fetch('', {user_id:getStorage('user_name')});
