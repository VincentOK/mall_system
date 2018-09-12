/**
 * 调用接口名文件
 */
import { baseUrl } from './url'
import fetch from './fetch'
/**
 * 上传files图片
 *
 */
export const uploadGoodsImg = (file) => fetch('/timestoremanage/storeCommodity/uploadImages', {
    file: file
}, 'POST', true);
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
}, 'POST', false);

//下架
export const soldOut = (commodityId) => fetch('/timestoremanage/storeCommodity/soldOut', {
    commodityId: commodityId
}, 'POST', false);

//编辑
export const edit = (param) => fetch('/timestoremanage/storeCommodity/edit', {
    commodityId: param.commodityId,
    realityPrice: param.realityPrice,
    suggestPrice: param.suggestPrice,
    inventory: param.inventory
}, 'POST', false);

//已下架商品列表
export const listSoldOut = (param) => fetch('/timestoremanage/storeCommodity/listSoldOut', {
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