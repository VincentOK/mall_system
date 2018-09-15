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
 * 获取图形验证码
 * @returns {string}
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
export const userRegister = (msgObj) =>fetch('/timestoremanage/register',msgObj,'POST',true);

/**
 * 检验商户名是否可用
 * @param val
 * @returns {Promise<*>}
 */
export const checkUser = (val) =>fetch('/timestoremanage/common/queryUserNameOrCommercialName',val,'POST');

/**
 * 商户注册发送短信验证码
 * @param phone
 * @returns {Promise<*>}
 */
export const sendPhoneCode = (phone) =>fetch('/timestoremanage/common/regSendVcode',{
    userPhone:phone
},'POST');

/**
 * 忘记密码发送短信验证码
 * @param phone
 * @returns {Promise<*>}
 */
export const forgetPhoneCode = (phone) =>fetch('/timestoremanage/common/forgotPasswordSendVcode',{
    userPhone:phone
},'POST');


/**
 * 获取待发货列表
 * @param pageNumber
 * @param pageSize
 * @param tenantUid
 * @param keyword
 * @returns {Promise<*>}
 */
export const getUntreatedOrdersList = (pageNumber,pageSize,tenantUid,keyword) =>fetch('/timestoremanage/order/listStaySend',{
    pageNumber:pageNumber,
    pageSize:pageSize,
    tenantUid:tenantUid,
    keyword:keyword
},'POST',true);
/**
 * 根据订单号获取订单详情(待发货订单)
 * @param orderNumber
 * @returns {Promise<*>}
 */
export const orderDetail = (orderNumber) =>fetch('/timestoremanage/order/getStaySendOrderDetail',{
    orderNumber:orderNumber
},'POST',true);

/**
 * 确认发货
 * @param orderNumber 订单号
 * @param logisticsName 快递公司
 * @param logisticsNumber 快递单号
 * @returns {Promise<*>}
 * @constructor
 */
export const ConfirmDelivery = (form) =>fetch('/timestoremanage/order/confrimSend',{
    orderNumber:form.ordernumber,
    logisticsName:form.logisticsName,
    logisticsNumber:form.logisticsNumber
},'POST',true);

/**
 * 拒绝发货
 * @param form
 * @returns {Promise<*>}
 * @constructor
 */
export const RefuseDelivery = (form) =>fetch('/timestoremanage/order/noSend',{
    orderNumber:form.orderNumber,
    reason:form.surereason
},'POST',true);
/**
 * 获取待退款列表
 * @param pageNumber  页码
 * @param pageSize  每页行数
 * @param tenantUid 商户id
 * @returns {Promise<*>}
 */
export const listRefund = (pageNumber,pageSize,tenantUid) =>fetch('/timestoremanage/order/listRefund',{
    pageNumber:pageNumber,
    pageSize:pageSize,
    tenantUid:tenantUid
},'POST',true);

/**
 * 同意退款
 * @param form
 * @returns {Promise<*>}
 */
export const confrimRefund = (form) =>fetch('/timestoremanage/order/confrimRefund',{
    uid:form.uid,
    shippingName:form.shippingName,
    shippingPhone:form.shippingPhone,
    shippingAddress:form.shippingAddress,
    detailAddress:form.detailAddress,
},'POST',true);

/**
 * 获取已处理订单列表
 * @param pageNumber
 * @param pageSize
 * @param tenantUid
 * @param keyword
 * @param orderStatus
 * @returns {Promise<*>}
 */
export const listRefundOrder =(pageNumber,pageSize,tenantUid,keyword,orderStatus) =>fetch('/timestoremanage/order/listRefundOrder',{
    pageNumber:pageNumber,
    pageSize:pageSize,
    tenantUid:tenantUid,
    keyword:keyword,
    orderStatus:orderStatus
},'POST',true);

/**
 * 获取待退款订单详情
 * @param orderNumber
 * @returns {Promise<*>}
 */
export const orderDetailrefund = (orderNumber) =>fetch('/timestoremanage/order/getRefundDetail',{
    orderNumber:orderNumber
},'POST',true);
/**
 * 已发货订单详情
 * @param orderNumber
 * @returns {Promise<*>}
 */
export const getShippedSend = (orderNumber) =>fetch('/timestoremanage/order/getShippedSend',{
    orderNumber:orderNumber
},'POST',true);

/**
 * 已拒绝发货订单详情
 * @param orderNumber
 * @returns {Promise<*>}
 */
export const getNoSendDetail = (orderNumber) =>fetch('/timestoremanage/order/getNoSendDetail',{
    orderNumber:orderNumber
},'POST',true);

/**
 * 忘记密码提交修改
 * @param params
 * @returns {Promise<*>}
 */
export const forgotPasswordSubmit = (params) =>fetch('/timestoremanage/common/forgotPasswordSubmit',{
        userPhone:params.userPhone,
        captcha:params.captcha,
        newPassWord:params.password
},'POST',true);
/**
 * 退出登录
 * @type {Promise<*>}
 */
export const loginout = ()=>fetch('/timestoremanage/sysUser/logout',{},'POST');
