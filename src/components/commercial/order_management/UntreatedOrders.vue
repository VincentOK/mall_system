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
                    <span class="good-total" v-if="activeName == 'first'">共{{untreatedordersCount}}个商品</span>
                    <span class="good-total" v-if="activeName == 'second'">共{{refundordersCount}}个商品</span>
                    <span class="search-option">
                    <el-input v-model="select_word" placeholder="按商品名称搜索" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search(select_word)">搜索</el-button>
                </span>
                </div>
                <div v-if="activeName == 'first'">
                    <el-table :data="getDatauntreatedOrders"  ref="multipleTable" :header-cell-style="getRowClass">
                        <el-table-column prop="commodityPrizeimgUrl" label="" min-width="50%" >
                            <template  slot-scope="scope">
                                <img :src="scope.row.commodityPrizeimgUrl"  min-width="70" height="70" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="commodityPrizeName" label="商品">
                        </el-table-column>
                        <el-table-column prop="unit" label="出售规格" width="100"></el-table-column>
                        <el-table-column prop="count" label="购买数量" >
                        </el-table-column>
                        <el-table-column prop="orderPriceRmb" label="支付金额" :formatter="formatterAnother">
                        </el-table-column>
                        <el-table-column prop="carriage" label="运费" :formatter="formatterCarriage">
                        </el-table-column>
                        <el-table-column prop="receivingName" label="收货人" ></el-table-column>
                        <el-table-column prop="receivingAddress" label="收货地址"></el-table-column>
                        <el-table-column prop="receivingPhone" label="手机号码"></el-table-column>
                        <el-table-column prop="orderTime" label="下单时间">
                        </el-table-column>
                        <!--<el-table-column prop="address" label="订单状态" :formatter="formatter"></el-table-column>-->
                        <el-table-column label="操作" align="center" width="280">
                            <template slot-scope="{row,$index}">
                                <!--<el-button size="small" type="text" style="color:#66b1ff;"-->
                                <!--@click="viewDetails($index, row)">查看详情</el-button>-->
                                <el-button size="small" type="text" style="color:#66b1ff;"
                                           @click="viewDetails($index,row.orderNumber)">查看详情</el-button>
                                <el-button size="small" type="text" style="color:#66b1ff;"
                                           @click="handleSave($index, row.orderNumber)">确认发货</el-button>
                                <el-button size="small" type="text"
                                           @click="handleDelete($index, row)">拒绝发货</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            background
                            @size-change="sizeChange"
                            @current-change="handleCurrentChange"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="untreatedordersCount">
                        </el-pagination>
                    </div>
                </div>
                <div v-if="activeName == 'second'">
                    <el-table :data="getDatarefundOrders"  ref="multipleTable" :header-cell-style="getRowClass">
                            <el-table-column prop="commodityPrizeimgUrl" label="" min-width="50%" >
                                <template  slot-scope="scope">
                                    <img :src="scope.row.commodityPrizeimgUrl"  min-width="70" height="70" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="commodityPrizeName" label="商品"></el-table-column>
                            <el-table-column prop="unit" label="出售规格"  width="100"></el-table-column>
                            <el-table-column prop="count" label="购买数量" >
                            </el-table-column>
                            <el-table-column prop="orderPriceRmb" label="支付金额"  :formatter="formatterAnother">
                            </el-table-column>
                            <el-table-column prop="carriage" label="运费" :formatter="formatterCarriage">
                            </el-table-column>
                            <el-table-column prop="reason" label="退款原因" ></el-table-column>
                            <el-table-column prop="contacts" label="联系人" ></el-table-column>
                            <el-table-column prop="phone" label="联系电话"></el-table-column>
                            <el-table-column prop="createTime" label="退款申请时间">
                            </el-table-column>

                            <el-table-column label="操作" align="center" width="280">
                                <template slot-scope="{row,$index}">
                                    <!--<el-button size="small" type="text" style="color:#66b1ff;"-->
                                               <!--@click="viewDetails($index, row)">查看详情</el-button>-->
                                    <el-button size="small" type="text" style="color:#66b1ff;"
                                               @click="viewDetailsRefund($index, row.orderNumber)">查看详情</el-button>
                                    <el-button v-if="row.orderStatus === '4'" size="small" type="text" style="color:#66b1ff;"
                                               @click="agreeDetails($index, row)" >同意退款</el-button>
                                    <el-button  v-if="row.orderStatus === '4'" size="small" type="text"
                                               @click="notagreePay($index, row)">拒绝退款</el-button>
                                    <el-button  v-if="row.orderStatus === '9'" size="small" type="text"
                                                @click="sureagreePay($index, row)">执行退款</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    <div class="pagination">
                            <el-pagination
                                background
                                @current-change="handleCurrentChangeRefund"
                                :page-size="pageSizerefund"
                                :pager-count="pageNumrefund"
                                layout="prev, pager, next, jumper"
                                :total="refundordersCount">
                            </el-pagination>
                        </div>
                </div>
            </div>

            <!-- 待发货详情弹出框 -->
            <el-dialog id="viewDetail" v-if="order_detail" title="订单详情-待发货" :visible.sync="editVisible" width="40%" :lock-scroll='true' top="100px">
                <div class="goods_detail">
                    <el-scrollbar style="height:300px;">
                        <h4>订单信息</h4>
                        <div class="one_detail">
                            <div class="goods_detail_left">
                                <div>
                                    商品名称：<label>{{order_detail.commodityPrizeName}}</label>
                                </div>
                                <div>
                                    出售规格：<label>{{order_detail.unit}}</label>
                                </div>
                                <div>
                                    购买数量：<label>{{order_detail.count}}</label>
                                </div>
                                <div>
                                    下单时间：<label>{{order_detail.orderTime}}</label>
                                </div>
                            </div>
                            <div class="goods_detail_right">
                                <div>
                                    订单号：<label>{{order_detail.orderNumber}}</label>
                                </div>
                                <div>
                                    支付流水号：<label>{{order_detail.payNumber}}</label>
                                </div>
                                <div>
                                    支付金额：<label>{{order_detail.totalPrice | formMoney(order_detail.totalPrice)}}</label>
                                </div>
                            </div>
                        </div>
                        <h4>买家信息</h4>
                        <div class="one_detail">
                            <div class="goods_detail_left">
                                <div>
                                    买家昵称：<label>{{order_detail.nickName}}</label>
                                </div>
                                <div>
                                    手机号：<label>{{order_detail.shippingPhone}}</label>
                                </div>
                            </div>
                            <div class="goods_detail_right">
                                <div>
                                    收货人：<label>{{order_detail.shippingName}}</label>
                                </div>
                                <div>
                                    收货地址：<label>{{order_detail.address}}</label>
                                </div>
                            </div>
                        </div>
                        <h4>买家信息<label class="buy_notive">*请联系买家沟通开具专用发票相关事宜</label></h4>
                        <div class="one_detail">
                            <div class="goods_detail_left">
                                <div>
                                    买家索要发票：<label>{{order_detail.support}}</label>
                                </div>
                            </div>
                            <div class="goods_detail_right">
                                <div>
                                    发票类型：<label>{{order_detail.invoiceName}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="one_detail" v-if="order_detail.support === '是'">
                            <div class="goods_detail_left">
                                <div>
                                    发票单位名称：<label>{{order_detail.typeName}}</label>
                                </div>
                            </div>
                            <div class="goods_detail_right">
                                <div>
                                    纳税人识别号：<label>{{order_detail.invoiceCode}}</label>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" type="primary">关闭窗口</el-button>
            </span>
            </el-dialog>



            <!-- 待退款详情弹出框 -->
            <el-dialog id="viewDetail" v-if="goodsDetail" title="订单详情-待退款" :visible.sync="editVisibleRefund" width="40%" :lock-scroll='true' top="200px">
                <div class="goods_detail">
                    <el-scrollbar style="height:500px;">
                        <!--已退款-->
                        <div>
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
                    </el-scrollbar>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleRefund = false" type="primary">关闭窗口</el-button>
            </span>
            </el-dialog>


            <!-- 确认发货提示框 -->
            <el-dialog id="el-title" title="确认发货" :visible.sync="ConfirmTheDelivery" width="460px" center top="300px" :show-close="false">
                <div>
                    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                        <el-form-item label="快递公司:" prop="logisticsName">
                          <el-input v-model="form.logisticsName" placeholder="请输入快递公司名称" ></el-input>
                        </el-form-item>
                        <el-form-item label="快递单号:" prop="logisticsNumber">
                            <el-input v-model="form.logisticsNumber" placeholder="请输入快递单号"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                <el-button @click="ConfirmTheDelivery = false">取 消</el-button>
            </span>
            </el-dialog>

            <!-- 拒绝发货提示框 -->
            <el-dialog id="el-title" title="拒绝发货" :visible.sync="delVisible" width="460px" center top="300px" :show-close="false">
                <div class="">
                    <div class="refund_title_word">拒绝买家<label style="color: #ec414d">{{refund_name}}</label>的发货请求？</div>
                    <el-form ref="refund_form" :model="form_refund" :rules="refundRules" label-width="100px">
                        <el-form-item label="拒绝原因：" prop="surereason">
                            <el-input type="textarea" v-model="form_refund.surereason"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="notdelVisible('refund_form')">确 定</el-button>
                <el-button @click="delVisible = false">取 消</el-button>
            </span>
            </el-dialog>



            <!-- 同意退款提示框 -->
            <el-dialog id="el-title" title="同意退款" :visible.sync="agreeVisible" width="460px" center top="300px" :show-close="false">
                <div class="">
                    <div class="refund_title_word">同意买家<label style="color: #ec414d">{{refund_name}}</label>的退货退款请求？</div>
                    <div  v-if="form_agree.sureStatus" >
                        <el-form ref="agreerulesform" :model="form_agree" :rules="form_agreerules" label-width="100px">
                            <el-form-item label="收件人:" prop="shippingName">
                                <el-input v-model="form_agree.shippingName" placeholder="请输入收件人" ></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话:" prop="shippingPhone">
                                <el-input v-model="form_agree.shippingPhone" placeholder="请输入联系电话" ></el-input>
                            </el-form-item>
                            <el-form-item label="收货地址:" prop="detailAddress">
                                <el-input v-model="form_agree.detailAddress" placeholder="请输入收货地址" ></el-input>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="agreedelVisible('agreerulesform')">确 定</el-button>
                <el-button @click="agreeVisible = false">取 消</el-button>
            </span>
            </el-dialog>


            <!-- 拒绝退款提示框 -->
            <el-dialog id="el-title" title="拒绝退款" :visible.sync="notagreeVisible" width="460px" center top="300px" :show-close="false">
                <div class="">
                    <div class="refund_title_word">拒绝买家<label style="color: #ec414d">{{form_notrefund.name}}</label>的退款请求？</div>
                    <el-form ref="form_re" :model="form_notrefund" :rules="form_notrefundRules" label-width="100px">
                        <el-form-item label="拒绝原因：" prop="desc">
                            <el-input type="textarea"  v-model="form_notrefund.desc"></el-input>
                        </el-form-item>
                    </el-form>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="notagreedelVisible('form_re')">确 定</el-button>
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
                        <p>同意向卖家<label style="color: #ec414d">{{surePayGoods.name}}</label></p>
                        <p>退还<label style="color: #ec414d">{{surePayGoods.money}}</label>的商品基本款项？</p>
                        <p>退款金额将从您的平台账户扣除，请仔细检查买家寄回的货品后再退款</p>
                    </div>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="suragreedelVisible">确 定</el-button>
                <el-button @click="sureagree = false">取 消</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
  getUntreatedOrdersList,
  orderDetail,
  ConfirmDelivery,
  RefuseDelivery,
  listRefund,
  confrimRefund,
    confrimRefundNo,
    refusedRefund,
    executeRefund,
    orderDetailrefund
} from "../../common/request/request";
import { mapState, mapMutations, mapActions } from "vuex";
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
      getDatauntreatedOrders: [], //待处理订单数据
      untreatedordersCount: null, //待处理订单总数
      getDatarefundOrders: [], //待退款订单数据
      refundordersCount: null, //待退款订单总数

      pageNum: 1, //页码
      pageSize: 5, //每页条数
      pageNumrefund: 1,
      pageSizerefund: 5,

        goodsDetail:null,//待退款详情
      order_detail: null,//待发货详情
      activeName: "first",
      dateValue: "",
      tableData: [],
      select_cate: "",
      select_word: "", //待发货搜索关键字
      del_list: [],
      editVisible: false, //待发货商品详情提示框
        editVisibleRefund:false,//待退款商品详情提示框
      delVisible: false, //拒绝发货提示框
      ConfirmTheDelivery: false, //确认发货提示框
      agreeVisible: false, //同意退款提示框
      notagreeVisible: false, //拒绝退款提示框
      sureagree: false, //同意执行退款提示框
      refund_name: "", //弹框详情的用户名
        surePayGoods:{//执行退款弹框信息
            ordernumber:'',
          name:'',
            money:''
        },
      form_notrefund: {//拒绝退款
          name:'',
          ordernumber: "",
          desc: ""
      },
        form_notrefundRules: {
            desc: [
                { required: true, message: "请输入拒绝退款原因", trigger: "blur" }
            ]
        },
      form_agree: {
          sureStatus:false,
          orderNumber: "",
        shippingName: "",
        detailAddress: "",
        shippingPhone: "",
        shippingAddress: ""
      },
      form_agreerules: {
        shippingName: [
          { required: true, message: "请输入收货名", trigger: "blur" }
        ],
        detailAddress: [
          { required: true, message: "请输入收货地址", trigger: "blur" }
        ],
        shippingPhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ]
      },
      form: {
        ordernumber: "",
        logisticsName: "",
        logisticsNumber: ""
      },
      rules: {
        logisticsName: [
          { required: true, message: "请输入快递公司", trigger: "blur" }
        ],
        logisticsNumber: [
          { required: true, message: "请输入运单号", trigger: "blur" }
        ]
      },
      form_refund: {
        orderNumber: "",
        surereason: ""
      },
      refundRules: {
        surereason: [
          { required: true, message: "请输入拒绝发货原因", trigger: "blur" }
        ]
      },
      idx: -1,
      currentIndex: 1,
      distance: -600,
      transitionEnd: true,
      speed: this.initialSpeed
    };
  },
  created() {
    let self = this;
    if (self.$route.query.activeName) {
      self.activeName = self.$route.query.activeName;
    }
    this.getData(this.pageNum, this.pageSize, this.userInfo.uid);
    this.getrefundData(this.pageNum, this.pageSize, this.userInfo.uid);
  },
  mounted() {},
  computed: {
    ...mapState(["userInfo"]),
    containerStyle() {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      };
    }
  },
  methods: {
    /**
     *点击切换待处理订单与待退款订单
     */
    handleClick(tab, e) {
      this.$nextTick(function() {
        this.activeName = tab.name;
        console.log(tab.index, tab.name, tab.label, this.activeName);
      });
    },
    /**
     * 待处理订单根据页码获取数据
     * @param val
     */
    handleCurrentChange(val) {
      console.log("当前页：" + val);
      this.getData(val, this.pageSize, this.userInfo.uid);
    },
    sizeChange(val) {
      console.log("123123123123:" + val);
    },
    /**
     * 待退款订单根据页码获取数据
     * @param val
     */
    handleCurrentChangeRefund(val) {
      console.log("当前页：" + val);
      this.getrefundData(val, this.pageSize, this.userInfo.uid);
    },
    /**
     * 获取待发货订单数据
     * @param pageNum//每页条数
     * @param pageSize//页码
     * @param uid//用户id
     * @param keyword//关键字
     */
    getData(pageNum, pageSize, uid, keyword) {
      getUntreatedOrdersList(pageNum, pageSize, uid, keyword)
        .then(res => {
          console.log("JSON待发货:" + JSON.stringify(res));
          this.getDatauntreatedOrders = res.data.dataList;
          this.untreatedordersCount = parseInt(res.data.total);
        })
        .catch(err => {
          console.log(err);
        });
    },

    /**
     * 获取待退款订单数据
     * @param pageNum//每页条数
     * @param pageSize//页码
     * @param uid//用户id
     * @param keyword//关键字
     */
    getrefundData(pageNum, pageSize, uid) {
      listRefund(pageNum, pageSize, uid)
        .then(res => {
          console.log("JSON待退款:" + JSON.stringify(res));
          this.getDatarefundOrders = res.data.dataList;
                this.refundordersCount = parseInt(res.data.total);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 根据关键字搜索待发货订单
     * @param val
     */
    search(val) {
      console.log(val);
      this.getData(this.pageNum, this.pageSize, this.userInfo.uid, val);
    },
    /**
     * 待处理订单单条数据
     */
    formatterO(row, column, cellValue, index) {
        console.log("=========row==========:"+JSON.stringify(row)+"column:"+JSON.stringify(column)+"cellValue:"+cellValue+"index:"+index);
        debugger;
        if(row.orderPriceRmb != 0){
            row.orderPriceRmb = dividePrice(row.orderPriceRmb);
            return '￥'+row.orderPriceRmb;
        }else if(row.orderPriceSjb != 0){
            return row.orderPriceRmb;
        }else {
            return '￥'+dividePrice(row.orderPriceRmb);
        }
    },
      /**
       * 待处理订单单条数据
       */
      formatterAnother(row, column, cellValue, index) {
          console.log("=========row==========:"+JSON.stringify(row)+"column:"+JSON.stringify(column)+"cellValue:"+cellValue+"index:"+index);
          let orderPrice = 0;
          if(row.orderPriceRmb != 0){
              orderPrice = '￥'+dividePrice(row.orderPriceRmb);
          }else if(row.orderPriceSjb != 0){
              orderPrice = dividePrice(row.orderPriceSjb);
          }else {
              orderPrice = '￥'+dividePrice(row.orderPriceRmb);
          }
          return orderPrice
      },
      /**
       *
       */
      formatterCarriage(row, column, cellValue, index){
          return '￥'+dividePrice(row.carriage)
      },
    /**
     * 待退款订单单条数据
     */
    formatterrefund(row, column) {
      return row;
    },
    /**
     * 根据订单号获取待发货订单详情
     * @param index
     * @param ordernumber
     */
    viewDetails(index, ordernumber) {
      console.log(index, ordernumber);
      orderDetail(ordernumber)
        .then(res => {
          console.log(res);
          if (res.code === "0") {
            this.editVisible = true;
            this.order_detail = res.data;
          } else {
            this.$message(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
      /**
       * 根据订单号获取待退款详情框
       */
      viewDetailsRefund(index, ordernumber){
          console.log(index, ordernumber);
          console.log("待退款")
          orderDetailrefund(ordernumber).then(res =>{
              console.log("待退款:"+res);
              if(res.code === "0"){
                  this.editVisible=false; //待发货商品详情提示框
                  this.delVisible=false;//拒绝发货提示框
                  this.ConfirmTheDelivery=false;//确认发货提示框
                  this.agreeVisible=false;//同意退款提示框
                  this.notagreeVisible =false;//拒绝退款提示框
                  this.editVisibleRefund=true;//待退款商品详情提示框
                  this.goodsDetail = res.data
              }else {
                  this.$message.error(res.msg)
              }
          }).catch(err =>{
              this.$message.error(err)
          });

      },
    /**
     * 确认发货弹出确认收货弹框
     * @param index
     * @param row
     */
    handleSave(index, ordernumber) {
      this.ConfirmTheDelivery = true;
      this.form.ordernumber = ordernumber;
    },
    /**
     * 拒绝发货弹出拒绝发货弹框
     * @param index
     * @param row
     */
    handleDelete(index, row) {
      console.log(index, row);
      this.idx = index;
      this.refund_name = row.shippingName;
      this.form_refund.orderNumber = row.orderNumber;
      this.delVisible = true;
    },
    /**
     * 同意退款弹框
     */
    agreeDetails(index, row) {
      console.log(index, row);
      this.idx = index;
      this.refund_name = row.shippingName;
      this.form_agree.orderNumber = row.orderNumber;
      if(row.sendOut == 'N'){
          this.form_agree.sureStatus = false;
      }else {
          this.form_agree.sureStatus = true;
      }
      this.agreeVisible = true;
    },
    //拒绝退款弹框
    notagreePay(index, row) {
      console.log(index, row);
      this.idx = index;
      this.form_notrefund.ordernumber = row.orderNumber;
      this.form_notrefund.name = row.contacts;
      this.notagreeVisible = true;
    },
      //执行退款弹框
      sureagreePay(index,row){
          console.log(index, row);
          this.idx = index;
          this.surePayGoods.name=row.contacts;
          this.surePayGoods.money=row.orderPriceRmb;
          this.surePayGoods.ordernumber=row.orderNumber;
          this.sureagree = true;
      },
    /**
     *设置表格头颜色
     */
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#FCE4E4;height:60px;color:#606266;";
      } else {
        return "";
      }
    },
    /**
     * 确认发货
     * @constructor
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ConfirmTheDelivery = false;
          console.log(this.form);
          ConfirmDelivery(this.form)
            .then(res => {
              console.log(res);
              if (res.code === "0") {
                  this.getData(this.pageNum, this.pageSize, this.userInfo.uid);
                this.$message("确认发货成功");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    /**
     * 点击确认拒绝发货按钮
     * @param formName
     */
    notdelVisible(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.delVisible = false;
          console.log(this.form_refund);
          RefuseDelivery(this.form_refund)
            .then(res => {
              console.log(res);
              if (res.code === "0") {
                  this.getData(this.pageNum, this.pageSize, this.userInfo.uid);
                this.$message("您已确认拒绝发货");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    /**
     * 点击同意退款
     * @param agreerulesform
     */
    agreedelVisible(formName) {
        if(this.form_agree.sureStatus){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.form_agree);
                    confrimRefund(this.form_agree,'1')
                        .then(res => {
                            console.log(res);
                            if (res.code === "0") {
                                this.agreeVisible = false;
                                this.getrefundData(this.pageNum, this.pageSize, this.userInfo.uid);
                                this.$message("确认退款成功");
                            } else {
                                this.$message.error(res.msg);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            });
        }else {
            confrimRefundNo(this.form_agree.orderNumber,'0')
                .then(res => {
                    console.log(res);
                    if (res.code === "0") {
                        this.agreeVisible = false;
                        this.getrefundData(this.pageNum, this.pageSize, this.userInfo.uid);
                        this.$message("确认退款成功");
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

    },
    //拒绝退款
    notagreedelVisible(formName) {
        console.log(this.form_notrefund);
        this.$refs[formName].validate(valid => {
            if (valid) {
                refusedRefund(this.form_notrefund.ordernumber,this.form_notrefund.desc).then(res =>{
                    console.log("拒绝退款:"+JSON.stringify(res));
                    if(res.code == '0'){
                        this.notagreeVisible = false;
                        this.getrefundData(this.pageNum, this.pageSize, this.userInfo.uid);
                        this.$message('拒绝退款成功')
                    }else {
                        this.$message.error(res.msg)
                    }
                }).catch(err =>{
                    console.log(err)
                })
            }
        });

    },
      /**
       * 确认执行退款、
       */
      suragreedelVisible(){
          console.log(JSON.stringify(this.surePayGoods))
          executeRefund(this.surePayGoods.ordernumber).then(res =>{
              console.log("确认执行退款:"+JSON.stringify(res))
              if(res.code == '0'){
                  this.getrefundData(this.pageNum, this.pageSize, this.userInfo.uid);
                  this.sureagree = false;
                  this.$message('执行退款成功')
              }else {
                  this.$message.error(res.msg)
              }
          }).catch(err =>{
              console.log(err)
          })
      },
      /**
       *
       * @param offset
       * @param direction
       * @param speed
       */
    move(offset, direction, speed) {
      if (!this.transitionEnd) return;
      this.transitionEnd = false;
      direction === -1
        ? (this.currentIndex += offset / 600)
        : (this.currentIndex -= offset / 600);
      if (this.currentIndex > 5) this.currentIndex = 1;
      if (this.currentIndex < 1) this.currentIndex = 5;

      const destination = this.distance + offset * direction;
      this.animate(destination, direction, speed);
    },
    animate(des, direc, speed) {
      if (this.temp) {
        window.clearInterval(this.temp);
        this.temp = null;
      }
      this.temp = window.setInterval(() => {
        if (
          (direc === -1 && des < this.distance) ||
          (direc === 1 && des > this.distance)
        ) {
          this.distance += speed * direc;
        } else {
          this.transitionEnd = true;
          window.clearInterval(this.temp);
          this.distance = des;
          if (des < -3000) this.distance = -600;
          if (des > -600) this.distance = -3000;
        }
      }, 20);
    }
  }
};
</script>

<style scoped>
.word_more p {
  margin-bottom: 10px;
}
.word_more p:first-child {
  color: #0e0908;
}
.word_more p:nth-child(2),
.word_more p:last-child {
  color: #9d9d9d9d;
}
.word_one {
  font-size: 12px;
  height: 40px;
}
.word_one span:first-child {
  width: 50px;
  float: left;
}
.word_one span:last-child {
  width: 50px;
  float: right;
}
.dialog_two {
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
.dialog_one {
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
.dialog_rela p {
  height: 5px;
  background-color: #ec414d;
  width: 100%;
  position: absolute;
  top: 15px;
}
.dialog_rela {
  position: relative;
  height: 35px;
  width: 100%;
  margin: auto;
}
.sure_agree {
  width: 65%;
  margin: auto;
  text-align: center;
}
.refund_title_word {
  width: 90%;
  margin: auto;
  text-align: left;
  padding: 0px 0 10px 0;
}
.buy_notive {
  font-size: 12px;
  color: #ec414d;
}
.one_detail {
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
.goods_detail_left div,
.goods_detail_right div {
  padding: 10px;
}
.goods_detail_left div label,
.goods_detail_right div label {
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
#img_slider {
  text-align: center;
}
.img_window {
  position: relative;
  width: 600px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
}
.img_container {
  display: flex;
  position: absolute;
}
.img_container li {
  width: 600px;
  height: 400px;
}
.left,
.right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
}
.left {
  left: 3%;
  padding-left: 12px;
  padding-top: 10px;
}
.right {
  right: 3%;
  padding-right: 12px;
  padding-top: 10px;
}
#img_slider img {
  user-select: none;
  width: 100%;
  height: 100%;
}
</style>

