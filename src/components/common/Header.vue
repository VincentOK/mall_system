<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <div class="btn-bell">
                    <el-tooltip effect="light" :content="informNumber?`有${informNumber}条未读消息`:`消息中心`" placement="bottom">
                        <i class="el-icon-bell">
                            <el-popover placement="right-start" width="200" trigger="click">
                                <span slot="reference">消息</span>
                                <div class="scrollbarParent">
                                <el-scrollbar style="height:100%;">
                                <div v-for="(item,index) in gridData" :key="index">
                                    <div class="message-info" @click="clickDialog(item.messageId,item.inform)">
                                        <p class="message-address">{{maxSlice(item.title)}}</p>
                                        <span class="btn-bell-inner" v-show="item.inform=='0'"></span>
                                        <p class="message-date">{{item.createTime}}</p>
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
                        {{userInfo.linkName}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">

                        <el-dropdown-item><router-link :to="'/edxpassword'" class="router_link">修改密码</router-link></el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="red_header">
            <el-dialog title="消息详情" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" :close-on-click-modal='false' :close-on-press-escape="false">
                <div class="notice_wrap">
                <h3>{{messageTitle}}</h3>
                <span class="notice_time">{{messageCreateTime}}</span>
                <p v-html="messageContent"></p>
              </div>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                    <el-button type="primary" @click="demo">关闭窗口</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { removeStorage } from "./commonJS/localStorage";
import { loginout, listMessages, getMessagesDetail } from "./request/request";
import { mapState } from "vuex";
import bus from "../common/bus";
export default {
  data() {
    return {
      tenantUid:"",
      dialogTitle: "",
      collapse: false,
      fullscreen: false,
      name: "linxin",
      message: 2,
      dialogVisible: false,
      dialogContext: "",
      maxLength: 10,
      gridData: [],
      informNumber:null,
      messageTitle:'',
      messageCreateTime:'',
      messageContent:'',
      informPoint:true,
    };
  },
  computed: {
      ...mapState([
          'userInfo'
      ]),
  },
  mounted() {
    this.tenantUid = this.userInfo.uid;
    this.getListMessages();
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
    console.log("aa:" + JSON.stringify(this.userInfo));
  },
  methods: {
    /**
     * 修改密码
     * @param command
     */
    edxpassword() {
      console.log("修改密码");
      this.$router.push("/edxpassword");
    },
    demo(){
      this.dialogVisible = false;
      this.getListMessages()
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        loginout()
          .then(res => {
            console.log(res);
            if (res.code === "0") {
              removeStorage("token");
              removeStorage("userInfo");
              removeStorage("resourceList");
              this.$router.push("/login");
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    maxSlice(v) {
      return v.length > this.maxLength ? v.slice(0, this.maxLength) + "..." : v;
    },
    handleClose(done) {
      this.dialogVisible = true;
      done();
    },
    clickDialog(e,event) {
      console.log(event);
      this.dialogContext = e;
      this.dialogVisible = true;
      this.dialogTitle = "消息";
      this.getMessagesDetail(e)
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
    },
    getListMessages() {
      let self = this;
      listMessages(self.tenantUid)
        .then(res => {
          if (res.data) {
            self.gridData = res.data.dataList;
            self.informNumber = res.data.informNumber;
          } else {
            console.log("");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMessagesDetail(messageId) {
      let self = this;
      getMessagesDetail(messageId)
        .then(res => {
          if (res.data) {
            self.messageTitle = res.data.title
            self.messageCreateTime = res.data.createTime
            self.messageContent = res.data.content
          } else {
            console.log("");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.router_link {
  color: #283446;
}
.router_link:hover {
  color: #ec414d;
}
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
  top: 0;
  left: -4px;
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
.notice_wrap {
  width: 60%;
  margin: auto;
}
.notice_time {
  display: inline-block;
  margin: 15px 0 40px 0;
}
</style>
