<!--线上商品管理-->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/" class="el-breadcrumb">
                <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
                <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
                <el-breadcrumb-item>出售中</el-breadcrumb-item>
                <el-breadcrumb-item>已下架</el-breadcrumb-item>
                <el-breadcrumb-item>审核中</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                <span class="on-offer">出售中</span>
                <span class="ordering-rule">排序规则：
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
                <span class="promotion-button">
                    <el-button size="mini" class="promotion-mini">参与促销</el-button>
                    <el-button size="mini">不参与</el-button>
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
                    <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    <el-button class="clear-button" type="default" icon="search" @click="search">清空</el-button>
                </span>
            </div>
            <el-table :data="data" style="width: 100%"  ref="multipleTable" :header-cell-style="getRowClass" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <!-- <el-table-column prop="date" label="日期" sortable width="150">
                </el-table-column> -->
                <el-table-column prop="address" label="商品" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="name" label="出售规格" width="100">
                </el-table-column>
                <el-table-column prop="address" label="促销计划" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="address" label="访问统计" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="address" label="销售统计" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="address" label="审核提交时间" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <!-- <el-pagination  @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination> -->
                <el-pagination
                    background
                    :page-sizes="[10,20,30,40]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="100">
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
</template>

<script>
export default {
  name: "basetable",
  data() {
    return {
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
    this.getData();
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
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.del_value = row.name;
      this.delVisible = true;
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#EFEFEF";
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
.on-offer {
  position: absolute;
  top: 3px;
}
.handle-select {
  width: 140px;
}
.last-el-option{
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
  left: 10%;
}
.promotion-button {
  position: absolute;
  left: 30%;
}
.promotion-mini {
  margin-right: -16px;
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
