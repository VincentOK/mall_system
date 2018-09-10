/**
 * 调用接口名文件
 */
import {baseUrl} from './url'
import fetch from './fetch'
import {getStorage} from "../commonJS/localStorage";
import { Decrypt } from "../commonJS/secert";
let token = null;
if(getStorage('token')){
    try {
        token = Decrypt(getStorage('token'));
    }catch (e) {
        alert('token值不存在')
    }
}
/**
 * 获取验证码
 */
export const getCode = () =>{return baseUrl+'/timestoremanage/common/captcha'};
/**
 * 用户登陆
 */
export const userLogin=(username,password,captcha) =>fetch('/timestoremanage/ajaxLogin',{
    userName:username,
    password:password,
    captcha:captcha
},'POST',true);

export const userLoginaaa=(username,password,captcha) =>fetch('/timestoremanage/storeCommodity/add',{
    userName:username,
    password:password,
    captcha:captcha
},'POST',token,'multipart/form-data;');

/**
 * 获取首页默认地址
 */

export const testa = (pageNumber) => fetch('storeTimecoin/listTop', {
    pageNumber,
},'POST');

export const getList = () => fetch('', {user_id:getStorage('user_name')});
