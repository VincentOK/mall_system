import { getList } from '../components/common/request/request'
import {
    GET_USERINFO
} from './mutations_type'
export default {
    async mytestfun({commit,state})
    {
        let res = await getList(state.user_id);
        commit(GET_USERINFO,res)
    }
}
