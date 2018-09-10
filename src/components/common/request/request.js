/**
 * 调用接口名文件
 */
import fetch from './fetch'
import {getStorage} from "../commonJS/localStorage";

/**
 * 获取验证码
 */
export const getCode = () =>fetch('/timestoremanage/common/captcha');
/**
 * 用户登陆
 */
export const userLogin=(username,password,captcha) =>fetch('/timestoremanage/ajaxLogin',{
    userName:username,
    password:password,
    captcha:captcha
},'POST');

export const userLoginaaa=(username,password,captcha) =>fetch('/timestoremanage/storeCommodity/add',{
    userName:username,
    password:password,
    captcha:captcha
},'POST',{header: {'Authorization': getStorage('token')}});

/**
 * 获取首页默认地址
 */

export const testa = (pageNumber) => fetch('storeTimecoin/listTop', {
    pageNumber,
},'POST');

export const getList = () => fetch('', {user_id:getStorage('user_name')});
