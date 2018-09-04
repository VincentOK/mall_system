import { RECORD_ADDRESS,RECORD_ABB } from './mutations_type'
export default {
    [RECORD_ADDRESS](state,loginWord) {
        state.loginWord = loginWord;
    },
    [RECORD_ABB](state,{
        word,
        lay
    }) {
        state.word = word;
        state.lay = lay
    },
}
