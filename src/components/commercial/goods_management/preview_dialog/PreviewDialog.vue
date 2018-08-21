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
      <!-- <swiper :options="swiperOption">
        <swiper-slide><img class="detail_img" src="/static/img/a1.jpg"></swiper-slide>
        <swiper-slide><img  class="detail_img" src="/static/img/a1.jpg"></swiper-slide>
        <swiper-slide><img  class="detail_img" src="/static/img/a1.jpg"></swiper-slide>
        <swiper-slide><img class="detail_img"  src="/static/img/a1.jpg"></swiper-slide>
      </swiper> -->

      <!-- <div class="swiper-pagination" style="width: 40px;height: 22.5px;text-align: center;line-height: 22.5px;background-color: black;opacity:0.5;font-size: 11px;border-radius: 12px;color: white;left: 85%" slot="pagination"></div> -->

    </div>
    <div>
        <div class="title_j">
          <p class="detail_tatle">
            <label class="detail_hot">热门</label>
            <label class="word_hot">越南美女包邮越南美女包邮越南美女包邮越南美女包邮越南美女包邮越南美女包邮越南美女包邮</label>
          </p>
          <p class="detail_money">
            <label class="money_real"><label class="fontM">￥</label>60.00</label>
            <label class="money_over"><label class="fontM_i">￥</label>33.00</label>
            <label class="money_over_count">剩余99件</label>
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
              <p>每份300克</p>
            </div>
          </div>
          <div class="adress_detail">
            <div class="adress_left">
              <p class="word_moren">运费</p>
            </div>
            <div class="adress_right">
              <p>包邮</p>
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
              <input class="number" type="number">
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
          <p>
            商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品
            详情商品详情商品详情商品详情商品详情商品详情商品详情
            商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品
            详情商品详情商品详情商品详情商品详情商品详情商品详情
          </p>
        </div>
        <!-- <paymoney-view v-on:childByValue="childByValue" v-if="paymoney"></paymoney-view>
        <paytime-view v-on:childByValue="childByValue" v-if="paytime"></paytime-view> -->
        <div class="buy_it">
          <button>立即购买</button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detail"
};
</script>

<style scoped>
.block {
  display: block;
}
.none {
  display: none;
}
.detail {
  /*font-size: 13px;*/
}
.buy_it {
  /* position: absolute; */
  /* bottom: 25.2%;
  width: 18.2%; */
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
  /*border: 1px solid red;*/
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
  /*border: 1px solid black;*/
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
/**
  **轮播图
   */
.swiper-pagination > .swiper-pagination-bullet-active {
  background-color: grey;
}
.title_i {
  position: relative;
}
.detail_img {
  width: 100%;
}
#my_pa {
  position: absolute;
  color: black;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
}
</style>
