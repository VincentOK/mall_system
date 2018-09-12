import {
    baseUrl
} from './url'
import { showFullScreenLoading, tryHideFullScreenLoading } from "./requestLoading";
import axios from 'axios'
import qs from 'qs'
import store from "../../../store/store";
axios.defaults.withCredentials = true;
export default async(url, data = {}, type = 'GET', loading = false, configType = null) => {
    let token = store.state.token;
    let config = null;
    if (token) {
        config = { headers: { 'token': token } };
    }
    if (loading) {
        showFullScreenLoading();
    }
    return new Promise((resolve, reject) => {
        url = baseUrl + url;
        console.log("请求url:" + url);
        if (type == 'GET') {
            let dataStr = '';
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            });
            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr
            }
            console.log("get请求请求头:" + JSON.stringify(token));
            axios.get(url, config)
                .then(function(response) {
                    tryHideFullScreenLoading();
                    console.log("请求返回数据：" + JSON.stringify(response));
                    if (response.status === 200) {
                        resolve(response.data)
                    } else {
                        reject('请求返回状态：' + response.status + '')
                    }
                })
                .catch(function(error) {
                    reject(error)
                    tryHideFullScreenLoading()
                })
        } else {
            if (!configType) {
                data = qs.stringify(data);
            } else {
                config.headers['Content-Type'] = configType
            }
            // console.log("post请求请求头：" + JSON.stringify(config));
            axios.post(url, data, config)
                .then(function(response) {
                    tryHideFullScreenLoading()
                    console.log("请求返回数据:" + JSON.stringify(response));
                    if (response.status === 200) {
                        resolve(response.data)
                    } else {
                        reject('请求返回状态：' + response.status + '')
                    }
                })
                .catch(function(error) {
                    tryHideFullScreenLoading()
                    reject(error)
                })
        }
    })

}