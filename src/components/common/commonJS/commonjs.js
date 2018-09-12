/**
 * 公共常用函数，需要用到时主动调用
 * @param value
 * @param statusId
 * @returns {string}
 */
const formatMoney = (value, statusId) => {
    let hasdot = value.indexOf('.') > 0
    switch (statusId) {
        case "1":
            return hasdot ? "￥" + value.substr(0,value.indexOf(".")+3) : "￥" + value;
            break;
        case "2":
            return hasdot ? value.substr(0,value.indexOf(".")+3) + "时间币" : value + "时间币";
            break;
        default:
            return hasdot ? value.substr(0,value.indexOf(".")+3) : value;
    }
}
/**
 * 上传图片
 */
export { formatMoney }
