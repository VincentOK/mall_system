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
 * 新增商品
 */

export const addStoreCommodity = (param) => fetch('/timestoremanage/storeCommodity/add', {
    // commodityName: param.commodityName,
    // unit: param.unit,
    // realityPrice: param.realityPrice,
    // suggestPrice: param.suggestPrice,
    // inventory: param.inventory,
    // carriage: param.carriage,
    // payType: param.payType,
    // salesReturn: param.salesReturn,
    // invoice: param.invoice,
    // invoiceType: param.invoiceType,
    // detail: param.detail,
    // promotion: param.promotion,
    // images: param.images
    param: param
}, 'POST');