<!--订单管理 待处理订单-->
<template>
    <div class="table">
        <div class="tabel_title">订单管理&nbsp;>&nbsp;已处理订单</div>
        <div class="table">
            <div class="container">
                <div class="handle-box">
                    <span class="good-total">共{{listRefundOrderDataTotal}}个商品</span>
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
                    <span class="ordering-rule" style="left: 50%">结算状态：
                    <el-select v-model="select_cate" placeholder="请选择状态" @change="chooseStatus" class="handle-select mr10">
                    <el-option key="1" label="全部订单" value="0"></el-option>
                    <el-option key="2" label="已发货订单" value="3"></el-option>
                    <el-option key="3" label="已退款订单" value="5"></el-option>
                    <el-option key="4" label="已完成订单" value="6"></el-option>
                    <el-option key="5" label="拒绝发货订单" value="7" class="last-el-option"></el-option>
                    </el-select>
                    </span>

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
                    <el-button type="primary" icon="search" @click="search()">搜索</el-button>
                    <!--<el-button class="clear-button" type="default" icon="search" @click="search">清空</el-button>-->
                </span>
                </div>
                    <el-table :data="listRefundOrderData"  ref="multipleTable" :header-cell-style="getRowClass">
                        <el-table-column prop="commodityPrizeimgUrl" label="" min-width="50%" >
                            <template  slot-scope="scope">
                                <img :src="scope.row.commodityPrizeimgUrl"  min-width="70" height="70" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="commodityPrizeName" label="商品"></el-table-column>
                        <el-table-column prop="unit" label="出售规格" width="100"></el-table-column>
                        <el-table-column prop="count" label="购买数量">
                        </el-table-column>
                        <el-table-column prop="channel" label="通道费" :formatter="formatterChannel">
                        </el-table-column>
                        <el-table-column prop="manageFee" label="管理费" :formatter="formatterManageFee">
                        </el-table-column>
                        <el-table-column prop="actualAccount" label="实际到账" :formatter="formatterActualAccount">
                        </el-table-column>
                        <el-table-column prop="orderPriceRmb" label="支付金额" :formatter="formatter">
                        </el-table-column>
                        <el-table-column prop="carriage" label="运费"  :formatter="formatterCarriage">
                        </el-table-column>
                        <el-table-column prop="receivingName" label="收货人" ></el-table-column>
                        <el-table-column prop="receivingAddress" label="收货地址" ></el-table-column>
                        <el-table-column prop="receivingPhone" label="手机号码" ></el-table-column>
                        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
                        <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="{row,$index}">
                                <el-button size="small" type="text" style="color:#66b1ff;"
                                           @click="viewDetails($index, row)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :page-size="pageSize"
                            :pager-count="cur_page"
                            layout="prev, pager, next, jumper"
                            :total="listRefundOrderDataTotal">
                        </el-pagination>
                    </div>
            </div>

            <!-- 详情弹出框 -->
            <el-dialog id="viewDetail" v-if="goodsDetail" v-bind:title="'订单详情-'+editVisibleTitle" :visible.sync="editVisible" width="40%" :lock-scroll='true' top="200px">
                <div class="goods_detail">
                    <el-scrollbar style="height:300px;">
                        <!--已退款-->
                        <div  v-if="returnMoney">
                            <div>
                                <h4>退款信息</h4>
                                <div class="one_detail">
                                    <div class="goods_detail_left">
                                        <div>
                                            联系人：<label>{{goodsDetail.contacts}}</label>
                                        </div>
                                        <div>
                                            申请原因：<label>{{goodsDetail.reason}}</label>
                                        </div>
                                    </div>
                                    <div class="goods_detail_right">
                                        <div>
                                            联系电话：<label>{{goodsDetail.phone}}</label>
                                        </div>
                                        <div>
                                            问题描述：<label>{{goodsDetail.describes}}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="slider_img">
                                    <template>
                                        <el-carousel :interval="5000" arrow="always" height="180px">
                                            <el-carousel-item v-for="(item,index) in goodsDetail.imgList" :key="index">
                                                <img :src="item.imgUrl" width="100%" height="100%" alt="">
                                            </el-carousel-item>
                                        </el-carousel>
                                        <p style="text-align: center">问题轮播图(共{{goodsDetail.imgList.length}}张)</p>
                                    </template>
                                </div>
                                <h4>商品退还路径</h4>
                                <div class="one_detail">
                                    <div class="goods_detail_left">
                                        <div>
                                            收件人：<label>{{goodsDetail.tenantContacts}}</label>
                                        </div>
                                        <div>
                                            联系电话：<label>{{goodsDetail.tenantPhone}}</label>
                                        </div>
                                    </div>
                                    <div class="goods_detail_right">
                                        <div>
                                            收货地址：<label>{{goodsDetail.tenantAddress}}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4>订单信息</h4>
                            <div class="one_detail">
                                <div class="goods_detail_left">
                                    <div>
                                        商品名称：<label>{{goodsDetail.commodityPrizeName}}</label>
                                    </div>
                                    <div>
                                        出售规格：<label>{{goodsDetail.unit}}</label>
                                    </div>
                                    <div>
                                        购买数量：<label>{{goodsDetail.count}}</label>
                                    </div>
                                    <div>
                                        通道费：<label>￥{{goodsDetail.channel | formMoney(goodsDetail.channel)}}</label>
                                    </div>
                                    <div>
                                        实际到账：<label>￥{{goodsDetail.actualAccount | formMoney(goodsDetail.actualAccount)}}</label>
                                    </div>
                                    <div>
                                        快递公司：<label>{{goodsDetail.logisticsName}}</label>
                                    </div>
                                    <div>
                                        快递单号：<label>{{goodsDetail.logisticsNumber}}</label>
                                    </div>
                                </div>
                                <div class="goods_detail_right">
                                    <div>
                                        订单号：<label>{{goodsDetail.orderNumber}}</label>
                                    </div>
                                    <div>
                                        支付流水号：<label>{{goodsDetail.payNumber}}</label>
                                    </div>
                                    <div v-if="goodsDetail.orderPriceRmb !== 0">
                                        支付金额：<label>￥{{goodsDetail.orderPriceRmb | formMoney(goodsDetail.orderPriceRmb)}}</label>
                                    </div>
                                    <div v-if="goodsDetail.orderPriceSjb !== 0">
                                        支付时间币：<label>{{goodsDetail.orderPriceSjb | formMoney(goodsDetail.orderPriceSjb)}}</label>
                                    </div>
                                    <div>
                                        管理费：<label>￥{{goodsDetail.manageFee | formMoney(goodsDetail.manageFee)}}</label>
                                    </div>
                                    <div>
                                        运费：<label>￥{{goodsDetail.carriage | formMoney(goodsDetail.carriage)}}</label>
                                    </div>
                                    <div>
                                        下单时间：<label>{{goodsDetail.orderTime}}</label>
                                    </div>
                                </div>
                            </div>
                            <h4>买家信息</h4>
                            <div class="one_detail">
                                <div class="goods_detail_left">
                                    <div>
                                        买家昵称：<label>{{goodsDetail.nickName}}</label>
                                    </div>
                                    <div>
                                        手机号：<label>{{goodsDetail.receivingPhone}}</label>
                                    </div>
                                </div>
                                <div class="goods_detail_right">
                                    <div>
                                        收货人：<label>{{goodsDetail.receivingName}}</label>
                                    </div>
                                    <div>
                                        收货地址：<label>{{goodsDetail.receivingAddress}}</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>发票相关信息<label class="buy_notive">*买家想你索要了发票，请将发票与商品一同寄出</label></h4>
                                <div class="one_detail">
                                    <div class="goods_detail_left">
                                        <div>
                                            买家索要发票：<label>{{goodsDetail.support}}</label>
                                        </div>
                                        <div>
                                            发票单位名称：<label>{{goodsDetail.invoiceName}}</label>
                                        </div>
                                    </div>
                                    <div class="goods_detail_right">
                                        <div>
                                            发票类型：<label>{{goodsDetail.typeName}}</label>
                                        </div>
                                        <div>
                                            纳税人识别号：<label>{{goodsDetail.invoiceCode}}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--已发货和已完成-->
                        <div v-if="goodsOk">
                            <h4>订单信息</h4>
                            <div class="one_detail">
                                <div class="goods_detail_left">
                                    <div>
                                        商品名称：<label>{{goodsDetail.commodityPrizeName}}</label>
                                    </div>
                                    <div>
                                        出售规格：<label>{{goodsDetail.unit}}</label>
                                    </div>
                                    <div>
                                        购买数量：<label>{{goodsDetail.count}}</label>
                                    </div>
                                    <div v-if="goodsDetail.orderPriceRmb !== 0">
                                        支付金额：<label>￥{{goodsDetail.orderPriceRmb | formMoney(goodsDetail.orderPriceRmb)}}</label>
                                    </div>
                                    <div v-if="goodsDetail.orderPriceSjb !== 0">
                                        支付时间币：<label>{{goodsDetail.orderPriceSjb  | formMoney(goodsDetail.orderPriceSjb)}}</label>
                                    </div>
                                    <div v-show="returnGoods">
                                        下单时间：<label>{{goodsDetail.orderTime}}</label>
                                    </div>
                                    <div>
                                        快递公司：<label>{{goodsDetail.logisticsName}}</label>
                                    </div>
                                    <div>
                                        快递单号：<label>{{goodsDetail.logisticsNumber}}</label>
                                    </div>
                                    <div>
                                        实际到账：<label>￥{{goodsDetail.actualAccount | formMoney(goodsDetail.actualAccount)}}</label>
                                    </div>

                                </div>
                                <div class="goods_detail_right">
                                    <div>
                                        订单号：<label>{{goodsDetail.orderNumber}}</label>
                                    </div>
                                    <div>
                                        支付流水号：<label>{{goodsDetail.payNumber}}</label>
                                    </div>
                                    <div>
                                        运费：<label>￥{{goodsDetail.carriage | formMoney(goodsDetail.carriage)}}</label>
                                    </div>
                                    <div>
                                        通道费：<label>￥{{goodsDetail.channel | formMoney(goodsDetail.channel)}}</label>
                                    </div>
                                    <div>
                                        管理费：<label>￥{{goodsDetail.manageFee | formMoney(goodsDetail.manageFee)}}</label>
                                    </div>
                                    <div>
                                        下单时间：<label>{{goodsDetail.orderTime}}</label>
                                    </div>
                                </div>
                            </div>
                            <h4>买家信息</h4>
                            <div class="one_detail">
                                <div class="goods_detail_left">
                                    <div>
                                        买家昵称：<label>{{goodsDetail.nickName}}</label>
                                    </div>
                                    <div>
                                        手机号：<label>{{goodsDetail.receivingPhone}}</label>
                                    </div>
                                </div>
                                <div class="goods_detail_right">
                                    <div>
                                        收货人：<label>{{goodsDetail.commodityName}}</label>
                                    </div>
                                    <div>
                                        收货地址：<label>{{goodsDetail.receivingAddress}}</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <!--<h4>发票相关信息<label class="buy_notive">*买家想你索要了发票，请将发票与商品一同寄出</label></h4>-->
                                <!--<div class="one_detail">-->
                                    <!--<div class="goods_detail_left">-->
                                        <!--<div>-->
                                            <!--买家索要发票：<label>{{goodsDetail.blag}}</label>-->
                                        <!--</div>-->
                                        <!--<div>-->
                                            <!--发票单位名称：<label>{{goodsDetail.nameEntity}}</label>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="goods_detail_right">-->
                                        <!--<div>-->
                                            <!--发票类型：<label>{{goodsDetail.typeName}}</label>-->
                                        <!--</div>-->
                                        <!--<div>-->
                                            <!--纳税人识别号：<label>{{goodsDetail.identifyNumber}}</label>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                            </div>
                        </div>

                        <!--已拒绝发货-->
                        <div v-if="returnGoods">
                            <h4>订单信息</h4>
                            <div class="one_detail">
                                <div class="goods_detail_left">
                                    <div>
                                        商品名称：<label>{{goodsDetail.commodityName}}</label>
                                    </div>
                                    <div>
                                        出售规格：<label>{{goodsDetail.unit}}</label>
                                    </div>
                                    <div>
                                        购买数量：<label>{{goodsDetail.count}}</label>
                                    </div>
                                    <div>
                                        下单时间：<label>{{goodsDetail.orderTime}}</label>
                                    </div>
                                </div>
                                <div class="goods_detail_right">
                                    <div>
                                        拒绝发货原因：<label>{{goodsDetail.reason}}</label>
                                    </div>
                                </div>
                            </div>
                            <h4>买家信息</h4>
                            <div class="one_detail">
                                <div class="goods_detail_left">
                                    <div>
                                        买家昵称：<label>{{goodsDetail.nickName}}</label>
                                    </div>
                                    <div>
                                        手机号：<label>{{goodsDetail.shippingPhone}}</label>
                                    </div>
                                </div>
                                <div class="goods_detail_right">
                                    <div>
                                        收货人：<label>{{goodsDetail.shippingName}}</label>
                                    </div>
                                    <div>
                                        收货地址：<label>{{goodsDetail.address}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </el-scrollbar>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" type="primary">关闭窗口</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        listRefundOrder,
        orderDetailrefund,
        getShippedSend,
        orderDetail,
        getNoSendDetail
    } from "../../common/request/request";
    import {mapState, mapMutations,mapActions} from 'vuex'
    import { dividePrice } from "../../common/commonJS/commonjs";
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
                listRefundOrderData:null,//列表数据
                listRefundOrderDataTotal:null,//列表总数
                cur_page: 1,//页码
                pageSize:6,//每页行数

                select_cate: "",//下拉框
                select_word: "",//搜索框输入值
                editVisibleTitle:'',//弹框标题
                editVisible:false,//弹出框
                returnGoods:false,//已拒绝发货
                goodsOk:false,//已发货,已完成
                returnMoney:false,//已退款状态

                goodsDetail:null,//商品详情
                idx: -1,
                sliders:[
                    {
                        img:'../../static/img/3.png'
                    },
                    {
                        img:'../../static/img/2.png'
                    },
                    {
                        img:'../../static/img/a.jpg'
                    },
                    {
                        img:'../../static/img/b.jpg'
                    },
                    {
                        img:'../../static/img/c.jpg'
                    },
                ],
                currentIndex:1,
                distance:-600,
                transitionEnd: true,
                speed: this.initialSpeed
            };
        },
        created() {
            this.getData(this.cur_page,this.pageSize,this.userInfo.uid,this.select_word,this.select_cate);
        },
        computed: {
            ...mapState([
                'userInfo'
            ]),
            containerStyle() {
                return {
                    transform:`translate3d(${this.distance}px, 0, 0)`
                }
            }
        },
        methods: {
            /**
             * 通道费格式化
             */
            formatterChannel(row, column, cellValue, index){
                return '￥'+dividePrice(row.channel)
            },
            /**
             * 管理费格式化
             */
            formatterManageFee(row, column, cellValue, index){
                return '￥'+dividePrice(row.manageFee)
            },
            /**
             * 实际到账格式化
             */
            formatterActualAccount(row, column, cellValue, index){
                return '￥'+dividePrice(row.actualAccount)
            },
            /**
             * 运费格式化
             */
            formatterCarriage(row, column, cellValue, index){
                return '￥'+dividePrice(row.carriage)
            },
            /**
             * 分页
             */
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(val,this.pageSize,this.userInfo.uid,this.select_word,this.select_cate);
            },
            /**
             * 获取已处理订单列表数据
             */
            getData(pageNumber,pageSize,tenantUid,keyword,orderStatus) {
                listRefundOrder(pageNumber,pageSize,tenantUid,keyword,orderStatus).then(res =>{
                    console.log(res);
                    if (res.code === "0"){
                        this.listRefundOrderData = res.data.dataList
                        this.listRefundOrderDataTotal= res.data.total
                    }
                }).catch(err =>{
                    console.log(err)
                })
            },
            /**
             * 搜索
             * @param val
             */
            search() {
                this.getData(this.cur_page,this.pageSize,this.userInfo.uid,this.select_word,this.select_cate);
            },
            /**
             *
             */
            chooseStatus(){
                this.getData(this.cur_page,this.pageSize,this.userInfo.uid,this.select_word,this.select_cate);
            },
            /**
             * 列表数据
             * @param row
             * @param column
             * @returns {*}
             */
            formatter(row, column, cellValue, index) {
                // console.log("row:"+JSON.stringify(row)+"column:"+JSON.stringify(column)+"cellValue:"+cellValue+"index:"+index);
                if(row.orderPriceRmb !== 0){
                    row.orderPriceRmb = dividePrice(row.orderPriceRmb);
                    return row.orderPriceRmb;
                }else if(row.orderPriceSjb !== 0){
                    return row.orderPriceRmb;
                }else {
                    return '￥'+dividePrice(row.orderPriceRmb);
                }
            },
            /**
             * 点击查看详情弹出详情框
             * @param index
             * @param row
             */
            viewDetails(index, row) {
                console.log(index,row);
                if(row.orderStatus === '已发货' || row.orderStatus === '已完成' || row.orderStatus === '拒绝发货'){
                    console.log("已发货:已完成");
                    getShippedSend(row.orderNumber).then(res =>{
                        console.log("已发货+已完成+已拒绝发货:"+res);
                        if(res.code === "0"){
                            this.editVisibleTitle = row.orderStatus;
                            this.editVisible=true;//弹出框
                            this.returnGoods=false;//已拒绝发货
                            this.goodsOk=true;//已发货,已完成
                            this.returnMoney=false;//已退款状态
                            this.goodsDetail = res.data
                        }else {
                            this.$message.error(res.msg)
                        }
                    }).catch(err =>{
                        this.$message.error(err)
                    });
                }else if(row.orderStatus === '已退款'){
                    console.log("已退款")
                    orderDetailrefund(row.orderNumber).then(res =>{
                        console.log("已退款:"+res);
                        if(res.code === "0"){
                            this.editVisibleTitle = row.orderStatus;
                            this.editVisible=true;//弹出框
                            this.returnGoods=false;//已拒绝发货
                            this.goodsOk=false;//已发货,已完成
                            this.returnMoney=true;//已退款状态
                            this.goodsDetail = res.data
                        }else {
                            this.$message.error(res.msg)
                        }
                    }).catch(err =>{
                        this.$message.error(err)
                    });

                }
                // else if(row.orderStatus === '拒绝发货'){
                //     console.log("拒绝发货")
                //     getNoSendDetail(row.orderNumber).then(res =>{
                //         console.log("拒绝发货:"+res)
                //         if(res.code === "0"){
                //             this.editVisibleTitle = row.orderStatus;
                //             this.editVisible=true;//弹出框
                //             this.returnGoods=true;//已拒绝发货
                //             this.goodsOk=false;//已发货,已完成
                //             this.returnMoney=false;//已退款状态
                //             this.goodsDetail = res.data
                //         }else {
                //             this.$message.error(res.msg)
                //         }
                //     }).catch(err =>{
                //         this.$message.error(err)
                //     });
                // }
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
            /**
             * 表格头背景色
             * @param row
             * @param column
             * @param rowIndex
             * @param columnIndex
             * @returns {string}
             */
            getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                    return "background:#FCE4E4;height:60px;color:#606266;";
                } else {
                    return "";
                }
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
    .slider_img{
        width: 60%;
        height: 180px;
        margin: auto;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }



    .tabel_title{
        background-color: white;
        color: #ec414d;
        height: 40px;
        line-height: 40px;
        margin-bottom: 10px;
        text-indent: 8px;
    }
    .word_more p{
        margin-bottom: 10px;
    }
    .word_more p:first-child{
        color: #0e0908;
    }
    .word_more p:nth-child(2),.word_more p:last-child{
        color: #9d9d9d9d;
    }
    .word_one span:first-child{
        width: 50px;
        float: left;
    }
    .word_one span:last-child{
        width: 50px;
        float: right;
    }
    .dialog_rela p{
        height: 5px;
        background-color: #ec414d;
        width: 100%;
        position: absolute;
        top: 15px;
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
    .pagination {
        text-align: center;
    }
    .goods_detail_left {
        flex: 1;
    }
    .goods_detail_left div,.goods_detail_right div{
        padding: 5px;
    }
    .goods_detail_left div label,.goods_detail_right div label{
        color: black;
        /*font-weight: 600;*/
    }
    .goods_detail_right {
        flex: 1;
    }
    .product_detail label {
        float: left;
    }
    .product_detail p {
        margin-left: 70px;
    }
    .img_container li{
        width: 600px;
        height: 400px;
    }
    #img_slider img{
        user-select: none;
        width: 100%;
        height: 100%;
    }
</style>

