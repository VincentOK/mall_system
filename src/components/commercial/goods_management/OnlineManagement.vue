<template>
    <div class="table">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="出售中" name="first"></el-tab-pane>
        <el-tab-pane label="已下架" name="second"></el-tab-pane>
        <el-tab-pane label="审核中" name="third"></el-tab-pane>
      </el-tabs>
      <div class="table">
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                <span class="on-offer" v-show="activeName == 'first'">出售中</span>
                <span class="on-offer" v-show="activeName == 'second'">已下架</span>
                <span class="on-offer" v-show="activeName == 'third'">审核中</span>
                <span class="good-total">共{{total_page?total_page:0}}个商品</span>
                <span class="ordering-rule" v-show="activeName == 'second'">排序规则：
                <el-select v-model="select_cate" placeholder="请选择排序规则" class="handle-select mr10"  @change="getListData">
                    <el-option key="1" label="默认（按上架时间从近至远）" value="1"></el-option>
                    <el-option key="2" label="按总浏览量从高至低" value="2"></el-option>
                    <el-option key="3" label="按总浏览量从低至高" value="3"></el-option>
                    <el-option key="4" label="按销量从高至低" value="4"></el-option>
                    <el-option key="5" label="按销量从低至高" value="5" class="last-el-option"></el-option>
                </el-select>
                </span>
                <!-- <span class="ordering-rule" v-show="activeName != 'second'">结算状态：
                <el-select v-model="select_cate" placeholder="全部" class="handle-select mr10">
                    <el-option key="1" label="默认" value="默认（按上架时间从近至远）"></el-option>
                    <el-option key="2" label="按总浏览量从高至低" value="按总浏览量从高至"></el-option>
                    <el-option key="3" label="按总浏览量从低至高" value="按总浏览量从低至"></el-option>
                    <el-option key="4" label="按销量从高至低" value="按销量从高至低"></el-option>
                    <el-option key="5" label="" value="按销量从低至高" class="last-el-option"></el-option>
                </el-select>
                </span> -->
                <span class="date-options">
                    <span class="select-date">选择日期：</span>
                    <el-date-picker
                        v-model="dateValue"
                        @change="getListData"
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format=" yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                </span>
                <span class="search-option">
                    <el-input v-model="select_word" placeholder="按商品名称搜索" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="searchQuery">搜索</el-button>
                    <el-button class="clear-button" type="default" icon="search" @click="clearSearch">清空</el-button>
                </span>
            </div>
            <div v-show="activeName != 'third'">
            <el-table :data="tableData"  ref="multipleTable" :header-cell-style="getRowClass" @selection-change="handleSelectionChange">
                <el-table-column prop="imgUrl" label="" min-width="50%" >
                    <template  slot-scope="scope">
                        <img :src="scope.row.imgUrl"  min-width="70" height="70" />
                    </template>
                </el-table-column>
                <el-table-column prop="commodityName" label="商品"></el-table-column>
                <el-table-column prop="unit" label="出售规格" width="100"></el-table-column>
                <el-table-column prop="realityPrice" label="实际售价">
                  <template slot-scope="{row,$index}">
                    ￥<el-input v-if="row.showEdit" v-model="row.realityPrice" maxlength="7" size="small" style="width:100px" onkeypress='return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    <span v-if="!row.showEdit">{{row.realityPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="suggestPrice" label="建议售价">
                  <template slot-scope="{row,$index}">
                    ￥<el-input v-if="row.showEdit" v-model="row.suggestPrice" maxlength="7" size="small" style="width:100px" onkeypress='return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    <span v-if="!row.showEdit">{{row.suggestPrice}}</span>
                  </template>
                </el-table-column>
                  <el-table-column prop="totalBrowseNumber" label="总浏览量"></el-table-column>
                  <el-table-column prop="userBrowseNumber" label="独立浏览量"></el-table-column>
                  <el-table-column prop="sales" label="已售"></el-table-column>
                <el-table-column prop="inventory" label="剩余库存">
                  <template slot-scope="{row,$index}">
                    <div class="surplus_stock">
                    <el-input v-if="row.showEdit" v-model="row.inventory"  size="small" style="width:120px" maxlength="4" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'>
                      <template slot="prepend"><span @click="plusMath(row)">+</span></template>
                      <template slot="append"><span @click="subtractMath(row)">-</span></template>
                    </el-input>
                    <span v-if="!row.showEdit">{{row.inventory}}</span>
                    </div>
                  </template>

                </el-table-column>
                <div v-if="activeName == 'first'">
                    <el-table-column prop="createTime" label="上架时间"></el-table-column>
                </div>
                <div v-else>
                    <el-table-column prop="updateTime" label="下架时间"></el-table-column>
                </div>
                <el-table-column label="操作" align="center" width="280">
                    <template slot-scope="{row,$index}">
                      <el-button size="small" type="text" style="color:#66b1ff;"
                      @click="viewDetails($index, row)">查看详情</el-button>
                      <el-button size="small" type="text" style="color:#66b1ff;"
                      @click="handleEdit($index, row)" v-show="activeName != 'second'" v-if="!row.showEdit">编辑</el-button>
                      <el-button size="small" type="text" style="color:#66b1ff;"
                      @click="handleSave($index, row)" v-show="activeName != 'second'" v-if="row.showEdit">保存编辑</el-button>
                      <el-button size="small" type="text"
                      @click="handleDelete($index, row)" v-show="activeName == 'first'">下架</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            <div v-show="activeName == 'third'">
            <el-table :data="tableData"  ref="multipleTable" :header-cell-style="getRowClass" @selection-change="handleSelectionChange">
                <el-table-column prop="imgUrl" label="" min-width="50%" >
                    <template  slot-scope="scope">
                        <img :src="scope.row.imgUrl"  min-width="70" height="70" />
                    </template>
                </el-table-column>
                <el-table-column prop="commodityName" label="商品"></el-table-column>
                <el-table-column prop="unit" label="出售规格" width="100"></el-table-column>
                <el-table-column prop="realityPrice" label="实际售价">
                  <template slot-scope="{row,$index}">
                    ￥<el-input v-if="row.showEdit" v-model="row.realityPrice" maxlength="7" size="small" style="width:100px" onkeypress='return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    <span v-if="!row.showEdit">{{row.realityPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="suggestPrice" label="建议售价">
                  <template slot-scope="{row,$index}">
                    ￥<el-input v-if="row.showEdit" v-model="row.suggestPrice" maxlength="7" size="small" style="width:100px" onkeypress='return(/[\d\.]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    <span v-if="!row.showEdit">{{row.suggestPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="inventory" label="剩余库存">
                  <template slot-scope="{row,$index}">
                    <div class="surplus_stock">
                    <el-input v-if="row.showEdit" v-model="row.inventory"  size="small" style="width:120px" maxlength="4" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'>
                      <template slot="prepend"><span @click="plusMath(row)">+</span></template>
                      <template slot="append"><span @click="subtractMath(row)">-</span></template>
                    </el-input>
                    <span v-if="!row.showEdit">{{row.inventory}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="payType" label="支付渠道"></el-table-column>
                <el-table-column prop="salesReturn" label="支持退货"></el-table-column>
                <el-table-column prop="promotion" label="参与促销计划"></el-table-column>
                <el-table-column prop="createTime" label="上架时间"></el-table-column>
                <el-table-column label="操作" align="center" width="280">
                    <template slot-scope="{row,$index}">
                      <el-button size="small" type="text" style="color:#66b1ff;"
                      @click="viewDetails($index, row)">查看详情</el-button>
                      <el-button size="small" type="text" style="color:#66b1ff;"
                      @click="handleEdit($index, row)" v-show="activeName != 'second'" v-if="!row.showEdit">编辑</el-button>
                      <el-button size="small" type="text" style="color:#66b1ff;"
                      @click="handleSave($index, row)" v-show="activeName != 'second'" v-if="row.showEdit">保存编辑</el-button>
                      <el-button size="small" type="text"
                      @click="handleDelete($index, row)" v-show="activeName == 'first'">下架</el-button>
                    </template>
                </el-table-column>
            </el-table>
            </div>
            <div class="pagination">
                 <el-pagination
                  v-if="paginationShow"
                  background
                  :page-size="pageSize"
                  :current-page="cur_page"
                  @current-change="handleCurrentChange"
                  :pager-count="pages_count"
                  layout="prev, pager, next, jumper"
                  :total="total_page">
                </el-pagination>
            </div>
        </div>

        <!-- 详情弹出框 -->
        <el-dialog id="viewDetail" title="查看详情" :visible.sync="editVisible" width="40%" :lock-scroll='true' top="5vh">
            <div class="goods_detail">
              <el-scrollbar style="height:100%;">
                <view-detail-dialog :commodityId="xcommodityId" :activeName="activeName"></view-detail-dialog>
              </el-scrollbar>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteRow" type="primary" v-show="activeName == 'first'">下架</el-button>
                <!-- <el-button  @click="saveEdit" type="info">拒绝上架</el-button> -->
            </span>
        </el-dialog>

        <div class="del_goods_wrap">
          <el-dialog id="el-title" title="下架商品" :visible.sync="delVisible" width="460px" center top="300px" :show-close="false">
              <div class="del-dialog-cnt">确定下架以下商品？</div>
              <div class="del-dialog-goods">{{del_value}}</div>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="deleteRow">确 定</el-button>
                  <el-button @click="delVisible = false">取 消</el-button>
              </span>
          </el-dialog>
        </div>
      </div>
    </div>
</template>

<script>
import viewDetailDialog from "./preview_dialog/viewDetailsDialog.vue";
import { multiplyPrice,dividePrice } from "../../common/commonJS/commonjs.js";
import { mapState } from "vuex";
import {
  listSell,
  storeCommodityDetail,
  soldOut,
  edit,
  listSoldOut,
  listCheck
} from "../../common/request/request";
import store from "../../../store/store";
export default {
  name: "basetable",
  components: {
    viewDetailDialog
  },

  data() {
    return {
      uid: "",
      xcommodityId: "",
      activeName: "first",
      url: "./static/vuetable.json",
      dateValue: [],
      tableData: [],
      cur_page: 1,
      total_page: null,
      pages_count: null,
      pageSize: null,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      del_value: "",
      editVisible: false,
      delVisible: false,
      paginationShow: true,
      idx: -1
    };
  },
  created() {
    let self = this;
    if (self.$route.query.activeName) {
      self.activeName = self.$route.query.activeName;
    }
    self.uid = self.userInfo.uid;
    this.getListData();
  },
  mounted() {},
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    handleClick(tab, e) {
      this.activeName = tab.name;
      if (this.dateValue.length > 0) {
        this.dateValue = [];
      }
      this.paginationShow = false;
      this.cur_page = 1;
      this.handleCurrentChange(this.cur_page);
      this.$nextTick(function() {
        this.paginationShow = true;
      });
    },
    getListData() {
      if (this.activeName == "first") {
        this.getlistSell();
      } else if (this.activeName == "second") {
        this.getlistSoldOut();
      } else if (this.activeName == "third") {
        this.getlistCheck();
      }
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getListData();
    },
    prevClick(val) {
      let a = 0;
    },
    getlistSell() {
      let self = this;
      let param = {
        pageNumber: this.cur_page,
        pageSize: 10,
        tenantUid: self.uid,
        startTime: self.dateValue?self.dateValue[0]:null,
        endTime: self.dateValue?self.dateValue[1]:null,
        keyword: self.select_word
      };
      listSell(param)
        .then(res => {
          console.log(res);
          self.tableData = res.data.dataList;
          self.total_page = res.data.total;
          self.pages_count = res.data.pages;
          self.pageSize = res.data.pageSize;
          for (var i = 0; i < res.data.dataList.length; i++) {
            self.tableData[i].realityPrice = dividePrice(res.data.dataList[i].realityPrice)
            self.tableData[i].suggestPrice = dividePrice(res.data.dataList[i].suggestPrice)
            self.tableData[i].carriage = dividePrice(res.data.dataList[i].carriage)
            self.$set(self.tableData[i], "showEdit", false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getlistSoldOut() {
      let self = this;
      let param = {
        pageNumber: this.cur_page,
        pageSize: 10,
        tenantUid: self.uid,
        startTime: self.dateValue?self.dateValue[0]:null,
        endTime: self.dateValue?self.dateValue[1]:null,
        keyword: self.select_word,
        sort: Number(self.select_cate)
      };
      listSoldOut(param)
        .then(res => {
          self.tableData = res.data.dataList;
          self.total_page = res.data.total;
          self.pageSize = res.data.pageSize;
          self.pages_count = res.data.pages;
          for (var i = 0; i < res.data.dataList.length; i++) {
            self.tableData[i].realityPrice = dividePrice(res.data.dataList[i].realityPrice)
            self.tableData[i].suggestPrice = dividePrice(res.data.dataList[i].suggestPrice)
            self.tableData[i].carriage = dividePrice(res.data.dataList[i].carriage)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getlistCheck() {
      let self = this;
      let param = {
        pageNumber: this.cur_page,
        pageSize: 10,
        tenantUid: self.uid,
        startTime: self.dateValue?self.dateValue[0]:null,
        endTime: self.dateValue?self.dateValue[1]:null,
        keyword: self.select_word
      };
      listCheck(param)
        .then(res => {
          self.tableData = res.data.dataList;
          self.total_page = res.data.total;
          self.pageSize = res.data.pageSize;
          self.pages_count = res.data.pages;
          for (var i = 0; i < res.data.dataList.length; i++) {
            self.tableData[i].realityPrice = dividePrice(res.data.dataList[i].realityPrice)
            self.tableData[i].suggestPrice = dividePrice(res.data.dataList[i].suggestPrice)
            self.tableData[i].carriage = dividePrice(res.data.dataList[i].carriage)
            this.$set(this.tableData[i], "showEdit", false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchQuery() {
      if (this.select_cate || this.dateValue.length || this.select_word) {
        this.getListData();
      }
    },
    clearSearch() {
      this.select_cate = "";
      this.dateValue = [];
      this.select_word = "";
      this.getListData();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    plusMath(row) {
      row.inventory++;
    },
    subtractMath(row) {
      row.inventory--;
    },
    viewDetails(index, row) {
      const item = this.tableData[index];
      this.xcommodityId = row.commodityId;
      this.editVisible = true;
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      item.showEdit = true;
    },
    handleSave(index, row) {
      this.idx = index;
      const itemSave = this.tableData[index];
      itemSave.showEdit = false;
      let self = this;
      let param = {
        commodityId: row.commodityId,
        realityPrice: multiplyPrice(row.realityPrice),
        suggestPrice: multiplyPrice(row.suggestPrice),
        inventory: row.inventory
      };
      edit(param).then(res => {
        if (res.data) {
          self.$message.success("编辑成功");
        } else {
          self.$message.info("接受小数点后两位");
        }
      });
    },
    handleDelete(index, row) {
      this.idx = index;
      this.del_value = row.name;
      this.xcommodityId = row.commodityId;
      this.delVisible = true;
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
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      let self = this;
      soldOut(this.xcommodityId)
        .then(res => {
          self.$message.success("下架成功");
        })
        .catch(err => {
          self.$message.info("下架失败");
        });
      self.delVisible = false;
      self.editVisible = false
    }
  }
};
</script>

<style scoped>
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
.goods_detail {
  height: 700px;
}
</style>

