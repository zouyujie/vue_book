import request from '../axios/request';
import url from '../axios/url';

export function getMatterList(params) {
  return request.get(url.reportManage.getMatterList, params);
}
