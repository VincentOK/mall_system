<template>
    <div class="conent_all_h5">
    <div class="title_i">
        <el-carousel indicator-position="none">
            <el-carousel-item>
              <img class="detail_img" src="/static/img/a1.jpg">
            </el-carousel-item>
            <el-carousel-item>
            <img class="detail_img" src="/static/img/a1.jpg">
            </el-carousel-item>
            <el-carousel-item>
            <img class="detail_img" src="/static/img/a1.jpg">
            </el-carousel-item>
            <el-carousel-item>
            <img class="detail_img" src="/static/img/a1.jpg">
            </el-carousel-item>
        </el-carousel>
    </div>
    <div>
        <div class="title_j">
          <p class="detail_tatle">
            <label class="detail_hot">热门</label>
            <label class="word_hot">{{form_detail.goodsName?form_detail.goodsName:'秋衣毛裤毛衣裤袜'}}</label>
          </p>
          <p class="detail_money">
            <label class="money_real"><label class="fontM">￥</label>{{form_detail.actual_price?form_detail.actual_price:'60.00'}}</label>
            <label class="money_over"><label class="fontM_i">￥</label>{{form_detail.suggest_price?form_detail.suggest_price:'76.00'}}</label>
            <label class="money_over_count">剩余{{form_detail.goods_desc?form_detail.goods_desc:80}}件</label>
          </p>
        </div>
        <div class="null_div"></div>
        <div class="adress_detail_all">
          <div class="adress_detail">
            <div class="adress_left">
              <p class="word_moren">送至</p>
            </div>
            <div class="adress_right">
              <p><label>Vincent</label><label class="adress_tel">18376614866</label><img class="right_img" src="/static/img/right.png" alt=""></p>
              <p class="adress_relative"><img src="/static/img/address.png" alt=""><label>深圳市南山区田厦金牛广场1402</label></p>
            </div>
          </div>
          <div class="adress_detail">
            <div class="adress_left">
              <p class="word_moren">规格</p>
            </div>
            <div class="adress_right">
              <p>{{form_detail.specifications?form_detail.specifications:'每份300克'}}</p>
            </div>
          </div>
          <div class="adress_detail">
            <div class="adress_left">
              <p class="word_moren">运费</p>
            </div>
            <div class="adress_right">
              <p>{{form_detail.order_freight?'买家承担':'包邮'}}</p>
            </div>
          </div>
        </div>
        <div class="null_div"></div>
        <div class="adress_detail_all">
          <div class="adress_detail last_count">
          <div class="adress_left">
            <p class="word_moren">数量</p>
          </div>
          <div class="adress_right">
            <div class="right_count">
              <button class="add_count">
                <img src="/static/img/add.png" alt="">
              </button>
              <input class="number" type="number" value="1">
              <button  class="reduction">
                <img src="/static/img/reduction.png" alt="">
              </button>
            </div>
          </div>
        </div>
        </div>
        <div class="null_div"></div>
        <div class="detail_detail">
          <p>商品详情</p>
          <p v-html="goods_detail_html">
          </p>
        </div>
        <div class="buy_it">
          <button>立即购买</button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detail",
  props: {
    form_detail: {
      type: Object
    }
  },
  computed:{
    goods_detail_html(){
      return this.form_detail.desc?this.form_detail.desc:
      `<img src="/static/img/a1.jpg" style="width:50px;height:50px">
      <img src="/static/img/a1.jpg" style="width:50px;height:50px">
      <img src="/static/img/a1.jpg" style="width:50px;height:50px">
      <img src="/static/img/a1.jpg" style="width:50px;height:50px">
      <img src="/static/img/a1.jpg" style="width:50px;height:50px">
      在商品描述中，商品的图片看起来更直观，特别是对于表现商品局部的细节图片，
      但是顾客无法只通过图片了解商品的所有特征。
      却忽视了需要加些文字对商品进行更细致的描述。其实这是一个非常大的误区，
      因为实体店铺卖家与顾客之间的沟通方式很直接顾客也可以直接接触商品，
      而网络店铺的卖家与顾客之间的沟通无法做到准确全面，
       于是我们就特别需要利用文字来对商品的一些最基础的属性进行说明。
      只有顾客对商品的方面面都了解到了，顾客也才更有勇气确定购买。`
    }
  }
};
</script>

<style scoped>
.none {
  display: none;
}
.buy_it {
  margin: auto;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 2px;
  background-color: #f5f5f5;
}
.buy_it button {
  background-color: #ea3339;
  color: white;
  height: 45px;
  width: 90%;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  margin-left: 13px;
}
.detail_detail {
  width: 95%;
  margin: auto;
  text-align: left;
}
.detail_detail p:first-child {
  font-size: 14px;
  font-weight: 600;
}
.last_count {
  margin-top: 10px;
}
.right_count {
  width: 124px;
  height: 40px;
  float: right;
}
.right_count img {
  width: 20px;
  margin-top: 5px;
  margin-left: -5px;
}
.add_count {
  float: right;
  background-color: #f5f5f5;
  margin-left: 3px;
  width: 33px;
  height: 30px;
  border: none;
}
.number {
  float: right;
  width: 38px;
  height: 30px;
  margin-left: 3px;
  border: none;
  background-color: #f5f5f5;
  text-align: center;
}
.reduction {
  float: right;
  margin-left: 3px;
  background-color: #f5f5f5;
  width: 33px;
  border: none;
  height: 30px;
}
.adress_detail_all {
  width: 95%;
  margin: auto;
}
.adress_detail {
  display: flex;
}
.adress_detail p {
  margin: 0;
  padding: 0;
}
.adress_tel {
  margin-left: 15px;
}
.adress_relative {
  position: relative;
  height: 18px;
  line-height: 18px;
}
.adress_relative > img {
  position: absolute;
  left: 0;
  top: 1.5px;
}
.adress_relative > label {
  margin-left: 19px;
}
.word_moren {
  margin: 0;
  font-size: 13px;
  padding-top: 10px;
  color: #9b9b9b;
}
.adress_detail p:first-child {
  padding: 10px 0;
}
.adress_detail p img {
  width: 15px;
}
.right_img {
  float: right;
}
.adress_right {
  flex: 9;
  text-align: left;
  padding-left: 19px;
}
.title_j {
  width: 95%;
  margin: auto;
}
.detail_tatle {
  margin: 0;
  padding: 0;
  font-size: 15px;
  text-align: left;
  margin-top: 15px;
  position: relative;
}
.detail_hot {
  color: white;
  background-color: #ec414d;
  border-radius: 12px;
  font-size: 9px;
  padding: 0px 5px;
  position: absolute;
  left: 0;
  top: 3px;
}
.word_hot {
  font-weight: 600;
  margin-left: 35px;
}
.detail_money {
  margin: 0;
  text-align: left;
  margin-top: 13px;
  margin-bottom: 15px;
  /*padding: 10px 0;*/
}
.money_real {
  color: #ec414d;
  font-weight: 600;
  font-size: 18px;
}
.fontM {
  font-size: 11px;
}
.fontM_i {
  font-size: 10px;
}
.money_over {
  margin-left: 15px;
  font-size: 14px;
  color: #9b9b9b;
  text-decoration: line-through;
}
.money_over_count {
  font-size: 13px;
  color: #9b9b9b;
  float: right;
  margin-top: 2px;
}
.null_div {
  height: 10px;
  width: 100%;
  background-color: #f8f8f8;
}
.title_i {
  position: relative;
}
.detail_img {
  width: 100%;
}
</style>
