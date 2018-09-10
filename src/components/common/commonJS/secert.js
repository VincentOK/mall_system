const CryptoJS = require('crypto-js');  //引用AES源码js
import {
    key,
    iv
} from '../request/url'
/**
 * 加密方法
 * @param word
 * @returns {string}
 * @constructor
 */
export const Encrypt = (word) =>{
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs,  CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
};
/**
 * 解密方法
 * @param word
 * @returns {string}
 * @constructor
 */
export const Decrypt = (word) =>{
    try {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs,  CryptoJS.enc.Utf8.parse(key), { iv:  CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
        throw new Error('解密格式不对')
    }catch (e) {
        console.log(e)
        return e;
    }

};
