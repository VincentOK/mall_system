import {
    baseUrl
} from './url'
import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true;
export default async(url, data = {}, type = 'GET',config) => {
    console.log("请求头："+JSON.stringify(config));
    return new Promise((resolve, reject) => {
        url = baseUrl + url;
        console.log("请求url:"+url);
        if(type == 'GET'){
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            axios.get(url,config)
                .then(function (response) {
                    console.log("请求返回数据："+JSON.stringify(response));
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error)
                })
        }else {

            if(!config){
                console.log("上传图片");
                data = qs.stringify(data)
            }
            axios.post(url, data,config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error)
                })
        }
    })

}
