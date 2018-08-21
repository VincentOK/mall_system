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
        <el-dialog id="viewDetail" title="编辑" :visible.sync="editVisible" width="40%" :lock-scroll='true' top="5vh">
            <div class="goods_detail">
              <el-scrollbar style="height:100%;">
              <h3>商品信息</h3>
              <div class="goods_detail_left">
                <div>
                  <label>商品名称：</label>
                  <p>山东烟台苹果整箱包邮5斤</p>
                </div>
                <div>
                  <label>出售规格：</label>
                  <p>每份300克</p>
                </div>
                <div>
                  <label>促销计划：</label>
                  <p>参与</p>
                </div>
                <div>
                  <label>支付渠道：</label>
                  <p>微信支付 支付宝支付 银行卡支付</p>
                </div>
                <div>
                  <label>上架时间：</label>
                  <p>2018-8-17 16：54</p>
                </div>
                <div style="margin-left: -42px;">
                  <label>可提供发票类型：</label>
                  <p>是</p>
                </div>
              </div>
              <div class="goods_detail_right">
                <div>
                  <label>实际售价：</label>
                  <p>￥188.45</p>
                </div>
                <div>
                  <label>建议售价：</label>
                  <p>￥854.24</p>
                </div>
                <div>
                  <label>快递运费：</label>
                  <p>￥10.00</p>
                </div>
                <div>
                  <label>剩余库存：</label>
                  <p>128</p>
                </div>
                <div>
                  <label>支持退货：</label>
                  <p>是</p>
                </div>
                <div class="invoice_type">
                  <label>可提供发票类型：</label>
                  <p>普通发票/增值税专用发票</p>
                </div>
              </div>
              <div class="product_detail">
                <label>商品详情：</label>
                <p>烟台苹果是以烟台辖区内的长岛县、龙口、莱阳、莱州、蓬莱、招远、栖霞和海阳等地栽培的苹果。烟台苹果栽培历史悠久，是中国苹果栽培最早的地方。1871年西洋苹果引进烟台，有140多年的历史，被称为中国现代苹果的发源地。烟台气候和环境条件非常适宜苹果生长，被农业部确定为中国苹果优势产区，烟台苹果以“果形端正、色泽艳丽、果肉甜脆、香气浓郁”享誉国内外。是烟台市的区域公用品牌。</p>
              </div>
               <div id="img_slider">
                <div class="img_window">
                  <ul class="img_container" :style="containerStyle">
                    <li>
                      <img :src="sliders[sliders.length - 1].img" alt="">
                    </li>
                    <li v-for="(item, index) in sliders" :key="index">
                      <img :src="item.img" alt="">
                    </li>
                    <li>
                      <img :src="sliders[0].img" alt="">
                    </li>
                  </ul>
                  <ul>
                    <li class="left" @click="move(600, 1, speed)">
                      <i class="el-icon-arrow-left"></i>
                    </li>
                    <li class="right" @click="move(600, -1, speed)">
                      <i class="el-icon-arrow-right"></i>
                    </li>
                  </ul>
                </div>
                <div class="sliderImg_length">商品轮播图(共{{sliders.length}}张)</div>
              </div>
              </el-scrollbar>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" type="primary">批准上架</el-button>
                <el-button  @click="saveEdit" type="info">拒绝上架</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
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
</template>

<script>
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
      sliders: [
        {
          img: "../../static/img/a.jpg"
        },
        {
          img: "../../static/img/b.jpg"
        },
        {
          img: "../../static/img/c.jpg"
        },
        {
          img: "../../static/img/d.jpg"
        },
        {
          img: "../../static/img/e.jpg"
        }
      ],
      currentIndex: 1,
      distance: -600,
      transitionEnd: true,
      speed: this.initialSpeed
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
    },
    containerStyle() {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      };
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
            this.$set(this.tableData[i], "showEdit", false);
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
    },
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
.goods_detail_left {
  float: left;
  width: 300px;
  margin-left: 80px;
  margin-top: 10px;
}
.goods_detail_left label {
  float: left;
}
.goods_detail_left p {
  margin-left: 70px;
}
.goods_detail_left div:first-child {
  margin-top: 0;
}
.goods_detail_left div {
  margin-top: 20px;
}
.goods_detail_right {
  position: relative;
  margin: 10px 0 40px 400px;
}
.goods_detail_right label {
  float: left;
}
.goods_detail_right p {
  margin-left: 70px;
}
.goods_detail_right div:first-child {
  margin-top: 0;
}
.goods_detail_right div {
  margin-top: 21px;
}
.invoice_type {
  position: absolute;
  left: -40px;
  width: 100%;
}
.product_detail {
  padding: 20px 60px 0 80px;
}
.product_detail label {
  float: left;
}
.product_detail p {
  margin-left: 70px;
}
#img_slider {
  margin-top: 15px;
  text-align: center;
}
.img_window {
  position: relative;
  width: 550px;
  height: 300px;
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
.left i,
.right i{
  font-size: 30px;
  margin-top: 5px;
  color: #2c3e50;
  font-weight: bold;
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
.left i {
  margin-right: 10px;
}
.right i {
  margin-left: 10px;
}
#img_slider img {
  user-select: none;
  width: 100%;
  height: 100%;
}
.sliderImg_length {
  margin-top: 5px;
}
</style>

