<template>
    <div class="income_statistics">
        <div class="tabel_title"><h3>资产管理&nbsp;&nbsp;>&nbsp;&nbsp;统计与收益</h3></div>
        <el-card>
            <h3>收益统计</h3>
            <div class="income_card">
                <div class="total_income">
                    <p>￥{{countEarnings.totalCoin | formatMonney}}</p>
                    <p>总收益</p>
                </div>
                <div class="total_income">
                    <p>￥{{countEarnings.availableCoin | formatMonney}}</p>
                    <p>待结算余额</p>
                </div>
                <div class="total_income">
                    <p>￥{{countEarnings.inCoin | formatMonney}}</p>
                    <p>已结算金额</p>
                </div>
            </div>
            <div class="income_form">
                <h3>收益结算</h3>
                <span class="income_introduce">(结算需要3~10个工作日，款项将转账至您入驻平台时填写的银行账户) </span>
                <div class="income_formbx">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                        <el-form-item label="结算金额:" prop="backMoney">
                            <el-input v-model="ruleForm.backMoney" placeholder="请输入100以上的整数" type="number" class="income_money" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                        </el-form-item>
                        <el-form-item label="收款人:">
                            <span>{{tenantInfo.bankUseName | formatString}}</span>
                        </el-form-item>
                        <el-form-item label="收款账户:">
                            <span>{{tenantInfo.bankNo | formatString}}</span>
                            <!-- <span>（{{tenantInfo.bankName}}）</span> -->
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="incomeSubmit">
                <el-button type="primary" @click="submitForm('ruleForm')">提交结算审请</el-button>
            </div>
        </el-card>

         <div class="income_goods_wrap">
          <el-dialog id="el-title" title="确认结算账户" :visible.sync="incomeDialog" width="460px" center top="200px" :show-close="false">
              <div class="income_dialog">
                <div class="top_dialog">
                  <h4 style="color:black">确认结算至以下银行账户？</h4>
                  <p class="top_dialog_bank">
                    <span>{{accountInfo.bankNo | formatString}}</span>
                    <!-- <span>（{{ruleForm.backname}}）</span> -->
                  </p>
                  <p>
                    <label>收款人:</label>
                    <span>{{accountInfo.bankUseName | formatString}}</span>
                  </p>
                </div>
                
                <!-- <div class="bottom_dialog">
                  <h4 style="color:black">本次结算明细</h4>
                  <div class="order_income">
                    <p class="dialog_money">
                      <span>结算金额:{{strPrice | formatMonney}}</span>
                      <span>通道费(5%):{{channel | formatMonney}}</span>
                    </p>
                    <p>
                      <span>分成比例:{{dividedInto | formatMonney}}</span>
                      <span>实际到账:{{actualAccoun | formatMonney}}</span>
                    </p>
                  </div>
                </div> -->
              </div>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="commitIncome">确 定</el-button>
                  <el-button @click="cancelInvome">取 消</el-button>
              </span>
          </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import {
  countEarnings,
  settlementApplication,
  addBillingDetails
} from "../../common/request/request";
import { multiplyPrice,dividePrice } from "../../common/commonJS/commonjs.js";
export default {
  name: "incomeDetail",
  data() {
    return {
      tenantUid: "",
      ruleForm: {
        backMoney: null,
        payee: `阿曼达`,
        banknumber: "464546456454543",
        backname: "中国银行"
      },
      actualAccoun: String,
      channel: String,
      dividedInto: String,
      strPrice: String,
      accountInfo: {
        bankNo: String,
        bankUseName: String
      },
      tenantInfo: {
        bankName: String,
        bankNo: String,
        bankUseName: String
      },
      countEarnings: {
        availableCoin: String,
        countChannel: String,
        inCoin: String,
        totalCoin: String
      },
      incomeDialog: false,
      rules: {
        backMoney: [
          { required: true, message: "请输入结算金额", trigger: "blur" },
          { max: 10, message: "少于10位数", trigger: "blur" },
          { min:3, message: "请输入100以上的整数", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.tenantUid = this.userInfo.uid;
    this.getCountEarnings();
  },
  computed: {
    ...mapState(["userInfo"]),
    drawLines() {
      let backMoneyNumber = Number(this.ruleForm.backMoney);
      return backMoneyNumber - backMoneyNumber * 0.05;
    }
  },
  filters: {
    formatMonney: function(value) {
      if (typeof value == "function") {
        return "0";
      } else {
        return value;
      }
    },
    formatString: function(value) {
      if (typeof value == "function") {
        return "";
      } else {
        return value;
      }
    },
  },
  methods: {
    formater(value) {
      return value.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.incomeDialog = true;
          this.getSettlementApplication();
        } else {
          this.$message.error("提交失败!");
          return false;
        }
      });
    },
    commitIncome() {
      let self = this;
      this.incomeDialog = false;
      addBillingDetails(this.tenantUid,multiplyPrice(this.ruleForm.backMoney)).then(res => {
        if (res.data) {
          self.$message.success("提交成功");
          self.ruleForm.backMoney=null;
        } else {
          console.log("");
        }
      });
    },
    cancelInvome() {
      this.incomeDialog = false;
      this.ruleForm.backMoney = null;
    },
    getCountEarnings() {
      let self = this;
      countEarnings(this.tenantUid).then(res => {
        if (res.data) {
          self.countEarnings.availableCoin = dividePrice(res.data.countEarnings.availableCoin);
          self.countEarnings.inCoin = dividePrice(res.data.countEarnings.inCoin);
          self.countEarnings.totalCoin = dividePrice(res.data.countEarnings.totalCoin);
          self.tenantInfo = res.data.tenantInfo;
        } else {
          console.log("");
        }
      });
    },
    getSettlementApplication() {
      let self = this;
      let price = multiplyPrice(this.ruleForm.backMoney);
      settlementApplication(this.tenantUid, price).then(res => {
        if (res.data) {
          self.accountInfo.bankNo = res.data.bankNo;
          self.accountInfo.bankUseName = res.data.bankUseName;
          // self.actualAccoun = res.data.actualAccoun;
          // self.channel = res.data.channel;
          // self.dividedInto = res.data.dividedInto;
          // self.strPrice = res.data.strPrice;
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
.income_card {
  padding-top: 30px;
  height: 270px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
}
.total_income {
  height: 200px;
  width: 250px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.total_income p:first-child {
  font-size: 22px;
  font-weight: bold;
  padding-top: 15px;
}
.total_income p:last-child {
  font-size: 16px;
  font-weight: 200px;
  padding-bottom: 30px;
}
.income_form h3 {
  margin-top: 50px;
  margin-bottom: 50px;
  display: inline-block;
}
.income_introduce {
  margin-left: 10px;
  color: #aaa;
}
.income_formbx {
  margin-left: 50px;
}
.income_money {
  width: 200px;
}
.income_formbx span {
  color: #aaa;
}
.incomeSubmit {
  display: flex;
  justify-content: center;
  padding-top: 70px;
  padding-bottom: 15px;
}
.income_dialog {
  width: 80%;
  text-align: left;
  margin: auto;
}
.top_dialog {
  height: 120px;
}
.top_dialog_bank {
  margin: 15px auto;
  color: #ec414d;
}
.bottom_dialog {
  display: flex;
  flex-direction: column;
}
.order_income {
  display: flex;
  justify-content: space-between;
}
.order_income p {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 15px;
}
.order_income p span:first-child {
  margin-bottom: 15px;
}
</style>