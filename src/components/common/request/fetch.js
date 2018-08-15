/**
 * 发起网络请求函数
 */
import {
    baseUrl
} from './url'
import axios from 'axios'
import qs from 'qs'

export default async(url, data = {}, type = 'GET') => {
    return new Promise((resolve, reject) => {
        url = baseUrl + url
        if(type == 'GET'){
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            axios.get(url)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (response) {
                    console.log(response)
                    reject(response)
                })
        }else {
            console.log("POST:"+url)
            axios.post(url, qs.stringify(data))
                .then(function (response) {
                    console.log(response)
                    resolve(response.data)
                })
                .catch(function (response) {
                    console.log(response)
                    reject(response)
                })
        }
    })

}
