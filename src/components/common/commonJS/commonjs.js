/**
 * 公共常用函数，需要用到时主动调用
 * @param value
 * @param statusId
 * @returns {string}
 */

/**
 * 校验手机号码
 */
export const isvalidPhone = (str) =>{
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
};
