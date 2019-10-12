export const SortKeyEnum = {
  //升序
  ascending: 'ASC',
  //降序
  descending: 'DESC'
};

export const YesOrNo = [
  {
    label: '是',
    value: 0,
    default: true
  },
  {
    label: '否',
    value: 1
  }
];

export const Status = [
  {
    label: '启用',
    value: 0
  },
  {
    label: '禁用',
    value: 1
    // default: true
  }
  // {
  //     label: "全部",
  //     value: -1,
  //     // default: true
  // }
];

export const StatusObj = {
  0: {
    label: '启用',
    value: 1
  },
  1: {
    label: '禁用',
    value: 0
  }
};

export const EnergyObj = {
  '01': {
    label: '电',
    value: '01'
  },
  '02': {
    label: '水',
    value: '02'
  },
  '03': {
    label: '气',
    value: '03'
  }
};
export const TypeList = {
  1: {
    label: '平台',
    value: 1
  },
  2: {
    label: '平台',
    value: 2
  },
  3: {
    label: '分舵',
    value: 3
  }
};

export const WorkState = {
  0: {
    label: '在职',
    value: 0
  },
  1: {
    label: '离职',
    value: 1
  }
};

//类型 (1, "环境"), (2, "风柜"), (3, "风盘"), (4, "照明");
export const MonitorInterTypeEnum = [
  {
    label: '环境',
    value: 1
  },
  {
    label: '风柜',
    value: 2
  },
  {
    label: '风盘',
    value: 3
  },
  {
    label: '照明',
    value: 4
  }
];

export const RoleTypeEnum = [
  { value: 0, label: '移动端' },
  { value: 1, label: '后台系统' },
  { value: 2, label: '首页模块' }
];

export const echartColor = [
  '#FF8E8E',
  '#979BF5',
  '#F5CB72',
  '#4BC2E7',
  '#F5A071',
  '#48D58E',
  '#F387A1',
  '#CF97F2',
  '#7EABF5',
  '#AADD61'
];
