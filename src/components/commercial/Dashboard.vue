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
            <el-col :span="20">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="20">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <div class="grid-cont-right">
                                    <div>代发订单</div>
                                    <div class="grid-num">1234个</div>
                                </div>
                                <div class="grid-cont-right">
                                    <div>代发订单</div>
                                    <div class="grid-num">1234个</div>
                                </div>
                                <div class="grid-cont-right">
                                    <div>代发订单</div>
                                    <div class="grid-num">1234个</div>
                                </div>
                                <div class="grid-cont-right">
                                    <div>代发订单</div>
                                    <div class="grid-num">1234个</div>
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
                    <el-col :span="20">
                        <el-card shadow="hover" :body-style="{padding: '0px',height: '200px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="10">
                    <el-card shadow="hover" :body-style="{ height: '295px'}">
                        <div slot="header" class="clearfix">
                            <span>公告</span>
                            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                        </div>
                        <el-table :data="todoList" :show-header="false" height="500" style="width: 100%;font-size:14px;">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <div class="todo-item" @click="clickDialog">{{scope.row.title}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                    </el-col>
                    <el-col :span="10">
                    <el-card shadow="hover" :body-style="{ height: '150px'}">
                        <!-- <div slot="header" class="clearfix">
                            <span>公告</span>
                            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                        </div>
                        <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                            <el-table-column width="40">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.status"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-popover placement="top" title="标题" width="300" height="300" trigger="click">
                                        <div slot="reference" class="todo-item">{{scope.row.title}}</div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column width="60">
                                <template slot-scope="scope">
                                    <i class="el-icon-edit"></i>
                                    <i class="el-icon-delete"></i>
                                </template>
                            </el-table-column>
                        </el-table> -->
                    </el-card>
                    </el-col>
                    <el-col :span="10" class="padding-top-10">
                    <el-card shadow="hover" :body-style="{ height: '150px'}">
                        <!-- <div slot="header" class="clearfix">
                            <span>公告</span>
                            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                        </div> -->
                        <!-- <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                            <el-table-column width="40">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.status"></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-popover placement="top" title="标题" width="300" height="300" trigger="click">
                                        <div slot="reference" class="todo-item">{{scope.row.title}}</div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column width="60">
                                <template slot-scope="scope">
                                    <i class="el-icon-edit"></i>
                                    <i class="el-icon-delete"></i>
                                </template>
                            </el-table-column>
                        </el-table> -->
                    </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-dialog title="公告详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <span>{{dialogContext}}</span>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogVisible = false">关闭窗口</el-button>
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
  font-weight: normal;
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
