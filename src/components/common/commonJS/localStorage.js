export const setStorage = (key,val) =>{
    window.localStorage.setItem(key,val);
};
export const getStorage = (name) =>{
    if (!name) return;
    return window.localStorage.getItem(name);
};
export const removeStorage = (name) =>{
    if (!name) return;
    return window.localStorage.removeItem(name);
};
