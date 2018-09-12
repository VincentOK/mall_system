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
    userName:username,
    password:password,
    captcha:captcha
},'POST',true);

export const userLoginaaa=(username,password,captcha) =>fetch('/timestoremanage/storeCommodity/add',{
    userName:username,
    password:password,
    captcha:captcha
},'POST');

/**
 * 获取首页默认地址
 */

export const testa = (pageNumber) => fetch('storeTimecoin/listTop', {
    pageNumber,
},'POST');

export const getList = () => fetch('', {user_id:getStorage('user_name')});
