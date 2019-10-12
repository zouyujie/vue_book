<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(slide,index) in swiperSlides" :key="index">
        <img :src="slide.img_url" />
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li
        class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"
        v-for="(item,index) in gridData"
        :key="index"
      >
        <router-link :to="item.url">
          <div class="item" :class="item.color">
            <span class="mui-icon" :class="item.icon"></span>
          </div>
          <div class="mui-media-body">{{item.title}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperSlides: [],
      gridData: [
        {
          color: "yellow",
          title: "全部分类",
          icon: "iconfont icon-fenlei",
          url: "/book-category"
        },
        {
          color: "red",
          title: "编程书籍",
          icon: "iconfont icon-programmingwindo",
          url: "/programming-book"
        },
        {
          color: "lightgreen",
          title: "拼团抢购",
          icon: "iconfont icon-gouwuche",
          url: "#"
        },
        {
          color: "green",
          title: "领券中心",
          icon: "iconfont icon-lingquanzhongxin",
          url: "#"
        },
        {
          color: "purple",
          title: "我的足迹",
          icon: "iconfont icon-zuji",
          url: "#"
        },
        {
          color: "blue",
          title: "留言反馈",
          icon: "iconfont icon-liuyan",
          url: "#"
        },
        {
          color: "orange",
          title: "联系我们",
          icon: "iconfont icon-lianxiwomen-copy",
          url: "#"
        }
      ]
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$axios.get("/homePage/sildes").then(res => {
        if (res.data.code == "200") {
          this.swiperSlides = res.data.data;
        }
        console.log("res", res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 218px;

  .mint-swipe-items-wrap {
    img {
      height: 100%;
    }

    .mint-swipe-item {
      text-align: center;
      background-color: lightblue;
    }
  }

  /deep/ .mint-swipe-indicator.is-active {
    background: #26a2ff;
  }

  /deep/ .mint-swipe-indicator {
    opacity: 1;
    background: wheat;
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;

  .mui-media-body {
    font-size: 13px;
  }

  .mui-table-view-cell {
    border: 0;

    .item {
      border-radius: 50%;
      display: table;
      width: 3.2em;
      height: 3.2em;
      line-height: 3.2em;
      margin: 0 auto;
    }
  }

  .mui-media {
    .mui-icon {
      font-size: 2em;
      color: white;
      vertical-align: middle;
      display: table-cell;
    }

    .yellow {
      background-color: #f5de42;
    }

    .red {
      background-color: #e87071;
    }

    .green {
      background-color: #c5cc71;
    }

    .purple {
      background-color: #6f8fe4;
    }

    .blue {
      background-color: #64b7fb;
    }

    .orange {
      background-color: #fec752;
    }

    .lightgreen {
      background-color: #bada4b;
    }
  }
}
</style>
