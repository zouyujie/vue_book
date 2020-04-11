// 招聘管理
const recruitRouter = {
  path: "/recruit",
  component: resolve => require(["@/components/layout/shop/Home.vue"], resolve),
  name: "recruit",
  meta: {
    title: "招聘管理"
  },
  children: [
    {
      path: "/recruit/recruit-manage",
      component: () => import("@/components/layout/Container.vue"),
      meta: { title: "招聘管理" },
      children: [
        {
          path: "/recruit/recruit-manage/index",
          component: () => import("@/views/recruit/index.vue"),
          meta: {
            title: "招聘管理"
          }
        }
      ]
    }
  ]
};
export default recruitRouter;
