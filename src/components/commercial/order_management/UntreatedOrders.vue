<!--订单管理 待处理订单-->
<template>
    <div class="table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待发货" name="first"></el-tab-pane>
            <el-tab-pane label="待退款" name="second"></el-tab-pane>
            <!--<el-tab-pane label="审核中" name="third"></el-tab-pane>-->
        </el-tabs>
        <div class="table">
            <div class="container">
                <div class="handle-box">
                    <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                    <span class="on-offer" v-show="activeName == 'first'">待发货</span>
                    <span class="on-offer" v-show="activeName == 'second'">待退款</span>
                    <!--<span class="on-offer" v-show="activeName == 'third'">审核中</span>-->
                    <span class="good-total">共10.231个商品</span>
                    <!--<span class="ordering-rule" v-show="activeName == 'second'">排序规则：-->
                <!--<el-select v-model="select_cate" placeholder="请选择排序规则" class="handle-select mr10">-->
                    <!--&lt;!&ndash; <el-option key="1" label="广东省" value="广东省"></el-option>-->
                    <!--<el-option key="2" label="湖南省" value="湖南省"></el-option> &ndash;&gt;-->
                    <!--<el-option key="1" label="默认" value="默认（按上架时间从近至远）"></el-option>-->
                    <!--<el-option key="2" label="按总浏览量从高至低" value="按总浏览量从高至"></el-option>-->
                    <!--<el-option key="3" label="按总浏览量从低至高" value="按总浏览量从低至"></el-option>-->
                    <!--<el-option key="4" label="按销量从高至低" value="按销量从高至低"></el-option>-->
                    <!--<el-option key="5" label="" value="按销量从低至高" class="last-el-option"></el-option>-->
                <!--</el-select>-->
                <!--</span>-->

                    <!--<span class="ordering-rule" v-show="activeName != 'second'">结算状态：-->
                <!--<el-select v-model="select_cate" placeholder="全部" class="handle-select mr10">-->
                    <!--<el-option key="1" label="默认" value="默认（按上架时间从近至远）"></el-option>-->
                    <!--<el-option key="2" label="按总浏览量从高至低" value="按总浏览量从高至"></el-option>-->
                    <!--<el-option key="3" label="按总浏览量从低至高" value="按总浏览量从低至"></el-option>-->
                    <!--<el-option key="4" label="按销量从高至低" value="按销量从高至低"></el-option>-->
                    <!--<el-option key="5" label="" value="按销量从低至高" class="last-el-option"></el-option>-->
                <!--</el-select>-->
                <!--</span>-->

                    <!--<span class="date-options">-->
                    <!--<span class="select-date">选择日期：</span>-->
                    <!--<el-date-picker-->
                        <!--v-model="dateValue"-->
                        <!--type="daterange"-->
                        <!--range-separator="~"-->
                        <!--start-placeholder="开始日期"-->
                        <!--end-placeholder="结束日期">-->
                        <!--</el-date-picker>-->
                <!--</span>-->
                    <span class="search-option">
                    <el-input v-model="select_word" placeholder="按商品名称搜索" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    <el-button class="clear-button" type="default" icon="search" @click="search">清空</el-button>
                </span>
                </div>
                <div v-show="activeName == 'first'">
                    <el-table :data="getDatauntreatedOrders"  ref="multipleTable" :header-cell-style="getRowClass" @selection-change="handleSelectionChange">
                        <el-table-column prop="commodityName" label="商品" :formatter="formatter"></el-table-column>
                        <el-table-column prop="" label="出售规格" width="100"></el-table-column>
                        <el-table-column prop="" label="购买数量" :formatter="formatter">
                        </el-table-column>
                        <el-table-column prop="" label="支付金额" :formatter="formatter">
                        </el-table-column>
                        <el-table-column prop="" label="收货人" :formatter="formatter"></el-table-column>
                        <el-table-column prop="address" label="收货地址" :formatter="formatter"></el-table-column>
                        <el-table-column prop="" label="手机号码" :formatter="formatter"></el-table-column>
                        <el-table-column prop="" label="下单时间" :formatter="formatter">
                        </el-table-column>
                        <!--<el-table-column prop="address" label="订单状态" :formatter="formatter"></el-table-column>-->
                        <el-table-column label="操作" align="center" width="280">
                            <template slot-scope="{row,$index}">
                                <!--<el-button size="small" type="text" style="color:#66b1ff;"-->
                                <!--@click="viewDetails($index, row)">查看详情</el-button>-->
                                <el-button size="small" type="text" style="color:#66b1ff;"
                                           @click="viewDetails($index, row)">查看详情</el-button>
                                <el-button size="small" type="text" style="color:#66b1ff;"
                                           @click="handleSave($index, row)">确认发货</el-button>
                                <el-button size="small" type="text"
                                           @click="handleDelete($index, row)">拒绝发货</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-size="100"
                            :pager-count="11"
                            layout="prev, pager, next, jumper"
                            :total="1000">
                        </el-pagination>
                    </div>
                </div>
                <div v-show="activeName == 'second'">
                    <el-table :data="getDatauntreatedOrders"  ref="multipleTable" :header-cell-style="getRowClass" @selection-change="handleSelectionChange">
                            <el-table-column prop="address" label="商品" :formatter="formatter"></el-table-column>
                            <el-table-column prop="name" label="出售规格" width="100"></el-table-column>
                            <el-table-column prop="address" label="购买数量" :formatter="formatter">
                            </el-table-column>
                            <el-table-column prop="address" label="支付金额" :formatter="formatter">
                            </el-table-column>
                            <el-table-column prop="address" label="退款原因" :formatter="formatter"></el-table-column>
                            <el-table-column prop="address" label="联系人" :formatter="formatter"></el-table-column>
                            <el-table-column prop="address" label="联系电话" :formatter="formatter"></el-table-column>
                            <el-table-column prop="address" label="退款申请时间" :formatter="formatter">
                            </el-table-column>
                            <!--<el-table-column prop="address" label="订单状态" :formatter="formatter"></el-table-column>-->
                            <el-table-column label="操作" align="center" width="280">
                                <template slot-scope="{row,$index}">
                                    <!--<el-button size="small" type="text" style="color:#66b1ff;"-->
                                               <!--@click="viewDetails($index, row)">查看详情</el-button>-->
                                    <el-button size="small" type="text" style="color:#66b1ff;"
                                               @click="viewDetails($index, row)">查看详情</el-button>
                                    <el-button size="small" type="text" style="color:#66b1ff;"
                                               @click="agreeDetails($index, row)" >同意退款</el-button>
                                    <el-button size="small" type="text"
                                               @click="notagreePay($index, row)">拒绝退款</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    <div class="pagination">
                            <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :page-size="100"
                                :pager-count="11"
                                layout="prev, pager, next, jumper"
                                :total="1000">
                            </el-pagination>
                        </div>
                </div>
            </div>

            <!-- 详情弹出框 -->
            <el-dialog id="viewDetail" title="订单详情-待发货" :visible.sync="editVisible" width="40%" :lock-scroll='true' top="100px">
                <div class="goods_detail">
                    <el-scrollbar style="height:300px;">
                        <h4>订单信息</h4>
                        <div class="one_detail">
                            <div class="goods_detail_left">
                                <div>
                                    商品名称：<label>山东烟台苹果</label>
                                </div>
                                <div>
                                    出售规格：<label>每份300克</label>
                                </div>
                                <div>
                                    购买数量：<label>3</label>
                                </div>
                                <div>
                                    下单时间：<label>2018-08-20</label>
                                </div>
                            </div>
                            <div class="goods_detail_right">
                                <div>
                                    订单号：<label>JFU008899665</label>
                                </div>
                                <div>
                                    支付流水号：<label>JFU008899665</label>
                                </div>
                                <div>
                                    支付金额：<label>￥188.00</label>
                                </div>
                            </div>
                        </div>
                        <h4>买家信息</h4>
                        <div class="one_detail">
                            <div class="goods_detail_left">
                                <div>
                                    买家昵称：<label>阿曼达</label>
                                </div>
                                <div>
                                    手机号：<label>18376614866</label>
                                </div>
                            </div>
                            <div class="goods_detail_right">
                                <div>
                                    收货人：<label>大头老师</label>
                                </div>
                                <div>
                                    收货地址：<label>广东省深圳市男生区田厦金牛广场</label>
                                </div>
                            </div>
                        </div>
                        <h4>买家信息<label class="buy_notive">*请联系买家沟通开具专用发票相关事宜</label></h4>
                        <div class="one_detail">
                            <div class="goods_detail_left">
                                <div>
                                    买家索要发票：<label>是</label>
                                </div>
                            </div>
                            <div class="goods_detail_right">
                                <div>
                                    发票类型：<label>增值税专用发票</label>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" type="primary">关闭窗口</el-button>
            </span>
            </el-dialog>



            <!-- 确认发货提示框 -->
            <el-dialog id="el-title" title="确认发货" :visible.sync="ConfirmTheDelivery" width="460px" center top="300px" :show-close="false">
                <div>
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="快递公司:">
                          <el-input v-model="form.name" placeholder="请输入快递公司名称" ></el-input>
                        </el-form-item>
                        <el-form-item label="快递单号:">
                            <el-input v-model="form.number" placeholder="请输入快递单号"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="DeliveryRow">确 定</el-button>
                <el-button @click="ConfirmTheDelivery = false">取 消</el-button>
            </span>
            </el-dialog>

            <!-- 拒绝发货提示框 -->
            <el-dialog id="el-title" title="拒绝发货" :visible.sync="delVisible" width="460px" center top="300px" :show-close="false">
                <div class="">
                    <div class="refund_title_word">拒绝买家<label style="color: #ec414d">{{refund_name}}</label>的发货请求？</div>
                    <el-form ref="form" :model="form_refund" label-width="100px">
                        <el-form-item label="拒绝原因：">
                            <el-input type="textarea" v-model="form_refund.desc"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="notdelVisible">确 定</el-button>
                <el-button @click="delVisible = false">取 消</el-button>
            </span>
            </el-dialog>



            <!-- 同意退款提示框 -->
            <el-dialog id="el-title" title="同意退款" :visible.sync="agreeVisible" width="460px" center top="300px" :show-close="false">
                <div class="">
                    <div class="refund_title_word">同意买家<label style="color: #ec414d">{{refund_name}}</label>的退货退款请求？</div>
                    <el-form ref="form" :model="form_agree" label-width="100px">
                        <el-form-item label="收件人:">
                            <el-input v-model="form_agree.name" placeholder="请输入收件人" ></el-input>
                        </el-form-item>
                        <el-form-item label="收货地址:">
                            <el-input v-model="form_agree.address" placeholder="请输入收货地址" ></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话:">
                            <el-input v-model="form_agree.tel" placeholder="请输入联系电话" ></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="agreedelVisible">确 定</el-button>
                <el-button @click="agreeVisible = false">取 消</el-button>
            </span>
            </el-dialog>


            <!-- 拒绝退款提示框 -->
            <el-dialog id="el-title" title="拒绝退款" :visible.sync="notagreeVisible" width="460px" center top="300px" :show-close="false">
                <div class="">
                    <div class="refund_title_word">拒绝买家<label style="color: #ec414d">{{refund_name}}</label>的退款请求？</div>
                    <el-form ref="form" :model="form_notrefund" label-width="100px">
                        <el-form-item label="拒绝原因：">
                            <el-input type="textarea" v-model="form_notrefund.desc"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="notagreedelVisible">确 定</el-button>
                <el-button @click="notagreeVisible = false">取 消</el-button>
            </span>
            </el-dialog>

            <!-- 执行退款提示框 -->
            <el-dialog id="el-title" title="退还商品基本款项" :visible.sync="sureagree" width="460px" center top="300px" :show-close="false">
                <div class="sure_agree">
                    <div class="dialog_rela">
                        <span class="dialog_one">1</span>
                        <p></p>
                        <span class="dialog_two">2</span>
                    </div>
                    <div class="word_one">
                        <span>同意退款</span>
                        <span>退还商品基本款项</span>
                    </div>
                    <div class="word_more">
                        <p>同意向卖家<label style="color: #ec414d">芒果道长</label></p>
                        <p>退还<label style="color: #ec414d">￥4888.00</label>的商品基本款项？</p>
                        <p>退款金额将从您的平台账户扣除，请仔细检查买家寄回的货品后再退款</p>
                    </div>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="notagreedelVisible">确 定</el-button>
                <el-button @click="sureagree = false">取 消</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { getUntreatedOrdersList } from "../../common/request/request";
    import {mapState, mapMutations,mapActions} from 'vuex'
    export default {
        name: "basetable",
        props: {
            initialSpeed: {
                type: Number,
                default: 30
            }
        },
        data() {
            return {
                getDatauntreatedOrders:[],//待处理订单数据

                activeName: "first",
                url: "./static/vuetable.json",
                dateValue: "",
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: "",
                select_word: "",
                del_list: [],
                is_search: false,
                editVisible: false,//商品详情提示框
                delVisible: false,//拒绝发货提示框
                ConfirmTheDelivery:false,//确认发货提示框
                agreeVisible:false,//同意退款提示框
                notagreeVisible:false,//拒绝退款提示框
                sureagree:false,//同意执行退款
                refund_name:'',
                form_notrefund:{
                    des:''
                },
                form_agree:{
                    name:'',
                    address:'',
                    tel:''
                },
                form:{
                    name:'',
                    number:''
                },
                form_refund:{
                    desc:''
                },
                idx: -1,
                currentIndex:1,
                distance:-600,
                transitionEnd: true,
                speed: this.initialSpeed
            };
        },
        created() {
            let pageSize = 1;
            let uid = this.userInfo.uid;
            let pageNum = 10;
            console.log("用户UID:"+uid);
            this.getData(pageNum,pageSize,uid);
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
            // data() {
            //     return this.tableData.filter(d => {
            //         let is_del = false;
            //         for (let i = 0; i < this.del_list.length; i++) {
            //             if (d.name === this.del_list[i].name) {
            //                 is_del = true;
            //                 break;
            //             }
            //         }
            //         if (!is_del) {
            //             if (
            //                 d.address.indexOf(this.select_cate) > -1 &&
            //                 (d.name.indexOf(this.select_word) > -1 ||
            //                     d.address.indexOf(this.select_word) > -1)
            //             ) {
            //                 return d;
            //             }
            //         }
            //     });
            // },
            containerStyle() {
                return {
                    transform:`translate3d(${this.distance}px, 0, 0)`
                }
            }
        },
        methods: {
            handleClick(tab, e) {
                this.activeName = tab.name;
                console.log(tab.index, tab.name, tab.label, this.activeName);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 分页导航
            handleCurrentChange(val) {
                console.log("当前页："+val);
                this.cur_page = val;
            },
            /**
             * 获取待发货订单数据
             * @param pageNum//每页条数
             * @param pageSize//页码
             * @param uid//用户id
             * @param keyword//关键字
             */
            getData(pageNum,pageSize,uid,keyword) {
                getUntreatedOrdersList(pageNum,pageSize,uid,keyword).then(res =>{
                    console.log("JSON:"+JSON.stringify(res));
                    this.getDatauntreatedOrders = res.data.dataList;
                    // for (var i = 0; i < res.data.list.length; i++) {
                    //     this.$set(this.tableData[i], "showEdit", false);
                    // }
                }).catch(err =>{
                    console.log(err)
                })
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === "development") {
                //     this.url = "/ms/table/list";
                // }
                // this.$axios
                //     .post(this.url, {
                //         page: this.cur_page
                //     })
                //     .then(res => {
                //         console.log("JSON:"+JSON.stringify(res))
                //         this.tableData = res.data.list;
                //         for (var i = 0; i < res.data.list.length; i++) {
                //             this.$set(this.tableData[i], "showEdit", false);
                //         }
                //     });
            },
            forTableIndex() {
                // for (var i = 0; i < 100; i++) {
                //   this.showEdit[i] = false;
                //   this.$set(this.showEdit[i], false);
                // }
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            plusMath() {
                console.log(234235);
            },
            subtractMath() {
                console.log(28888);
            },
            viewDetails(index, row) {
                this.editVisible = true;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                item.showEdit = true;
                // this.showEdit[index] = true;
                // this.$set(this.showEdit, row, true);
            },
            handleSave(index, row) {
                this.ConfirmTheDelivery = true;
            },
            //拒绝退款
            handleDelete(index, row) {
                console.log(index,row)
                this.idx = index;
                this.refund_name = row.name;
                this.delVisible = true;
            },
            //同意退款
            agreeDetails(index,row){
                console.log(index,row)
                this.idx = index;
                this.refund_name = row.name;
                this.agreeVisible = true;
            },
            //拒绝退款
            notagreePay(index,row){
                console.log(index,row)
                this.idx = index;
                this.refund_name = row.name;
                this.notagreeVisible = true;
            },
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return "background:#FCE4E4;height:60px;color:#606266;";
                } else {
                    return "";
                }
            },
            // delAll() {
            //     const length = this.multipleSelection.length;
            //     let str = '';
            //     this.del_list = this.del_list.concat(this.multipleSelection);
            //     for (let i = 0; i < length; i++) {
            //         str += this.multipleSelection[i].name + ' ';
            //     }
            //     this.$message.error('删除了' + str);
            //     this.multipleSelection = [];
            // },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //确认发货
            DeliveryRow(){
                this.ConfirmTheDelivery = false;
            },
            //拒绝发货
            notdelVisible(){
                this.delVisible = false;
            },
            //同意退款
            agreedelVisible(){
                this.agreeVisible = false;
            },
            //拒绝退款
            notagreedelVisible(){
                this.notagreeVisible = false;
            },


            move(offset, direction, speed) {
                if (!this.transitionEnd) return
                this.transitionEnd = false
                direction === -1 ? this.currentIndex += offset/600 : this.currentIndex -= offset/600
                if (this.currentIndex > 5) this.currentIndex = 1
                if (this.currentIndex < 1) this.currentIndex = 5

                const destination = this.distance + offset * direction
                this.animate(destination, direction, speed)
            },
            animate(des, direc, speed) {
                if (this.temp) {
                    window.clearInterval(this.temp)
                    this.temp = null
                }
                this.temp = window.setInterval(() => {
                    if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
                        this.distance += speed * direc
                    } else {
                        this.transitionEnd = true
                        window.clearInterval(this.temp)
                        this.distance = des
                        if (des < -3000) this.distance = -600
                        if (des > -600) this.distance = -3000
                    }
                }, 20)
            },
        }
    };
</script>

<style scoped>
    .word_more p{
        margin-bottom: 10px;
    }
    .word_more p:first-child{
        color: #0e0908;
    }
    .word_more p:nth-child(2),.word_more p:last-child{
        color: #9d9d9d9d;
    }
    .word_one{
        font-size: 12px;
        height: 40px;
    }
    .word_one span:first-child{
        width: 50px;
        float: left;
    }
    .word_one span:last-child{
        width: 50px;
        float: right;
    }
    .dialog_two{
        font-size: 16px;
        background-color: darkgray;
        color: white;
        display: block;
        height: 35px;
        line-height: 35px;
        width: 35px;
        text-align: center;
        border-radius: 50%;
        position: absolute;
        right: 0;
        z-index: 10;
    }
    .dialog_one{
        font-size: 16px;
        background-color: #ec414d;
        color: white;
        display: block;
        height: 35px;
        line-height: 35px;
        width: 35px;
        text-align: center;
        border-radius: 50%;
        position: absolute;
        left: 0;
        z-index: 10;
    }
    .dialog_rela p{
        height: 5px;
        background-color: #ec414d;
        width: 100%;
        position: absolute;
        top: 15px;
    }
    .dialog_rela{
        position: relative;
        height: 35px;
        width: 100%;
        margin: auto;
    }
    .sure_agree{
        width: 65%;
        margin: auto;
        text-align: center;
    }
    .refund_title_word{
        width: 90%;
        margin: auto;
        text-align: left;
        padding: 0px 0 10px 0;
    }
    .buy_notive{
        font-size: 12px;
        color: #ec414d;
    }
    .one_detail{
        display: flex;
        width: 80%;
        margin: auto;
    }
    .handle-box {
        height: 51px;
        position: relative;
    }
    .good-total {
        font-weight: 400;
        font-size: 14px;
        color: #606266;
        cursor: text;
        margin-left: 30px;
    }
    .handle-select {
        width: 140px;
    }
    .last-el-option {
        margin-bottom: 15px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt {
        font-size: 16px;
        text-align: center;
        font-weight: bold;
    }
    .del-dialog-goods {
        margin-top: 10px;
        color: #ec414d;
        font-size: 18px;
        text-align: center;
    }
    .el-breadcrumb {
        margin-left: 30px;
    }
    .crumbs {
        background: white;
        width: 100%;
        padding: 20px 0;
    }
    .ordering-rule {
        font-weight: 400;
        font-size: 14px;
        color: #606266;
        cursor: text;
        position: absolute;
        left: 25%;
    }
    .search-option {
        position: absolute;
        right: 0;
    }
    .clear-button {
        margin-left: 2px;
    }
    .select-date {
        font-weight: 400;
        font-size: 14px;
        color: #606266;
        cursor: text;
    }
    .date-options {
        position: absolute;
        right: 30%;
    }
    .pagination {
        text-align: center;
    }
    /*.goods_detail {*/
        /*height: 700px;*/
    /*}*/
    .goods_detail_left {
      flex: 1;
    }
    .goods_detail_left div,.goods_detail_right div{
        padding: 10px;
    }
    .goods_detail_left div label,.goods_detail_right div label{
        color: black;
        /*font-weight: 600;*/
    }
    .goods_detail_right {
        flex: 1;
    }

    .product_detail {
        padding: 20px 20px 0 80px;
    }
    .product_detail label {
        float: left;
    }
    .product_detail p {
        margin-left: 70px;
    }
    #img_slider{
        text-align: center;
    }
    .img_window{
        position:relative;
        width:600px;
        height:400px;
        margin:0 auto;
        overflow:hidden;
    }
    .img_container{
        display:flex;
        position:absolute;
    }
    .img_container li{
        width: 600px;
        height: 400px;
    }
    .left, .right{
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        width:50px;
        height:50px;
        background-color:rgba(0,0,0,.3);
        border-radius:50%;
        cursor:pointer;
    }
    .left{
        left:3%;
        padding-left:12px;
        padding-top:10px;
    }
    .right{
        right:3%;
        padding-right:12px;
        padding-top:10px;
    }
    #img_slider img{
        user-select: none;
        width: 100%;
        height: 100%;
    }
</style>

