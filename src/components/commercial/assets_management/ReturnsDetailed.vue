<!--资产管理 收益统计与结算-->
<template>
    <div class="table">
        <div class="tabel_title">
            <h3>资产管理&nbsp;&nbsp;>&nbsp;&nbsp;结算明细</h3>
        </div>
        <div class="table">
            <div class="container">
                <div class="handle-box">
                    <h3>结算明细</h3>
                    <span class="good-total">共{{total_page?total_page:0}}条记录</span>
                    <span class="ordering-rule" style="left: 50%">结算状态：
                            <el-select v-model="select_cate" placeholder="全部" class="handle-select mr10" @change="getListData">
                            <el-option key="" label="全部" value=""></el-option>
                            <el-option key="1" label="待结算" value="1"></el-option>
                            <el-option key="2" label="结算中" value="2"></el-option>
                            <el-option key="3" label="已结算" value="3" class="last-el-option"></el-option>
                            </el-select>
                        </span>
                    <span class="search-option">
                            <span class="select-date">选择时间：</span>
                    <el-date-picker v-model="dateValue" @change="getListData" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" value-format=" yyyy-MM-dd" format="yyyy-MM-dd">
                    </el-date-picker>
                    </span>
                </div>
                <el-table :data="tableData" ref="multipleTable" :header-cell-style="getRowClass" @selection-change="handleSelectionChange">
                    <el-table-column prop="count" label="结算金额"></el-table-column>
                    <!-- <el-table-column prop="channel" label="通道费（5%）"></el-table-column>
                    <el-table-column prop="dividedInto" label="分成比例"></el-table-column>
                    <el-table-column prop="actualAccount" label="实际到账"></el-table-column> -->
                    <el-table-column prop="countAfter" label="待结算余额"></el-table-column>
                    <el-table-column prop="createTime" label="结算申请时间"></el-table-column>
                    <el-table-column prop="status" label="结算状态"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination 
                    background 
                    :current-page="cur_page" 
                    :page-size="pageSize" 
                    @current-change="handleCurrentChange" 
                    :pager-count="pages_count" 
                    layout="prev, pager, next, jumper" 
                    :total="total_page">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { listBillingDetails } from "../../common/request/request";
import { multiplyPrice,dividePrice } from "../../common/commonJS/commonjs.js";
export default {
  name: "basetable",
  data() {
    return {
      tenantUid: "",
      url: "/static/vuetable.json",
      dateValue: [],
      startTime: "",
      endTime: "",
      tableData: [],
      cur_page: 1,
      total_page: null,
      pages_count: null,
      pageSize: null,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      paginationShow: true,
      del_list: []
    };
  },
  mounted() {
    let self = this;
    self.tenantUid = self.userInfo.uid;
    self.getlistBillingDetails();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    getListData() {
      this.paginationShow = false;
      this.$nextTick(function() {
        this.paginationShow = true;
      });
      this.getlistBillingDetails();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getlistBillingDetails();
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#FCE4E4;height:60px;color:#606266;";
      } else {
        return "";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getlistBillingDetails() {
      let self = this;
      if (Boolean(self.dateValue) && self.dateValue.length > 0) {
        self.startTime = self.dateValue[0];
        self.endTime = self.dateValue[1];
      } else {
        self.startTime = "";
        self.endTime = "";
      }
      let param = {
        tenantUid: self.tenantUid,
        startTime: self.startTime,
        endTime: self.endTime,
        status: self.select_cate,
        pageNumber: self.cur_page,
        pageSize: 10
      };
      listBillingDetails(param).then(res => {
        if (res.data) {
          self.tableData = res.data.dataList;
          self.total_page = res.data.total;
          self.pageSize = res.data.pageSize;
          self.pages_count = res.data.pages;
          for (var i = 0; i < res.data.dataList.length; i++) {
            self.tableData[i].count = '￥' + dividePrice(res.data.dataList[i].count)
            self.tableData[i].countAfter = '￥' + dividePrice(res.data.dataList[i].countAfter)
          }
        } else {
          console.log("");
        }
      });
    }
  }
};
</script>


<style scoped>
.tabel_title {
  background-color: white;
  color: #ec414d;
  margin-bottom: 10px;
  text-indent: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px 0;
}
.tabel_title h3 {
  border-left: 5px solid;
  height: 25px;
  line-height: 25px;
}
.handle-box {
  height: 51px;
  position: relative;
}
.handle-box h3 {
  position: absolute;
}
.good-total {
  font-weight: 400;
  font-size: 14px;
  color: #606266;
  cursor: text;
  margin-left: 80px;
}
.handle-select {
  width: 140px;
}
.last-el-option {
  margin-bottom: 15px;
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
.select-date {
  font-weight: 400;
  font-size: 14px;
  color: #606266;
  cursor: text;
}
.pagination {
  text-align: center;
}
</style>
