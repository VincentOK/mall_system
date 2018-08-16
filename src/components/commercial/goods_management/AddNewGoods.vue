<!--新增商品-->
<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
            <h4>新增商品</h4>
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
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
                    <el-form-item label="商品名称">
                        <el-input v-model="form.name" placeholder="请输入不超过20个字" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="商品规格">
                        <el-input v-model="form.specification" placeholder="请选择商品出售的单位规格，如“每份 300克”、“一双”" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="实际售价￥:">
                        <el-input v-model.number="form.actual_price" type="number" placeholder="请输入单位实际售价" maxlength="20" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    </el-form-item>
                    <el-form-item label="建议售价">
                        <el-input v-model.number="form.suggest_price" type="number" placeholder="请输入单位建议售价，即删除线价格" maxlength="20" onkeypress='return(/[\d]/.test(String.fromCharCode(event.keyCode)))'></el-input>
                    </el-form-item>
                    <el-form-item label="剩余库存">
                        <el-input v-model="form.specification"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="选择器">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="城市级联">
                        <el-cascader :options="options" v-model="form.options"></el-cascader>
                    </el-form-item>
                    <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item> -->
                    <el-form-item label="支付渠道" class="the-buyer">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="微信支付" name="type"></el-checkbox>
                            <el-checkbox label="支付宝支付" name="type"></el-checkbox>
                            <el-checkbox label="银行卡支付" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="支持退货">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <p class="product-details">商品详情：（请进一步描述商品，或注意事项）</p>
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                        <p class="product-details">促销计划：<el-checkbox name="type"></el-checkbox>&nbsp;&nbsp;参与商城促销计划<span style="color:red">（推荐）</span></p>
                    </el-form-item>
                    <el-form-item class="submit-button">
                        <el-button type="primary" @click="onSubmit">查看预览</el-button>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "baseform",
  data: function() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      searchGoodsName: 0,
      val: 0,
      options: [
        {
          value: "guangdong",
          label: "广东省",
          children: [
            {
              value: "guangzhou",
              label: "广州市",
              children: [
                {
                  value: "tianhe",
                  label: "天河区"
                },
                {
                  value: "haizhu",
                  label: "海珠区"
                }
              ]
            },
            {
              value: "dongguan",
              label: "东莞市",
              children: [
                {
                  value: "changan",
                  label: "长安镇"
                },
                {
                  value: "humen",
                  label: "虎门镇"
                }
              ]
            }
          ]
        },
        {
          value: "hunan",
          label: "湖南省",
          children: [
            {
              value: "changsha",
              label: "长沙市",
              children: [
                {
                  value: "yuelu",
                  label: "岳麓区"
                }
              ]
            }
          ]
        }
      ],
      form: {
        name: "",
        specification: "",
        actual_price: null,
        suggest_price: null,
        region: "",
        date1: "",
        date2: "",
        delivery: true,
        type: ["步步高"],
        resource: "小天才",
        desc: "",
        options: []
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
    }
  }
};
</script>
<style scoped>
.form-box {
  margin-left: 50px;
  margin-top: 20px;
}
/* .el-input__inner::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.el-input__inner::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.input__inner::-webkit-textfield-decoration-container {
   background-color: #f0f3f9;
}  */
/* .upload-picture{
        width: 100px;
        height: 100px;
    } */
.el-upload-collect {
  position: relative;
  height: 150px;
  width: 1100px;
  font-size: 14px;
  color: #606266;
  text-align: left;
  margin-bottom: 15px;
}
.el-upload-collect p {
  padding-top: 30px;
  padding-left: 20px;
}
.el-upload-right {
  position: absolute;
  left: 9.3%;
  top: 0;
}
.product-details {
  margin-left: -70px;
  font-size: 14px;
  color: #606266;
}
.submit-button {
  margin: 0 100px;
}
</style>

