/**
 * 调用接口名文件
 */
import fetch from './fetch'
export const getdata = () => fetch('/ms/table/list','POST');


// export const searchplace = (callback) => fetch('announce/findann', callback);

