<template>
    <div>
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
    </div>
</template>

<script>
export default {
  name: "viewDetailDialog",
  props: {
    initialSpeed: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      speed: this.initialSpeed,
      transitionEnd: true,
      currentIndex: 1,
      distance: -600,
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
      ]
    };
  },
  methods: {
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
