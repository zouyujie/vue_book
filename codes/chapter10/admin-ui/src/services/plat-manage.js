import request from '../axios/request';
import url from '../axios/url';
//短信模版模块
export function getSmsList(params) {
  return request.post(url.platManage.getSmsList, params);
}

export function addSms(params) {
  return request.post(url.platManage.addSms, params);
}

export function editSms(params) {
  return request.post(url.platManage.editSms, params);
}

//分舵概览
export function getcityListQuery(params = {}) {
  const areaId = params.areaId || 100000; // 100000为中国areaId
  return request.get(url.systemSettings.cityListQuery + `/${areaId}`);
}

export function getShopList(params) {
  return request.post(url.platManage.getShopList, params);
}
