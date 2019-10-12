const reportManageRouter = {
  path: '/report-manage',
  component: resolve =>
    require(['@/components/layout/platform/Home.vue'], resolve),
  meta: {
    title: '报表管理'
  },
  children: [
    {
      path: '',
      component: () => import('@/components/layout/Container.vue'),
      children: [
        {
          path: '/report-manage/matter-report',
          component: () => import('@/views/report-manage/MatterReport.vue'),
          meta: {
            title: '分舵报表'
          }
        },
        {
          path: '/report-manage/member-online',
          component: () => import('@/views/report-manage/MemberOnline.vue'),
          meta: {
            title: '人员在线'
          }
        }
      ]
    }
  ]
};
export default reportManageRouter;
