// 事项管理
const matterRouter = {
  path: '/matter',
  component: resolve => require(['@/components/layout/shop/Home.vue'], resolve),
  name: 'matter',
  meta: {
    title: '事项管理'
  },
  children: [
    {
      path: '/matter/index',
      component: () => import('@/components/layout/Container.vue'),
      meta: { title: '事项管理' },
      children: [
        {
          path: '/matter/index',
          component: () => import('@/views/matter/index.vue'),
          meta: {
            title: '事项管理'
          }
        }
      ]
    }
  ]
};
export default matterRouter;
