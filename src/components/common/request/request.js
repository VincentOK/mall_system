/**
 * 调用接口名文件
 */
import { baseUrl } from './url'
import fetch from './fetch'
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { getStorage } from "../commonJS/localStorage";
import { Decrypt } from "../commonJS/secert";
let token = null;
if (getStorage('token')) {
    try {
        token = Decrypt(getStorage('token'));
    } catch (e) {
        alert('token值不存在')
    }
}
=======
>>>>>>> e07e4d39ee7c1353f1e33353975e161272c898f6
/**
 * 上传files图片
 *
 */
<<<<<<< HEAD
export const uploadGoodsImg = () => { return baseUrl + '/timestoremanage/storeCommodity/uploadImages' };
=======
export const uploadGoodsImg = ()=>{return baseUrl+'/timestoremanage/storeCommodity/uploadImages'};
>>>>>>> fb18fba0fd4218481623ea32aadeb5aec61de24d
>>>>>>> e07e4d39ee7c1353f1e33353975e161272c898f6
/**
 * 获取验证码
 */
export const getCode = () => { return baseUrl + '/timestoremanage/common/captcha' };
/**
 * 用户登陆
 */
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> e07e4d39ee7c1353f1e33353975e161272c898f6
export const userLogin = (username, password, captcha) => fetch('/timestoremanage/ajaxLogin', {
    userPhone: username,
    password: password,
    captcha: captcha
}, 'POST', true);
<<<<<<< HEAD
=======

export const userLoginaaa = (username, password, captcha) => fetch('/timestoremanage/storeCommodity/add', {
    userName: username,
    password: password,
    captcha: captcha
}, 'POST', token, 'multipart/form-data;');
=======
export const userLogin=(username,password,captcha) =>fetch('/timestoremanage/ajaxLogin',{
    userPhone:username,
    password:password,
    captcha:captcha
},'POST',true);
>>>>>>> e07e4d39ee7c1353f1e33353975e161272c898f6
/**
 * 测试接口
 * @param username
 * @param password
 * @param captcha
 * @returns {Promise<*>}
 */
export const userLoginaaa = (username, password, captcha) => fetch('/timestoremanage/storeCommodity/add', {
    userName: username,
    password: password,
    captcha: captcha
}, 'POST');
/**
 * 商户入驻申请
 * @param msgObj
 * @returns {Promise<*>}
 */
<<<<<<< HEAD
export const userRegister = (msgObj) => fetch('/timestoremanage/register', {
    userName: msgObj.userName,
    password: msgObj.password,
    commercialType: msgObj.commercialType,
    commercialName: msgObj.commercialName,
    commercialIntroduction: msgObj.commercialIntroduction,
    linkPhone: msgObj.linkPhone,
    linkName: msgObj.linkName,
    bankNo: msgObj.bankNo,
    cardNo: msgObj.cardNo,
    cardFrontImgPath: msgObj.cardFrontImgPath,
    cardBackImgPath: msgObj.cardBackImgPath,
    creditCode: msgObj.creditCode,
    licenseImgPath: msgObj.licenseImgPath,
    otherImgPath: msgObj.otherImgPath
}, 'POST', true);
=======
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
>>>>>>> fb18fba0fd4218481623ea32aadeb5aec61de24d
>>>>>>> e07e4d39ee7c1353f1e33353975e161272c898f6

/**
 * 检验商户名是否可用
 * @param val
 * @returns {Promise<*>}
 */
export const checkUser = (val) => fetch('/timestoremanage/common/queryUserNameOrCommercialName', val, 'POST');

/**
 * 发送短信验证码
 * @param phone
 * @returns {Promise<*>}
 */
export const sendPhoneCode = (phone) => fetch('/timestoremanage/common/forgotPasswordSendVcode', {
    phoneNum: phone
}, 'POST');


export const getUntreatedOrdersList = (pageNumber, pageSize, tenantUid, keyword) => fetch('/timestoremanage/order/listStaySend', {
    pageNumber: pageNumber,
    pageSize: pageSize,
    tenantUid: tenantUid,
    keyword: keyword
}, 'POST');
/**
 * 获取首页默认地址
 */

export const testa = (pageNumber) => fetch('storeTimecoin/listTop', {
    pageNumber,
}, 'POST');

export const getList = () => fetch('', { user_id: getStorage('user_name') });


/**
 * 商品管理
 */

//新增商品
export const addStoreCommodity = (param) => fetch('/timestoremanage/storeCommodity/add', {
    commodityName: param.commodityName,
    unit: param.unit,
    realityPrice: param.realityPrice,
    suggestPrice: param.suggestPrice,
    inventory: param.inventory,
    carriage: param.carriage,
    payList: param.payType,
    salesReturn: param.salesReturn,
    invoice: param.invoice,
    invoiceList: param.invoiceType,
    detail: param.detail,
    promotion: param.promotion,
    imageList: param.imageList
}, 'POST', true);

// 新增商品图片上传
export const uploadImages = (files) => fetch('/timestoremanage/storeCommodity/uploadImages', {
    files: files,
}, 'POST', false);
//支付方式列表
export const payTypeList = () => fetch('/timestoremanage/payType/list', {}, 'POST', false);

//发票列表
export const invoiceList = () => fetch('/timestoremanage/invoice/list', {}, 'POST', false);


/**
 * 线上商品管理
 */

//出售中列表
export const listSell = (param) => fetch('/timestoremanage/storeCommodity/listSell', {
    pageNumber: param.pageNumber,
    pageSize: param.pageSize,
    tenantUid: param.tenantUid,
    startTime: param.startTime,
    endTime: param.endTime,
    keyword: param.keyword
}, 'POST', true);

//出售中/已下架商品详情
export const storeCommodityDetail = (commodityId) => fetch('/timestoremanage/storeCommodity/detail', {
    commodityId: commodityId
}, 'POST', true);

//下架
export const soldOut = (commodityId) => fetch('/timestoremanage/storeCommodity/soldOut', {
    commodityId: commodityId
}, 'POST', true);

//编辑
export const edit = (param) => fetch('/timestoremanage/storeCommodity/edit', {
    commodityId: param.commodityId,
    realityPrice: param.realityPrice,
    suggestPrice: param.suggestPrice,
    inventory: param.inventory
}, 'POST', true);

//已下架商品列表
export const listSoldOut = (param) => fetch('/timestoremanage/storeCommodity/listSoldOut', {
    pageNumber: param.pageNumber,
    pageSize: param.pageSize,
    tenantUid: param.tenantUid,
    startTime: param.startTime,
    endTime: param.endTime,
    keyword: param.keyword,
    sort: param.sort
}, 'POST', true);

//审核中商品列表接口
export const listCheck = (param) => fetch('/timestoremanage/storeCommodity/listCheck', {
    pageNumber: param.pageNumber,
    pageSize: param.pageSize,
    tenantUid: param.tenantUid,
    startTime: param.startTime,
    endTime: param.endTime,
    keyword: param.keyword
}, 'POST', true);

//审核中商品详情接口
export const getCheckDetail = (commodityId) => fetch('/timestoremanage/storeCommodity/getCheckDetail', {
    commodityId: commodityId
}, 'POST', false);


/**
 * 资产管理
 */

//收益统计与结算
export const countEarnings = (tenantUid) => fetch('/timestoremanage/account/countEarnings', {
    tenantUid: tenantUid
}, 'POST', true);

//结算申请预览
export const settlementApplication = (tenantUid, price) => fetch('/timestoremanage/account/settlementApplication', {
    tenantUid: tenantUid,
    price: price
}, 'POST', true);