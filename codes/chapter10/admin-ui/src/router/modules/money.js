// 资金管理
const moneyRouter = {
  path: "/money",
  component: resolve => require(["@/components/layout/shop/Home.vue"], resolve),
  name: "money",
  meta: {
    title: "资金管理"
  },
  children: [
    {
      path: "/money/money-manage",
      component: () => import("@/components/layout/Container.vue"),
      meta: { title: "资金管理" },
      children: [
        {
          path: "/money/money-manage/index",
          component: () => import("@/views/money/index.vue"),
          meta: {
            title: "资金管理"
          }
        }
      ]
    }
  ]
};
export default moneyRouter;
