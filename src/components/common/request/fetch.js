import {
    baseUrl
} from './url'
import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true;
export default async(url, data = {}, type = 'GET',token = null,configType = null) => {
    let config = {headers:{'token':token}};
    return new Promise((resolve, reject) => {
        url = baseUrl + url;
        console.log("请求url:"+url);
        if(type == 'GET'){
            let dataStr = '';
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            });
            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr
            }
            console.log("get请求请求头:"+token);
            axios.get(url,config)
                .then(function (response) {
                    console.log("请求返回数据："+JSON.stringify(response));
                    if(response.status === 200){
                        resolve(response.data)
                    }else {
                        reject('请求返回状态：'+response.status+'')
                    }
                })
                .catch(function (error) {
                    reject(error)
                })
        }else {
            if(!configType){
                data = qs.stringify(data);
            }else {
                config.headers['Content-Type'] = configType
            }
            console.log("post请求请求头："+JSON.stringify(config));
            axios.post(url, data,config)
                .then(function (response) {
                    console.log("请求返回数据:"+JSON.stringify(response));
                    if(response.status === 200){
                        resolve(response.data)
                    }else {
                        reject('请求返回状态：'+response.status+'')
                    }
                })
                .catch(function (error) {
                    reject(error)
                })
        }
    })

}
