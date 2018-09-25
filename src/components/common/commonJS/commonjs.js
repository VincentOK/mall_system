/**
 * 公共常用函数，需要用到时主动调用
 * @param value
 * @param statusId
 * @returns {string}
 */

/**
 * 校验手机号码
 */
export const isvalidPhone = (str) => {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
};

export const dividePrice = (value) => {
    let values = Number(value) / 100;
    let hasdot = String(values).indexOf('.') > 0
    return hasdot ? String(values).substr(0, String(values).indexOf(".") + 3) : values;
}

export const multiplyPrice = (value) => {
    var values = value + "";
    let hasdot = values.indexOf('.') > 0
    return hasdot ? Number(values.substr(0, values.indexOf(".") + 3)) * 100 : Number(values) * 100;
}