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
                <span class="good-total">共10.231个商品</span>
                <span class="ordering-rule" v-show="activeName == 'second'">排序规则：
                <el-select v-model="select_cate" placeholder="请选择排序规则" class="handle-select mr10">
                    <!-- <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option> -->
                    <el-option key="1" label="默认" value="默认（按上架时间从近至远）"></el-option>
                    <el-option key="2" label="按总浏览量从高至低" value="按总浏览量从高至"></el-option>
                    <el-option key="3" label="按总浏览量从低至高" value="按总浏览量从低至"></el-option>
                    <el-option key="4" label="按销量从高至低" value="按销量从高至低"></el-option>
                    <el-option key="5" label="" value="按销量从低至高" class="last-el-option"></el-option>
                </el-select>
                </span>
                <span class="ordering-rule" v-show="activeName != 'second'">结算状态：
                <el-select v-model="select_cate" placeholder="全部" class="handle-select mr10">
                    <el-option key="1" label="默认" value="默认（按上架时间从近至远）"></el-option>
                    <el-option key="2" label="按总浏览量从高至低" value="按总浏览量从高至"></el-option>
                    <el-option key="3" label="按总浏览量从低至高" value="按总浏览量从低至"></el-option>
                    <el-option key="4" label="按销量从高至低" value="按销量从高至低"></el-option>
                    <el-option key="5" label="" value="按销量从低至高" class="last-el-option"></el-option>
                </el-select>
                </span>
                <span class="date-options">
                    <span class="select-date">选择日期：</span>
                    <el-date-picker
                        v-model="dateValue"
                        type="daterange"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </span>
                <span class="search-option">
                    <el-input v-model="select_word" placeholder="按商品名称搜索" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    <el-button class="clear-button" type="default" icon="search" @click="search">清空</el-button>
                </span>
            </div>
            <el-table :data="data"  ref="multipleTable" :header-cell-style="getRowClass" @selection-change="handleSelectionChange">
                <el-table-column prop="commodityName" label="商品"></el-table-column>
                <el-table-column prop="unit" label="出售规格" width="100"></el-table-column>
                <el-table-column prop="realityPrice" label="实际售价">
                  <template slot-scope="{row,$index}">
                    <el-input v-if="row.showEdit" v-model="row.address" size="small" style="width:120px"></el-input>
                    <span v-if="!row.showEdit">{{row.address}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="suggestPrice" label="建议售价">
                  <template slot-scope="{row,$index}">
                    <el-input v-if="row.showEdit" v-model="row.address"  size="small" style="width:120px"></el-input>
                    <span v-if="!row.showEdit">{{row.address}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="totalBrowseNumber" label="总浏览量"></el-table-column>
                <el-table-column prop="userBrowseNumber" label="独立浏览量"></el-table-column>
                <el-table-column prop="sales" label="已售"></el-table-column>
                <el-table-column prop="inventory" label="剩余库存">
                  
                  <template slot-scope="{row,$index}">
                    <div class="surplus_stock">
                    <el-input v-if="row.showEdit" v-model="row.address"  size="small" style="width:120px">
                      <template slot="prepend"><span @click="plusMath">+</span></template>
                      <template slot="append"><span @click="subtractMath">-</span></template>
                    </el-input>
                    <span v-if="!row.showEdit">{{row.address}}</span>
                    </div>
                  </template>
                  
                </el-table-column>
                <el-table-column prop="address" label="上架时间" :formatter="formatter"></el-table-column>
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

        <!-- 详情弹出框 -->
        <el-dialog id="viewDetail" title="查看详情" :visible.sync="editVisible" width="40%" :lock-scroll='true' top="5vh">
            <div class="goods_detail">
              <el-scrollbar style="height:100%;">
                <view-detail-dialog :commodityId="uid"></view-detail-dialog>
              </el-scrollbar>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" type="primary">批准上架</el-button>
                <el-button  @click="saveEdit" type="info">拒绝上架</el-button>
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
import { mapState, mapMutations, mapActions } from "vuex";
import {
  listSell,
  storeCommodityDetail,
  soldOut,
  edit,
  listSoldOut,
  listCheck,
  getCheckDetail
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
      activeName: "first",
      url: "./static/vuetable.json",
      dateValue: "",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      del_value: "",
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1
    };
  },
  created() {
    let self = this;
    if(self.$route.query.activeName){
      self.activeName = self.$route.query.activeName;
    }
    self.uid = self.userInfo.uid;
    self.uid = "18614060970"
    this.getlistSell();
    // this.getlistSoldOut();
    // this.getlistCheck();
  },
  mounted() {},
  computed: {
    ...mapState(["userInfo"]),
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.realityPrice.indexOf(this.select_cate) > -1 &&
            (d.commodityName.indexOf(this.select_word) > -1 ||
              d.commodityName.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    handleClick(tab, e) {
      this.activeName = tab.name;
      console.log(tab.index, tab.name, tab.label, this.activeName);
      if (this.activeName == "first") {
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      // this.getlistSell();
    },
    getlistSell() {
      let self = this;

      // this.$axios
      //   .post(this.url, {
      //     page: this.cur_page
      //   })
      //   .then(res => {
      //     this.tableData = res.data.dataList;
      //     for (var i = 0; i < res.data.list.length; i++) {
      //       this.$set(this.tableData[i], "showEdit", false);
      //     }
      //   });
      let param = {
        pageNumber: this.cur_page,
        pageSize: 10,
        tenantUid: self.uid,
        startTime: "",
        endTime: "",
        keyword: ""
      };
      listSell(param)
        .then(res => {
          console.log(res);
          self.tableData = res.data.dataList;
          for (var i = 0; i < res.data.dataList.length; i++) {
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
        startTime: "",
        endTime: "",
        keyword: "",
        sort: ""
      };
      listSoldOut(param)
        .then(res => {
          console.log(res);
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
        startTime: "",
        endTime: "",
        keyword: "",
        sort: ""
      };
      listCheck(param)
        .then(res => {
          console.log(res);
          // this.tableData = res.data.dataList;
          // for (var i = 0; i < res.data.dataList.length; i++) {
          //   this.$set(this.tableData[i], "showEdit", false);
          // }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getsoldOut() {
      let self = this;
      soldOut(param)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getedit() {
      let self = this;
      let param = {
        commodityId: self.uid,
        realityPrice: self.realityPrice,
        suggestPrice: self.suggestPrice,
        inventory: self.inventory
      };
      edit(param)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCheckDetail() {
      let self = this;
      getCheckDetail(self.uid)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
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
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address,
        showEdit: true
      };
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
      this.idx = index;
      const itemSave = this.tableData[index];
      itemSave.showEdit = false;
      this.form = {
        name: itemSave.name,
        date: itemSave.date,
        address: itemSave.address,
        showEdit: false
      };
      this.$set(this.tableData, this.idx, this.form);
    },
    handleDelete(index, row) {
      this.idx = index;
      this.del_value = row.name;
      this.delVisible = true;
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
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("下架成功");
      this.delVisible = false;
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

