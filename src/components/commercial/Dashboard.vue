<template>
    <div>
        <el-row :gutter="20">
            <!-- <el-col :span="8">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                            <div class="user-info-list">上次登录地点：<span>东莞</span></div>
                        </el-card>
                        <el-card shadow="hover">
                            <div slot="header" class="clearfix">
                                <span>语言详情</span>
                            </div>
                            Vue
                            <el-progress :percentage="57.2" color="#42b983"></el-progress>
                            JavaScript
                            <el-progress :percentage="29.8" color="#f1e05a"></el-progress>
                            CSS
                            <el-progress :percentage="11.9"></el-progress>
                            HTML
                            <el-progress :percentage="1.1" color="#f56c6c"></el-progress>
                        </el-card>
                    </el-col>
                </el-row>

            </el-col> -->
            <el-col>
                <el-row :gutter="20" class="mgb20">
                    <el-col>
                        <el-card shadow="hover" :body-style="{padding: '0px',height:'125px'}">
                            <div class="grid-content grid-con-1":body-style="{padding: '0px',marginTop:'25px'}">
                                <div class="grid-cont-right">
                                    <div class="word_goods">总收益</div>
                                    <div class="grid-num">1234个<a class="look_goods">查看</a></div>
                                </div>
                                <div class="grid-cont-right">
                                    <div  class="word_goods">待发货订单</div>
                                    <div class="grid-num">1234个<a class="look_goods">查看</a></div>
                                </div>
                                <div class="grid-cont-right">
                                    <div class="word_goods">待退款订单</div>
                                    <div class="grid-num">1234个<a class="look_goods">查看</a></div>
                                </div>
                                <div class="grid-cont-right">
                                    <div class="word_goods">待补货商品</div>
                                    <div class="grid-num">1234个<a class="look_goods">查看</a></div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <!--
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col> -->
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <img width="100%" src="/static/img/1.png" alt="">

                    </el-col>
                </el-row>



                <el-row :gutter="20">
                    <el-col :span="17">
                    <el-card shadow="hover" :body-style="{ height: '295px'}">
                        <div slot="header" class="clearfix">
                            <span>公告</span>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">添加</el-button>-->
                        </div>
                        <el-table :data="todoList" :show-header="false"  style="width: 100%;font-size:14px;">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <div class="todo-item" @click="clickDialog">{{scope.row.title}}<label style="float: right">2018-06-08</label></div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                    </el-col>
                    <el-col :span="7">
                        <img width="100%" src="/static/img/2.png" alt="">
                    </el-col>
                    <el-col :span="7" class="padding-top-10">
                        <img width="100%" src="/static/img/3.png" alt="">
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog title="公告详情" :visible.sync="dialogVisible" width="40%"  :before-close="handleClose">
            <span>{{dialogContext}}</span>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button class="close_dialog" type="primary" @click="dialogVisible = false">关闭窗口</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      dialogVisible: false,
      dialogContext: "",
      name: localStorage.getItem("ms_username"),
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: false
        },
        {
          title: "今天要修复100个bug",
          status: true
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true
        }
      ]
    };
  },
  methods: {
      getRowClass({ row, column, rowIndex, columnIndex }) {
          if (rowIndex == 0) {
              return 'background:#EFEFEF'
          } else {
              return ''
          }
      },

      handleClose(done) {
      this.dialogVisible = true;
      done();
    },
    clickDialog(e) {
      this.dialogContext = e.target.innerText;
      this.dialogVisible = true;
    }
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  }
};
</script>


<style scoped>
    .grid-num{
        position: relative;
    }
    .grid-con-1{
        margin-top: 25px;
    }
    .look_goods{
        position: absolute;
        right: 50px;
        bottom: 0;
        /*margin-left: 30px;*/
        font-size: 14px;
        color: cornflowerblue;
        font-weight: normal;
    }
    .word_goods{
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
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
</style>
