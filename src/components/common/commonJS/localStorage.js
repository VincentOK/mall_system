export const setStorage = (key,val) =>{
    window.localStorage.setItem(key,val);
};
export const getStorage = (name) =>{
    if (!name) return;
    return window.localStorage.getItem(name);
};
export const Promisify = fn =>{
    return function (obj={}) {
        return new Promise((resolve,reject) =>{
            obj.success = function (res) {
                resolve(res)
            };
            obj.fail = function (res) {
                reject(res)
            };
            fn(obj);
        })
    }
};
