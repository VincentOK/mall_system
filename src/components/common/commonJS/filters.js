/** * 给商品价格加补0 * @param {*} value  */
const formMoney = (value) =>{
    let money = parseInt(value);
    return money/100;
};
export default {formMoney}
