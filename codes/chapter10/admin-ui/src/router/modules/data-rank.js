const dataRankRouter = {
  path: '/data-rank',
  component: resolve =>
    require(['@/components/layout/platform/Home.vue'], resolve),
  meta: {
    title: '数据排名'
  },
  children: [
    {
      path: '',
      component: () => import('@/components/layout/Container.vue'),
      children: [
        {
          path: '/data-rank/shop-level',
          component: () => import('@/views/data-rank/ShopLevel.vue'),
          meta: {
            title: '分舵实力排名'
          }
        },
        {
          path: '/data-rank/member-level',
          component: () => import('@/views/data-rank/MemberLevel.vue'),
          meta: {
            title: '人员武力排名'
          }
        }
      ]
    }
  ]
};
export default dataRankRouter;
