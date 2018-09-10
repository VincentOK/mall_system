import {
    baseUrl
} from './url'
import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true;

export default async(url, data = {}, type = 'GET',token,configType) => {
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
            console.log("get请求获取到的token:"+token);
            axios.get(url,{headers:{'token':token}})
                .then(function (response) {
                    console.log("请求返回数据："+JSON.stringify(response));
                    resolve(response)
                })
                .catch(function (error) {
                    reject(error)
                })
        }else {
            let config = null
            if(!configType){
                data = qs.stringify(data);
                config = {headers:{'token':token}}
            }else {
                config = {headers:{
                    'Content-Type': configType,
                    'token':token
                }}
            }
            console.log("post请求请求头："+JSON.stringify(config));
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
