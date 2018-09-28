import commonFn from './class'
class ExFn  extends commonFn{
    constructor(prop){
        super(prop);
        this.type = this.type ? prop.type : '未定义';
        this._init();
        this.prototype = null;
    }
    _init(){
        console.log("初始化类函数")
    }
    fly(){
        alert("fly:"+this.name);
        this.name = '什么鬼'
    }
    anther(){
        alert("fly:"+this.name)
    }
}
export default ExFn;
