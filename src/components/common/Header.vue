<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div> -->
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <!-- <router-link to="/tabs">
                            <i class="el-icon-bell"><span>消息</span></i>
                        </router-link> -->
                        <i class="el-icon-bell">
                            <el-popover placement="right-start" width="200" trigger="click">
                                <!-- <el-table :data="gridData"> -->
                                <!-- <el-table-column width="400" property="date" label="日期"></el-table-column> -->
                                <!-- <el-table-column width="100" property="name" label="姓名"></el-table-column> -->
                                <!-- <el-table-column width="200" property="address" label="地址" class="el-scrollbar"></el-table-column> -->

                                <!-- </el-table> -->
                                <span slot="reference">消息</span>
                                <div class="scrollbarParent">
                                <el-scrollbar style="height:100%;">
                                <div v-for="(item,index) in gridData" :key="index">
                                    <div class="message-info" @click="clickDialog(item.name)">
                                        <p class="message-address">{{maxSlice(item.address)}}</p>
                                        <span class="btn-bell-inner" v-if="item.date"></span>
                                        <p class="message-date">{{item.date}}</p>
                                    </div>
                                </div>
                                </el-scrollbar>
                                </div>
                            </el-popover>
                        </i>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="static/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="http://blog.gdfengshuo.com/about/" target="_blank">
                            <el-dropdown-item>关于作者</el-dropdown-item>
                        </a>
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
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
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      name: "linxin",
      message: 2,
      dialogVisible: false,
      dialogContext: "",
      maxLength: 10,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "标题消息"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "标题消息"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "标题消息"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "标题消息"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "标题消息"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "标题消息"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "标题消息"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "标题消息"
        }
      ]
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      }
    },
    maxSlice(v) {
      return v.length > this.maxLength ? v.slice(0, this.maxLength) + "..." : v;
    },
    handleClose(done) {
      this.dialogVisible = true;
      done();
    },
    clickDialog(e) {
      this.dialogContext = e;
      this.dialogVisible = true;
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
    background-color: #ec414d;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.scrollbarParent {
  height: 200px;
}

/* .btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
} */
/* .is-scrolling-none {
  width: 500px;
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  line-height: 30px;
  text-align: center;
} */

.btn-bell {
  position: relative;
  width: 70px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell span {
  font-size: 18px;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.message-info {
  position: relative;
  margin: 2px 0 2px 5px;
}
.btn-bell-inner {
  position: absolute;
  top: 6px;
  left: -2px;
  width: 6px;
  height: 6px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.message-address {
  margin-left: 6px;
  color: rgb(69, 143, 241);
}
.message-date {
  font-size: 12px;
  color: #aaa;
}
</style>
