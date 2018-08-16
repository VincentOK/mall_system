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
                <el-table-column prop="address" label="商品" :formatter="formatter"></el-table-column>
                <el-table-column prop="name" label="出售规格" width="100"></el-table-column>
                <el-table-column prop="address" label="实际售价" :formatter="formatter">
                  <template slot-scope="{row,$index}">
                    <el-input v-if="row.showEdit" v-model="row.address" size="small" style="width:120px"></el-input>
                    <span v-if="!row.showEdit">{{row.address}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="建议售价" :formatter="formatter">
                  <template slot-scope="{row,$index}">
                    <el-input v-if="row.showEdit" v-model="row.address"  size="small" style="width:120px"></el-input>
                    <span v-if="!row.showEdit">{{row.address}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="总浏览量" :formatter="formatter"></el-table-column>
                <el-table-column prop="address" label="独立浏览量" :formatter="formatter"></el-table-column>
                <el-table-column prop="address" label="已售" :formatter="formatter"></el-table-column>
                <el-table-column prop="address" label="剩余库存" :formatter="formatter">
                  
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
                      @click="handleEdit($index, row)">查看详情</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%" top="250px">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="下架商品" :visible.sync="delVisible" width="400px" center top="300px">
            <div class="del-dialog-cnt">确定下架以下商品？</div>
            <div class="del-dialog-goods">{{del_value}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
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
      idx: -1,
    };
  },
  created() {
    this.getData();
    // this.forTableIndex();
  },
  computed: {
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
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
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
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === "development") {
        this.url = "/ms/table/list";
      }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          this.tableData = res.data.list;
          for (var i = 0; i < res.data.list.length; i++) {
            this.$set(this.tableData[i],'showEdit',false);
          }
        });
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
    plusMath(){
      console.log(234235)
    },
    subtractMath(){
      console.log(28888)
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      item.showEdit = true;
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address,
        showEdit: true,
      };
      // this.editVisible = true;
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
        showEdit: false,
      }
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
}
.del-dialog-goods {
  margin-top: 10px;
  color: red;
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
</style>

