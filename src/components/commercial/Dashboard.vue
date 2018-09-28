<template>
  <div>
    <el-row :gutter="20">
      <el-col>
        <el-row :gutter="20" class="mgb20">
          <el-col>
            <el-card shadow="hover" :body-style="{padding: '0px',height:'125px'}">
              <div class="grid-content grid-con-1" :body-style="{padding: '0px',marginTop:'25px'}">
                <div class="grid-cont-right">
                  <div class="word_goods">总收益</div>
                  <div class="grid-num">￥{{totalCoin}}
                    <router-link class="look_goods" :to="'/incomestatistics'">查看</router-link>
                  </div>
                </div>
                <div class="grid-cont-right">
                  <div class="word_goods">待发货订单</div>
                  <div class="grid-num">{{toSendOrderCount}}个
                    <router-link class="look_goods" :to="'/untreatedOrders'">查看</router-link>
                  </div>
                </div>
                <div class="grid-cont-right">
                  <div class="word_goods">待退款订单</div>
                  <div class="grid-num">{{toRefundOrderCount}}个
                    <router-link class="look_goods" :to="{ path: '/untreatedOrders', query: { activeName: 'second' }}">查看</router-link>
                  </div>
                </div>
                <div class="grid-cont-right">
                  <div class="word_goods">待补货商品</div>
                  <div class="grid-num">{{toFillCount}}个
                    <router-link class="look_goods" :to="'/onlineManagement'">查看</router-link>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <img width="100%" height="60px" :src="advertisingOne" alt="">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="17">
            <el-card shadow="hover" :body-style="{ height: '100%'}">
              <el-scrollbar style="height:420px">
                <div slot="header" class="clearfix">
                  <span>公告</span>
                  <!--<el-button style="float: right; padding: 3px 0" type="text">添加</el-button>-->
                </div>
                <el-table :data="noticeList" :show-header="false" style="width: 100%;font-size:14px;">
                  <el-table-column>
                    <template slot-scope="scope">
                          <div class="todo-item" @click="getNoticeDetail(scope.row.noticeId)">{{scope.row.title}}<label style="float: right">{{scope.row.createTime}}</label></div>
                    </template>
                          </el-table-column>
                        </el-table>
                        </el-scrollbar>
                    </el-card>
                    </el-col>
                    <el-col :span="7">
                        <img width="100%" height="222px" :src="advertisingTwo" alt="">
                    </el-col>
                    <el-col :span="7" class="padding-top-10">
                        <img width="100%" height="222px" :src="advertisingThree" alt="">
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <div class="red_header">
            <el-dialog title="公告详情" :visible.sync="dialogVisible" width="40%"  :before-close="handleClose">
              <div class="notice_wrap">
                <h3>{{noticeTitle}}</h3>
                <span class="notice_time">{{noticeCreateTime}}</span>
                <p v-html="noticeContent"></p>
              </div>
                <span slot="footer" class="dialog-footer">      
                  <el-button class="close_dialog" type="primary" @click="dialogVisible = false">关闭窗口</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { dividePrice } from "../common/commonJS/commonjs.js";
import {
  viewDetail,
  getNoticeDetail
} from "../common/request/request.js";
export default {
  name: "dashboard",
  data() {
    return {
      tenantUid: "",
      dialogVisible: false,
      dialogContext: "",
      token: "",
      name: localStorage.getItem("ms_username"),
      noticeList: [],
      advertisingList: [],
      toFillCount: null,
      toRefundOrderCount: null,
      toSendOrderCount: null,
      totalCoin: null,
      advertisingOne: "",
      advertisingTwo: "",
      advertisingThree: "",
      noticeContent: "",
      noticeCreateTime: "",
      noticeTitle: ""
    };
  },
  mounted() {
    this.tenantUid = this.userInfo.uid;
    this.getViewDetail();
  },
  computed: {
    ...mapState(["userInfo"]),
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#EFEFEF";
      } else {
        return "";
      }
    },
    handleClose(done) {
      this.dialogVisible = true;
      done();
    },
    clickDialog(noticeId) {
      this.dialogContext = e.target.innerText;
    },
    getViewDetail() {
      let self = this;
      viewDetail(this.tenantUid)
        .then(res => {
          if (res.data) {
            self.noticeList = res.data.noticeList;
            self.advertisingList = res.data.advertisingList;
            self.toFillCount = res.data.toFillCount;
            self.toRefundOrderCount = res.data.toRefundOrderCount;
            self.toSendOrderCount = res.data.toSendOrderCount;
            self.totalCoin = dividePrice(res.data.totalCoin);
            self.advertisingList.forEach(item => {
              if (item.id == 1) {
                self.advertisingOne = item.imgUrl;
              } else if (item.id == 2) {
                self.advertisingTwo = item.imgUrl;
              } else if (item.id == 3) {
                self.advertisingThree = item.imgUrl;
              }
            });
          } else {
            console.log("");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNoticeDetail(noticeId) {
      let self = this;
      this.dialogVisible = true;
      getNoticeDetail(noticeId)
        .then(res => {
          if (res.data) {
            self.noticeContent = res.data.content;
            self.noticeCreateTime = res.data.createTime;
            self.noticeTitle = res.data.title;
          } else {
            console.log("");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>


<style scoped>
.grid-num {
  position: relative;
}
.grid-con-1 {
  margin-top: 25px;
}
.look_goods {
  position: absolute;
  right: 50px;
  bottom: 0;
  font-size: 14px;
  color: cornflowerblue;
  font-weight: normal;
}
.word_goods {
  margin: 15px 0;
  font-size: 16px;
  color: black;
}
.padding-top-10 {
  padding-top: 10px;
}
.el-row {
  margin-bottom: 20px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
  border-right: 1px solid #999;
}
.grid-content :nth-last-child(1) {
  border: none;
}
.grid-num {
  font-size: 16px;
  font-weight: 600;
}
.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
  color: rgb(14, 9, 8);
}
.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
  color: rgb(14, 9, 8);
}
.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
  color: rgb(14, 9, 8);
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}
.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.user-info-list span {
  margin-left: 70px;
}
.mgb20 {
  margin-bottom: 20px;
}
.todo-item {
  font-size: 14px;
  margin-right: 20px;
}
.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.notice_wrap {
  width: 60%;
  margin: auto;
}
.notice_time {
  display: inline-block;
  margin: 15px 0 40px 0;
}
</style>
