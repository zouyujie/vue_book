// 运维管理
const operationRouter = {
  path: '/operation',
  component: resolve => require(['@/components/layout/shop/Home.vue'], resolve),
  name: 'operation',
  meta: {
    title: '运维管理'
  },
  children: [
    {
      path: '/operation/bill-search',
      component: () => import('@/components/layout/Container.vue'),
      name: 'bill-search',
      meta: { title: '工单查询' },
      children: [
        {
          path: '/operation/bill-search/repair',
          component: () =>
            import('@/views/operation/bill-search/repair-bill/index.vue'),
          meta: {
            title: '维修工单'
          }
        },
        {
          path: '/operation/bill-search/maintain',
          component: () =>
            import('@/views/operation/bill-search/maintain-bill/index.vue'),
          meta: {
            title: '保养工单'
          }
        }
      ]
    },
    {
      path: '/operation/member',
      component: () => import('@/components/layout/Container.vue'),
      meta: { title: '帮众管理' },
      children: [
        {
          path: '/operation/member/member-list',
          component: () => import('@/views/operation/member/MemberList.vue'),
          meta: {
            title: '帮众管理'
          }
        }
      ]
    }
  ]
};
export default operationRouter;
