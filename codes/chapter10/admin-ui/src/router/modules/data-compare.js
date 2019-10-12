const dataCompareRouter = {
  path: '/data-compare',
  component: resolve =>
    require(['@/components/layout/platform/Home.vue'], resolve),
  meta: {
    title: '数据对比'
  },
  children: [
    {
      path: '',
      component: () => import('@/components/layout/Container.vue'),
      children: [
        {
          path: '/data-compare/project-compare',
          component: () => import('@/views/data-compare/ShopCompare.vue'),
          meta: {
            title: '分舵对比',
            limits: 10 //显示最多显示10条
          }
        },
        {
          path: '/data-compare/time-compare',
          component: () => import('@/views/data-compare/Timecompare.vue'),
          meta: {
            title: '时间对比',
            limits: 10
          }
        }
      ]
    }
  ]
};
export default dataCompareRouter;
