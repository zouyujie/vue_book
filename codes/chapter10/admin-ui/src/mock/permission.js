const platMenus = [
  {
    icon: "iconfont icon-ziyuan",
    index: "/plat-index",
    pid: 0,
    remark: "平台首页",
    id: 1,
    title: "平台首页",
    menuType: "menu"
  },
  {
    icon: "iconfont icon-paiming",
    index: "/data-rank",
    pid: 0,
    remark: "数据排名",
    id: 2,
    title: "数据排名",
    menuType: "page",
    btns: [],
    subs: [
      {
        icon: "",
        index: "/data-rank/shop-level",
        pid: 2,
        remark: "数据排名-分舵实力排名",
        id: 57,
        title: "分舵实力排名",
        menuType: "page",
        btns: ["export"]
      },
      {
        icon: "",
        index: "/data-rank/member-level",
        pid: 2,
        remark: "数据排名-人员武力排名",
        id: 58,
        title: "人员武力排名",
        menuType: "page",
        btns: ["export"]
      }
    ]
  },
  {
    icon: "iconfont icon-duibivs2",
    index: "/data-compare",
    pid: 0,
    remark: "数据对比",
    id: 3,
    title: "数据对比",
    menuType: "page",
    subs: [
      {
        icon: "",
        index: "/data-compare/project-compare",
        pid: 3,
        remark: "数据对比-分舵对比",
        id: 31,
        title: "分舵对比",
        menuType: "page",
        btns: ["export"]
      },
      {
        icon: "",
        index: "/data-compare/time-compare",
        pid: 3,
        remark: "数据对比-时间对比",
        id: 32,
        title: "时间对比",
        menuType: "page",
        btns: ["export"]
      }
    ]
  },
  {
    icon: "iconfont icon-baobiao",
    index: "/report-manage",
    pid: 0,
    remark: "报表管理",
    id: 4,
    title: "报表管理",
    menuType: "page",
    subs: [
      {
        icon: "",
        index: "/report-manage/matter-report",
        pid: 4,
        remark: "报表管理-分舵报表",
        id: 41,
        title: "分舵报表",
        menuType: "page",
        btns: ["export"]
      },
      {
        icon: "",
        index: "/report-manage/member-online",
        pid: 4,
        remark: "报表管理-人员在线",
        id: 42,
        title: "人员在线",
        menuType: "page",
        btns: ["export"]
      }
    ]
  }
];
const shopMenus = [
  {
    icon: "iconfont icon-ziyuan",
    index: "/shop-index",
    pid: 0,
    remark: "首页",
    id: 1,
    title: "首页"
  },
  {
    icon: "iconfont icon-daibanshixiang",
    index: "/operation",
    pid: 0,
    menuType: "menu",
    remark: "运维管理",
    id: 3,
    title: "运维管理",
    subs: [
      {
        icon: "iconfont icon-gongdan",
        index: "/operation/bill-search",
        pid: 8,
        menuType: "page",
        remark: "运维管理-工单查询",
        id: 19,
        type: 0,
        title: "工单查询",
        subs: [
          {
            belong: 2,
            icon: "",
            index: "/operation/bill-search/repair",
            btns: [
              "add",
              "detail",
              "dispatching",
              "cancle",
              "transfer-bill",
              "waiting",
              "audit"
            ],
            pid: 19,
            menuType: "page",
            remark: "运维管理-工单查询-维修工单",
            id: 40,
            type: 0,
            title: "维修工单",
            btnDesc: null
          },
          {
            belong: 2,
            icon: "",
            index: "/operation/bill-search/maintain",
            btns: ["detail", "dispatching", "cancle", "audit"],
            pid: 19,
            menuType: "page",
            remark: "运维管理-工单查询-保养工单",
            id: 41,
            type: 0,
            title: "保养工单",
            btnDesc: null
          }
        ]
      },
      {
        belong: 2,
        icon: "iconfont icon-renyuan",
        index: "/operation/member",
        pid: 8,
        menuType: "page",
        remark: "运维管理-帮众管理",
        id: 50,
        type: 0,
        title: "帮众管理",
        btnDesc: null,
        subs: [
          {
            belong: 2,
            icon: "",
            index: "/operation/member/member-list",
            btns: ["detail"],
            pid: 50,
            menuType: "page",
            remark: "运维管理-帮众管理",
            id: 51,
            type: 0,
            title: "帮众管理",
            btnDesc: null
          }
        ]
      }
    ]
  },
  {
    icon: "iconfont icon-shijian",
    index: "/matter",
    pid: 0,
    remark: "事项管理",
    id: 2,
    title: "事项管理",
    subs: [
      {
        belong: 2,
        icon: "iconfont icon-shijian",
        index: "/matter/matter-manage",
        pid: 8,
        menuType: "page",
        remark: "事项管理",
        id: 50,
        type: 0,
        title: "事项管理",
        btnDesc: null,
        subs: [
          {
            belong: 2,
            icon: "",
            index: "/matter/matter-manage/index",
            btns: ["detail"],
            pid: 50,
            menuType: "page",
            remark: "事项管理",
            id: 51,
            type: 0,
            title: "事项管理",
            btnDesc: null
          }
        ]
      }
    ]
  },
  {
    icon: "iconfont icon-zhaopin",
    index: "/recruit",
    pid: 0,
    remark: "招聘管理",
    id: 4,
    title: "招聘管理",
    subs: [
      {
        belong: 2,
        icon: "iconfont icon-shijian",
        index: "/recruit/recruit-manage",
        pid: 8,
        menuType: "page",
        remark: "招聘管理",
        id: 50,
        type: 0,
        title: "招聘管理",
        btnDesc: null,
        subs: [
          {
            belong: 2,
            icon: "",
            index: "/recruit/recruit-manage/index",
            btns: ["detail"],
            pid: 50,
            menuType: "page",
            remark: "招聘管理",
            id: 51,
            type: 0,
            title: "招聘管理",
            btnDesc: null
          }
        ]
      }
    ]
  },
  {
    icon: "iconfont icon-zijin",
    index: "/money",
    pid: 0,
    remark: "资金管理",
    id: 5,
    title: "资金管理",
    subs: [
      {
        belong: 2,
        icon: "iconfont icon-shijian",
        index: "/money/money-manage",
        pid: 8,
        menuType: "page",
        remark: "资金管理",
        id: 50,
        type: 0,
        title: "资金管理",
        btnDesc: null,
        subs: [
          {
            belong: 2,
            icon: "",
            index: "/money/money-manage/index",
            btns: ["detail"],
            pid: 50,
            menuType: "page",
            remark: "资金管理",
            id: 51,
            type: 0,
            title: "资金管理",
            btnDesc: null
          }
        ]
      }
    ]
  }
];
export { platMenus, shopMenus };
