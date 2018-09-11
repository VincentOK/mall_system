/**
 * 调用接口名文件
 */
import { baseUrl } from './url'
import fetch from './fetch'
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
/**
 * 获取验证码
 */
export const getCode = () => { return baseUrl + '/timestoremanage/common/captcha' };
/**
 * 用户登陆
 */
export const userLogin = (username, password, captcha) => fetch('/timestoremanage/ajaxLogin', {
    userName: username,
    password: password,
    captcha: captcha
}, 'POST', true);

export const userLoginaaa = (username, password, captcha) => fetch('/timestoremanage/storeCommodity/add', {
    userName: username,
    password: password,
    captcha: captcha
}, 'POST', token, 'multipart/form-data;');

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
    payType: param.payType,
    salesReturn: param.salesReturn,
    invoice: param.invoice,
    invoiceType: param.invoiceType,
    detail: param.detail,
    promotion: param.promotion,
    images: param.images
        // param: param
}, 'POST');

// 新增商品图片上传
export const uploadImages = (files) => fetch('/timestoremanage/storeCommodity/uploadImages', {
    files: files,
}, 'POST');



/**
 * 线上商品管理
 */

//出售中列表
export const listSell = (pageNumber, pageSize, tenantUid, startTime, endTime, keyword) => fetch('/timestoremanage/storeCommodity/listSell', {
    pageNumber: pageNumber,
    pageSize: pageSize,
    tenantUid: tenantUid,
    startTime: startTime,
    endTime: endTime,
    keyword: keyword
}, 'POST');

//出售中/已下架商品详情
export const storeCommodityDetail = (commodityId) => fetch('/timestoremanage/storeCommodity/detail', {
    commodityId: commodityId
}, 'POST');

//下架
export const soldOut = (commodityId) => fetch('/timestoremanage/storeCommodity/soldOut', {
    commodityId: commodityId
}, 'POST');

//编辑
export const edit = (commodityId, realityPrice, suggestPrice, inventory) => fetch('/timestoremanage/storeCommodity/edit', {
    commodityId: commodityId,
    realityPrice: realityPrice,
    suggestPrice: suggestPrice,
    inventory: inventory
}, 'POST');

//已下架商品列表
export const listSoldOut = (tenantUid, startTime, endTime, keyword, sort) => fetch('/timestoremanage/storeCommodity/listSoldOut', {
    tenantUid: tenantUid,
    startTime: startTime,
    endTime: endTime,
    keyword: keyword,
    sort: sort
}, 'POST');

//审核中商品列表接口
export const listCheck = (pageNumber, pageSize, tenantUid, startTime, endTime, keyword) => fetch('/timestoremanage/storeCommodity/listCheck', {
    pageNumber: pageNumber,
    pageSize: pageSize,
    tenantUid: tenantUid,
    startTime: startTime,
    endTime: endTime,
    keyword: keyword
}, 'POST');

//审核中商品详情接口
export const getCheckDetail = (commodityId) => fetch('/timestoremanage/storeCommodity/getCheckDetail', {
    commodityId: commodityId
}, 'POST');