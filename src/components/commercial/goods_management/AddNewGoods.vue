<!--新增商品-->
<template>
    <div>
        <div class="container">
            <h4>新增商品</h4>
            <div class="form-box">
                <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                    <div class="el-upload-collect">
                        <p>图片轮播图</p>
                        <p>（最多5张）</p>
                        <div class="el-upload-right">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :limit="5"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :before-upload="beforeAvatarUpload">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </div>
                    <el-form-item label="商品名称:" prop="goodsName">
                        <el-input v-model="form.goodsName" placeholder="请输入不超过20个字"></el-input>
                    </el-form-item>
                    <el-form-item label="出售规格:" prop="specifications">
                        <el-input v-model="form.specifications" placeholder="请选择商品出售的单位规格，如“每份 300克”、“一双”" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="实际售价:" prop="actual_price">
                        <el-input v-model="form.actual_price" type="number" placeholder="请输入单位实际售价" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    </el-form-item>
                    <el-form-item label="建议售价:" prop="suggest_price">
                        <el-input v-model="form.suggest_price" type="number" placeholder="请输入单位建议售价，即删除线价格" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    </el-form-item>
                    <el-form-item label="剩余库存:" prop="goods_desc">
                        <el-input v-model="form.goods_desc" type="number" placeholder="请输入剩余库存" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    </el-form-item>
                    <div class="el_radio_freight">
                      <el-form-item label="快递运费:" prop="order_freight">
                          <el-radio-group v-model="form.order_freight" prop='order_freight'>
                              <el-radio label="包邮"></el-radio>
                              <el-radio label="买家承担"></el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item prop="input_freight" class="input_freight">
                        <el-input v-model="form.input_freight" placeholder="请输入每笔订单买家需付的运费" type="number" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                      </el-form-item>
                    </div>
                    <div class="button_bottom">
                      <el-form-item label="买家支付渠道" class="the-buyer" prop="buy_type">
                        <div class="the_buyer_type">
                          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                          <el-checkbox-group v-model="form.buy_type" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="buytype in checkedBuyTypes" :label="buytype" :key="buytype">{{buytype}}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </el-form-item>
                      <el-form-item label="支持退货" prop="returned_goods">
                          <el-radio-group v-model="form.returned_goods">
                              <el-radio label="是"></el-radio>
                              <el-radio label="否"></el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item label="可提供发票" prop="invoice">
                          <el-radio-group v-model="form.invoice">
                              <el-radio label="是"></el-radio>
                              <el-radio label="否"></el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item label="可提供发票类型" class="the-buyer" prop="invoice_type">
                        <div class="the_buyer_type">
                          <el-checkbox :indeterminate="invoiceIndeterminate" v-model="checkAllInvoice" @change="handleCheckAllInvoiceChange">全选</el-checkbox>
                          <el-checkbox-group v-model="form.invoice_type" @change="handleCheckedInvoiceChange">
                            <el-checkbox v-for="invoiceType in checkedInvoiceTypes" :label="invoiceType" :key="invoiceType">{{invoiceType}}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                      </el-form-item>
                    </div>
                    <el-form-item label="商品详情：" prop="desc" class="goods_desc">
                        <P class="">（请进一步描述商品，或注意事项）</P>
                    </el-form-item>
                    <div class="edit_container">
                          <quill-editor ref="myTextEditor" v-model="form.desc" :options="editorOption"></quill-editor>
                        </div>
                    <el-form-item class="product-details">
                      <el-checkbox v-model="form.product_details"></el-checkbox>&nbsp;&nbsp;参与商城促销计划<span style="color:red;">（推荐）</span>
                      <el-tooltip class="tooltip_item" effect="dark" placement="right">
                        <div slot="content">该选项旨在为商品提供更利于出售的商品位。您若勾选此选项，<br>则表示同意时间商城有权随时将您的商品移至/撤出“限时抢购”<br>专区，商城将不再另行通知。该规则若有变更，时间商城将向<br>您发送通知，并同时默认您同意新的变更。</div>
                        <img src="static/img/hover_tooplip.png" class="tooplip_img">
                      </el-tooltip>
                    </el-form-item>
                    <el-form-item class="submit-button">
                        <el-button type="primary"  @click="submitForm('form')">提交审核</el-button>
                        <el-button type="success" @click="previewPhone">查看预览</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible" top="5vh">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-dialog :visible.sync="previewPhoneDialog" top="5vh" width="0" :show-close="false">
          <div class="preview_wrap">
             <img src="static/img/demo.png">
             <div class="preview_content">
               <el-scrollbar style="height:100%;">
                  <preview-dialog></preview-dialog>
                </el-scrollbar>
            </div>
            <el-button type="primary">提交审核</el-button>
            <el-button type="success" class="close_buttom">关闭</el-button>
          </div>
        </el-dialog>
        <!-- <div v-show="previewPhoneDialog">
          <div class="wrap_preview"></div>
          <div class="preview_bg">
            <img src="static/img/demo.png">
            <div class="preview_content">
                hello!
            </div>
          </div>
        </div> -->
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import previewDialog from "./preview_dialog/PreviewDialog.vue";
export default {
  name: "baseform",
  components: {
    quillEditor,
    previewDialog
  },
  data: function() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      previewPhoneDialog: false,
      searchGoodsName: 0,
      checkAll: false,
      checkAllInvoice: false,
      checkedBuyTypes: ["微信支付", "支付宝支付", "银行卡支付"],
      checkedInvoiceTypes: ["普通发票", "增值税专业发票"],
      isIndeterminate: false,
      invoiceIndeterminate: false,
      editorOption: {
        modules: {
          toolbar: [
            ["image", "bold", "italic", "underline"],
            [{ color: [] }],
            [{ align: [] }],
            [{ list: "ordered" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ size: [] }, { font: [] }]
          ]
        }
      },
      form: {
        goodsName: "",
        specifications: "",
        actual_price: null,
        suggest_price: null,
        goods_desc: "",
        order_freight: "",
        input_freight: "",
        buy_type: ["微信支付"],
        returned_goods: "否",
        invoice: "否",
        invoice_type: ["普通发票"],
        product_details: true,
        desc: ""
      },
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        specifications: [
          { required: true, message: "请输入商品规格", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        actual_price: [
          { required: true, message: "请输入实际售价", trigger: "blur" },
          { max: 10, message: "少于10位数", trigger: "blur" }
        ],
        suggest_price: [
          { required: true, message: "请输入建议售价", trigger: "blur" },
          { max: 10, message: "少于10位数", trigger: "blur" }
        ],
        goods_desc: [
          { required: true, message: "请输入剩余库存", trigger: "blur" },
          { max: 10, message: "少于10位数", trigger: "blur" }
        ],
        order_freight: [
          { required: true, message: "请选择运费方式", trigger: "change" }
        ],
        input_freight: [
          {
            required: true,
            message: "请输入每笔订单买家需付的运费",
            trigger: "blur"
          },
          { max: 10, message: "少于10位数", trigger: "blur" }
        ],
        buy_type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个支付渠道",
            trigger: "change"
          }
        ],
        returned_goods: [
          {
            required: true,
            message: "请选择是否支持退货",
            trigger: "change"
          }
        ],
        invoice: [
          {
            required: true,
            message: "请选择是否提供发票",
            trigger: "change"
          }
        ],
        invoice_type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个发票类型",
            trigger: "change"
          }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  //   watch: {
  //     searchGoodsName: function() {
  //       if (!this.searchGoodsName.replace(/[^0-9]+/g, "")) {
  //         this.$message.error("上传图片只能是Image格式!");
  //       }
  //     }
  //   },
  methods: {
    handleInput(e) {
      e = e.replace(/[^\d]/g, "");
    },
    onSubmit() {
      this.$message.success("提交成功！");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message.success("提交成功！");
        } else {
          this.$message.error("提交失败!");
          return false;
        }
      });
    },
    previewPhone() {
      this.previewPhoneDialog = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      const isImage = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error("上传图片只能是Image格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    handleCheckAllChange(val) {
      this.form.buy_type = val ? this.checkedBuyTypes : [];
      this.isIndeterminate = false;
    },
    handleCheckAllInvoiceChange(val) {
      this.form.invoice_type = val ? this.checkedInvoiceTypes : [];
      this.invoiceIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedBuyTypes.length;
    },
    handleCheckedInvoiceChange(value) {
      let checkedCount = value.length;
      this.checkAllInvoice = checkedCount === this.checkedInvoiceTypes.length;
    }
  }
};
</script>
<style scoped>
.container {
  padding-top: 20px;
}
.form-box {
  margin: 0 auto;
}
.el-upload-collect {
  position: relative;
  height: 100px;
  width: 140%;
  font-size: 14px;
  color: #606266;
  text-align: left;
  margin-bottom: 15px;
}
.el-upload-dragger {
  width: 148px;
  height: 148px;
}
.el-upload-collect p:first-child {
  color: #606266;
}
.el-upload-collect p {
  padding-top: 20px;
  padding-left: 32px;
  color: #ec414d;
}
.el-upload-right {
  position: absolute;
  left: 14.5%;
  top: 0;
}
.product-details {
  font-size: 14px;
  color: #c0ccc4;
}
.submit-button {
  margin: 0 100px;
}
.el_radio_freight {
  position: relative;
}
.input_freight {
  width: 65%;
  position: absolute;
  right: 0;
  top: 0;
}
.the_buyer_type label:first-child {
  float: left;
}
.the_buyer_type .el-checkbox-group label:first-child {
  margin-left: 30px;
}
.goods_desc p {
  color: #606266;
}
.tooplip_img {
  position: absolute;
  left: 200px;
  top: 7px;
}
.edit_container {
  margin-left: 30px;
}
.preview_wrap {
  position: relative;
}
.preview_wrap img {
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  position: absolute;
  top: 40px;
  left: -110px;
}
.preview_wrap button{
  position: absolute;
  top: 625px;
  left: 210px;
}
.preview_wrap .close_buttom {
  position: absolute;
  top: 580px;
  left: 200px;
}

.preview_content {
  width: 282px;
  height: 500px;
  position: absolute;
  top: 117px;
  left: -90px;
}
</style>

