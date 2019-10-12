<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            v-for="item in bookCategory"
            :key="item.id"
            class="mui-control-item"
            :class="{'mui-active':item.id==3}"
            @tap="getPhotosByCateId(item.id)"
          >{{item.name}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in photos" :key="item.id" :to="'/book-detail/' + item.id" tag="li">
        <img v-lazy="item.url">
        <div class="msg">
          <h1 class="msg-title">{{ item.title }}</h1>
          <div class="msg-body">{{ item.msg }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
//导入 mui 的js文件
import mui from "../../libs/mui/js/mui.min.js";
export default {
  data() {
    return {
      bookCategory: [],
      photos: []
    };
  },
  created() {
    this.getProgramBookSubCategory();
    this.getPhotosByCateId(3); //初始化默认
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    //获取编程书籍子分类
    getProgramBookSubCategory() {
      this.$axios.get("/book/getProgramBookSubCategory").then(res => {
        if (res.data.code == "200") {
          this.bookCategory = res.data.data;
        }
        console.log("res", res);
      });
    },
    //根据分类ID获取图片列表信息
    getPhotosByCateId(id) {
      this.$axios.get("/book/getPhotosByCateId" + "/" + id).then(res => {
        if (res.data.code == "200") {
          this.photos = res.data.data;
        }
        console.log("res", res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
//https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action
* {
  touch-action: pan-y;
}
//顶部分类导航进行固定
.mui-slider {
  background-color: white;
  position: fixed;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding-bottom: 0;
  padding: 48px 10px 0px 10px;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #eee;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .msg {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(141, 133, 133, 0.4);
      max-height: 88px;
      .msg-title {
        font-size: 14px;
      }
      .msg-body {
        font-size: 13px;
        padding: 0px 8px;
        //多行文字超出显示省略号
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; //设置行数
        overflow: hidden;

        line-height: 20px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>