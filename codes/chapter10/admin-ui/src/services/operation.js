/**
 * 【运维管理】相关的业务操作
 */

import url from '../axios/url';
import request from '../axios/request';

//-------------------------------------帮众管理---------------------------
/**
 * 分页查询-人员信息
 * @param {*} params
 */
export function getMemberList(params) {
  return request.post(url.operation.getMemberList, params);
}
/**
 * 获取部门下拉框数据
 */
export function getDepartSelected() {
  return request.get(url.operation.getDepartSelected);
}
