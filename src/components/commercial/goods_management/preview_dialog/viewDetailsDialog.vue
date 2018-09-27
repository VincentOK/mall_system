<template>
  <div class="goods_detail">
    <h3>商品信息</h3>
    <div class="goods_center">
      <div class="goods_detail_left">
        <div>
          <label>商品名称：</label>
          <span class="goods_name">{{GoodsDetail.commodityName}}</span>
        </div>
        <div>
          <label>出售规格：</label>
          <span>{{GoodsDetail.unit}}</span>
        </div>
        <div>
          <label>促销计划：</label>
          <span>{{GoodsDetail.promotion}}</span>
        </div>
        <div>
          <label>支付渠道：</label>
          <p style="display:inline">{{GoodsDetail.typeName}}</p>
        </div>
        <div>
          <label>上架时间：</label>
          <span>{{GoodsDetail.createTime}}</span>
        </div>
        <div style="margin-left: -14px;">
          <label>可提供发票：</label>
          <span>{{GoodsDetail.support}}</span>
        </div>
      </div>
      <div class="goods_detail_right">
        <div>
          <label>实际售价：</label>
          <span>￥{{GoodsDetail.realityPrice}}</span>
        </div>
        <div>
          <label>建议售价：</label>
          <span>￥{{GoodsDetail.suggestPrice}}</span>
        </div>
        <div>
          <label>快递运费：</label>
          <span>￥{{GoodsDetail.carriage}}</span>
        </div>
        <div>
          <label>剩余库存：</label>
          <span>{{GoodsDetail.inventory}}</span>
        </div>
        <div>
          <label>支持退货：</label>
          <span>{{GoodsDetail.salesReturn}}</span>
        </div>
        <div class="invoice_type">
          <label>可提供发票类型：</label>
          <p>{{GoodsDetail.invoicetypeName}}</p>
        </div>
      </div>
    </div>
    <div class="product_detail">
      <label>商品详情：</label>
      <p v-html="GoodsDetail.detail"></p>
    </div>
    <div id="img_slider" v-if="sliders.length">
      <div class="img_window">
        <ul class="img_container" :style="containerStyle">
          <li>
            <img :src="sliders[sliders.length - 1].imgUrl" alt="">
          </li>
          <li v-for="(item, index) in sliders" :key="index">
            <img :src="item.imgUrl" alt="">
          </li>
          <li>
            <img :src="sliders[0].imgUrl" alt="">
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
  </div>
</template>

<script>
import {
  storeCommodityDetail,
  getCheckDetail
} from "../../../common/request/request.js";
import {
  multiplyPrice,
  dividePrice
} from "../../../common/commonJS/commonjs.js";
export default {
  name: "viewDetailDialog",
  props: {
    initialSpeed: {
      type: Number,
      default: 30
    },
    commodityId: String,
    activeName: String
  },
  data() {
    return {
      speed: this.initialSpeed,
      transitionEnd: true,
      currentIndex: 1,
      distance: -600,
      sliders: [],
      GoodsDetail: {
        carriage: String,
        commodityName: String,
        createTime: String,
        detail: String,
        inventory: Number,
        invoice: String,
        invoiceTypeList: Array,
        listImages: Array,
        payTypeList: Array,
        promotion: String,
        realityPrice: String,
        salesReturn: String,
        suggestPrice: String,
        support: String,
        unit: String
      }
    };
  },
  created() {
    let self = this;
    this.$nextTick(function() {
      this.getStoreCommodityDetail();
    });
  },
  watch: {
    commodityId: function() {
      this.getStoreCommodityDetail();
    }
  },
  methods: {
    getStoreCommodityDetail() {
      let self = this;
      if (this.activeName == "first" || this.activeName == "second") {
        storeCommodityDetail(self.commodityId)
          .then(res => {
            self.GoodsDetail = res.data;
            self.sliders = res.data.listImages;
            self.GoodsDetail.realityPrice = dividePrice(res.data.realityPrice);
            self.GoodsDetail.suggestPrice = dividePrice(res.data.suggestPrice);
            self.GoodsDetail.carriage = dividePrice(res.data.carriage);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (this.activeName == "third") {
        getCheckDetail(self.commodityId)
          .then(res => {
            self.GoodsDetail = res.data;
            self.sliders = res.data.listImages;
            self.GoodsDetail.realityPrice = dividePrice(res.data.realityPrice);
            self.GoodsDetail.suggestPrice = dividePrice(res.data.suggestPrice);
            self.GoodsDetail.carriage = dividePrice(res.data.carriage);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    move(offset, direction, speed) {
      if (!this.transitionEnd) return;
      this.transitionEnd = false;
      direction === -1
        ? (this.currentIndex += offset / 600)
        : (this.currentIndex -= offset / 600);
      if (this.currentIndex > this.sliders.length) this.currentIndex = 1;
      if (this.currentIndex < 1) this.currentIndex = this.sliders.length;
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
          if (des < -(600 * Number(this.sliders.length))) this.distance = -600;
          if (des > -600) this.distance = -(600 * Number(this.sliders.length));
        }
      }, 20);
    }
  },
  computed: {
    containerStyle() {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      };
    }
  }
};
</script>

<style scoped>
.goods_center {
  display: flex;
  padding-left: 100px;
  padding-top: 10px;
}
.goods_detail_left {
  width: 50%;
  position: relative;
}
.goods_detail_right {
  width: 50%;
}
.goods_detail_left div {
  height: 40px;
}
.goods_detail_right div {
  height: 40px;
}
.goods_detail_left div label {
  display: inline-block;
  height: 100%;
}
.goods_detail_left div span {
  position: absolute;
  display: inline-block;
  width: 70%;
}
.invoice_type {
  margin-left: -40px;
  width: 100%;
  position: relative;
}
.invoice_type p {
  display: inline-block;
}
.product_detail {
  padding: 5px 60px 5px 80px;
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
.right i {
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
