// 导入 App 组件
import VueRouter from "vue-router";
// 导入 login和register 组件

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      component: () => import("./components/nav/HomeContainer.vue"),
      meta: { title: "首页" },
    },
    {
      path: "/book-category",
      component: () => import("./views/books/BookCategory.vue"),
      meta: { title: "商品分类" }
    },
    {
      path: "/book-detail/:id",
      component: () => import("./views/books/BookDetail.vue"),
      meta: { title: "图书明细" }
    },
    {
      path: "/programming-book",
      component: () => import("./views/books/ProgrammingBook.vue"),
      meta: { title: "编程书籍" }
    },
    {
      path: "/order",
      component: () => import("./components/nav/OrderContainer.vue"),
      meta: { title: "订单" }
    },
    {
      path: "/shopcar",
      component: () => import("./components/nav/ShopcarContainer.vue"),
      meta: { title: "购物车" }
    },
    {
      path: "/my",
      component: () => import("./components/nav/MyContainer.vue"),
      meta: { title: "我的" }
    }
  ],
  linkActiveClass: "mui-active" // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
});

export default router;
