/**
 * 首页相关的业务操作
 */

import url from '../axios/url';
import request from '../axios/request';

/**
 * 事项概览|平台首页待解决事项详情
 */
export function getMatterList(params) {
  return request.post(url.dashboard.getMatterList, params);
}

/**
 * 平台首页待解决事项数量|事项级别排名
 */
export function getMatterRankList() {
  return request.get(url.dashboard.getMatterRankList);
}
