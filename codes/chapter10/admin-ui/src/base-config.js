// 此文件用于存储全局公用配置
export default class BaseConfig {
  constructor() {}
  static title = '天下会管理平台';
  static validate = {
    pwd: {
      min: 5,
      max: 16,
      message: '长度在 5 到 16 个字符',
      trigger: 'blur'
    }
  };
  //loading对象实体
  static loading = {
    text: '拼命加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(240,248,255, 0.5)'
  };
  // 请求ip+port地址
  static BASE_IP = process.env.BASE_IP;
  static messageDuration = 2000;
}
