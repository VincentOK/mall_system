<!--新增商品-->
<template>
    <div>
        <div class="container">
            <h4>新增商品</h4>
            <div class="form-box">
                <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                    <el-form-item label="图片轮播图" prop="uploadImg">
                      <div class="el-upload-collect">
                        <!-- http://192.168.0.154:8989/timestoremanage/storeCommodity/uploadImages -->
                        <p>（最多5张）</p>
                        <div class="el-upload-right">
                            <el-upload
                                id="demos"
                                ref="uploadImage"
                                action=""
                                list-type="picture-card"
                                :limit="5"
                                :http-request="handlePost"
                                :file-list="form.uploadImg"
                                :on-preview="handlePictureCardPreview"
                                :on-success="handleAvatarSuccess"
                                :on-remove="handleRemove"
                                :before-upload="setImage">
                                <!-- <img v-if="cropImg" :src="cropImg" width="100px" height="100px"> -->
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </div>
                    </el-form-item>
                    <el-form-item label="商品名称:" prop="commodityName">
                        <el-input v-model="form.commodityName" placeholder="请输入不超过20个字"></el-input>
                    </el-form-item>
                    <el-form-item label="出售规格:" prop="unit">
                        <el-input v-model="form.unit" placeholder="请选择商品出售的单位规格，如“每份 300克”、“一双”" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="实际售价:" prop="realityPrice">
                        <el-input v-model="form.realityPrice" type="number" placeholder="请输入单位实际售价" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    </el-form-item>
                    <el-form-item label="建议售价:" prop="suggestPrice">
                        <el-input v-model="form.suggestPrice" type="number" placeholder="请输入单位建议售价，即删除线价格" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    </el-form-item>
                    <el-form-item label="剩余库存:" prop="inventory">
                        <el-input v-model="form.inventory" type="number" placeholder="请输入剩余库存" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    </el-form-item>
                    <div class="el_radio_freight">
                      <el-form-item label="快递运费:" prop="order_freight">
                          <el-radio-group v-model="form.order_freight">
                              <el-radio label="1">包邮</el-radio>
                              <el-radio label="2">买家承担</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item prop="carriage" class="input_freight" v-if="form.order_freight == '2'">
                        <el-input v-model="form.carriage" placeholder="请输入每笔订单买家需付的运费" type="number" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                      </el-form-item>
                    </div>
                    <div class="button_bottom">
                      <el-form-item label="买家支付渠道" class="the-buyer" prop="payType">
                        <div class="the_buyer_type">
                          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                          <el-checkbox-group v-model="form.payType" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="buytype in checkedBuyTypes" :label="buytype" :key="buytype">{{buytypeString(buytype)}}</el-checkbox>
                            <!-- <el-checkbox label="1">微信支付</el-checkbox>
                            <el-checkbox label="2">支付宝支付</el-checkbox>
                            <el-checkbox label="3">银行卡支付</el-checkbox> -->
                          </el-checkbox-group>
                        </div>
                      </el-form-item>
                      <el-form-item label="支持退货" prop="salesReturn">
                          <el-radio-group v-model="form.salesReturn">
                              <el-radio label="Y">是</el-radio>
                              <el-radio label="N">否</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item label="可提供发票" prop="invoice">
                          <el-radio-group v-model="form.invoice">
                              <el-radio label="Y">是</el-radio>
                              <el-radio label="N">否</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item label="可提供发票类型" class="the-buyer" prop="invoiceType">
                        <div class="the_buyer_type">
                          <el-checkbox :indeterminate="invoiceIndeterminate" v-model="checkAllInvoice" @change="handleCheckAllInvoiceChange">全选</el-checkbox>
                          <el-checkbox-group v-model="form.invoiceType" @change="handleCheckedInvoiceChange">
                            <el-checkbox v-for="invoiceType in checkedInvoiceTypes" :label="invoiceType" :key="invoiceType">{{invoiceString(invoiceType)}}</el-checkbox>
                            <!-- <el-checkbox label="1">普通发票</el-checkbox>
                            <el-checkbox label="2">增值税专业发票</el-checkbox> -->
                          </el-checkbox-group>
                        </div>
                      </el-form-item>
                    </div>
                    <el-form-item label="商品详情：" prop="detail" class="goods_desc">
                        <P class="">（请进一步描述商品，或注意事项）</P>
                        <div class="edit_container">
                      <quill-editor ref="myTextEditor" v-model="form.detail" :options="editorOption"></quill-editor>
                    </div>
                    </el-form-item>
                    <el-form-item class="product-details">
                      <el-checkbox v-model="form.promotion" true-label="Y" false-label="N"></el-checkbox>&nbsp;&nbsp;参与商城促销计划<span style="color:red;">（推荐）</span>
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
                  <preview-dialog :form_detail="form"></preview-dialog>
                </el-scrollbar>
            </div>
            <el-button type="primary"  @click="submitForm('form')">提交审核</el-button>
            <el-button type="success" class="close_buttom" @click="previewPhoneDialog = false">关闭</el-button>
          </div>
        </el-dialog>

          <!-- <el-dialog title="裁剪图片" :visible.sync="dialogimgVisible" width="30%">
                <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="dialogimgVisible = false">确 定</el-button>
                </span>
            </el-dialog> -->
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import VueCropper from "vue-cropperjs";
import { quillEditor } from "vue-quill-editor";
import previewDialog from "./preview_dialog/PreviewDialog.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import {
  addStoreCommodity,
  uploadGoodsImg
} from "../../common/request/request";
export default {
  name: "baseform",
  components: {
    quillEditor,
    previewDialog,
    VueCropper
  },
  data: function() {
    let self = this;
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      dialogimgVisible: false,
      fileList: [],
      imgSrc: "",
      cropImg: "",
      previewPhoneDialog: false,
      searchGoodsName: 0,
      checkAll: false,
      checkAllInvoice: false,
      checkedBuyTypes: [1, 2, 3],
      checkedInvoiceTypes: [1, 2],
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
        uploadImg: [],
        commodityName: "",
        unit: "",
        realityPrice: "",
        suggestPrice: null,
        inventory: "",
        order_freight: "1",
        carriage: null,
        payType: [1],
        salesReturn: "N",
        invoice: "N",
        invoiceType: [1],
        promotion: "Y",
        detail: ""
      },
      rules: {
        uploadImg: [
          { required: true, message: "至少一张图片", trigger: "blur" }
        ],
        commodityName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 0, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "请输入商品规格", trigger: "blur" },
          { min: 0, max: 17, message: "长度在 1 到 17 个字符", trigger: "blur" }
        ],
        realityPrice: [
          { required: false, message: "请输入实际售价", trigger: "blur" },
          { max: 7, message: "少于7位数", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (Boolean(self.form.suggestPrice)) {
                if (Number(value) < Number(self.form.suggestPrice)) {
                  callback();
                } else {
                  callback(new Error("实际售价价格需小于建议售价"));
                }
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        suggestPrice: [
          { required: true, message: "请输入建议售价", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (Number(value) > Number(self.form.realityPrice)) {
                callback();
              } else {
                callback(new Error("建议售价价格需大于实际售价"));
              }
            },
            trigger: "blur"
          }
        ],
        inventory: [
          { required: true, message: "请输入剩余库存", trigger: "blur" },
          { min: 0, max: 7, message: "少于10位数", trigger: "blur" }
        ],
        order_freight: [
          { required: true, message: "请选择运费方式", trigger: "change" }
        ],
        carriage: [
          {
            required: true,
            message: "请输入每笔订单买家需付的运费",
            trigger: "blur"
          },
          { max: 6, message: "请输入1~6位数", trigger: "blur" }
        ],
        payType: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个支付渠道",
            trigger: "change"
          }
        ],
        salesReturn: [
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
        invoiceType: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个发票类型",
            trigger: "change"
          }
        ],
        detail: [{ required: true, message: "必填", trigger: "blur" }]
      }
    };
  },
  // computed:{
  //   validateSuggestPrice(rule, value, callback) {
  //     if (!value) {
  //       return callback();
  //     }else{
  //       if(Number(value) > Number(self.form.realityPrice)){
  //         return callback();
  //       }else{
  //         callback(new Error("建议售价价格需大于实际售价"))
  //       }
  //     }
  //   }
  // },
  mounted() {},
  methods: {
    setImage(file) {
      // const file = e;
      // const reader = new FileReader();
      // reader.onload = event => {
      //   this.dialogimgVisible = true;
      //   this.imgSrc = event.target.result;
      //   this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
      // };
      // reader.readAsDataURL(file);
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
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    cancelCrop() {
      this.dialogimgVisible = false;
    },
    submitForm(formName) {
      let self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          let param = JSON.parse(JSON.stringify(self.form));
          param.realityPrice = Number(param.realityPrice);
          param.suggestPrice = Number(param.suggestPrice);
          param.inventory = Number(param.inventory);
          param.carriage = Number(param.carriage);
          addStoreCommodity(param)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
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
    handleAvatarSuccess(res, file) {
      this.$refs.form.clearValidate();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePost(file) {
      // var demos = document.getElementById("demos")
      // var a = new window.FormData(demos)
      // a.append('file', file)
      const fmtData = new window.FormData(file);
      fmtData.append("files", file);
      uploadGoodsImg(file).then(res => {
        console.log(res);
      });
    },
    // beforeAvatarUpload(file) {
    //   const isImage = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name);
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isImage) {
    //     this.$message.error("上传图片只能是Image格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isImage && isLt2M;
    // },
    handleCheckAllChange(val) {
      this.form.payType = val ? this.checkedBuyTypes : [];
      this.isIndeterminate = false;
    },
    handleCheckAllInvoiceChange(val) {
      this.form.invoiceType = val ? this.checkedInvoiceTypes : [];
      this.invoiceIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedBuyTypes.length;
    },
    handleCheckedInvoiceChange(value) {
      let checkedCount = value.length;
      this.checkAllInvoice = checkedCount === this.checkedInvoiceTypes.length;
    },
    buytypeString(value) {
      switch (value) {
        case 1:
          return "微信支付";
        case 2:
          return "支付宝支付";
        case 3:
          return "银行卡支付";
        default:
          return;
      }
    },
    invoiceString(value) {
      switch (value) {
        case 1:
          return "普通发票";
        case 2:
          return "增值税专用发票";
        default:
          return;
      }
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
}
.el-upload-dragger {
  width: 148px;
  height: 148px;
}
.el-upload-collect p {
  position: absolute;
  top: 45px;
  left: -85px;
  color: #ec414d;
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
  margin-left: -100px;
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
.preview_wrap button {
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

