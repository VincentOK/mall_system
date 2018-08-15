/**
 * 调用接口名文件
 */
import fetch from './fetch'
export const test = (teacherId) => fetch('share/shareTeacherInfo',{
    teacherId:teacherId
},'POST');


// export const searchplace = (callback) => fetch('announce/findann', callback);

