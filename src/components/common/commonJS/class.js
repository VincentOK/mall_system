class commonFn {
    constructor(prop){
        this.name = this.name ? prop.name : '未定义'
    }
    init(){
        alert("what:"+this.name);
    }
}
export default commonFn
