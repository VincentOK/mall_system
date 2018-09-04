/**
 * 调用接口名文件
 */
import fetch from './fetch'
/**
 * 获取首页默认地址
 */

export const testa = (pageNumber) => fetch('storeTimecoin/listTop', {
    pageNumber: pageNumber
},'POST');

export const getList = () =>{};
