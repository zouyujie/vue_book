/**
 * 用户相关的业务操作
 */

import url from '../axios/url';
import request from '../axios/request';

/**
 * 获取短信验证码
 * @param {} params
 */
export function getSmsCode(phone) {
  return request.get(url.user.getSmsCode + '/' + phone);
}
/**
 * 根据验证码修改密码-忘记密码
 * @returns {
 *     code: 验证码
 *     password:密码
 *     phone:手机号
 * }
 */
export function changePwdBySms(params) {
  return request.post(url.user.changePwdBySms, params);
}
/**
 * 登录
 * @param {*} params
 */
export function loginFun(params) {
  return request.post(url.user.login, params);
}
/**
 * 退出登录
 */
export function logoutFun() {
  return request.get(url.user.logout);
}
/**
 * 修改用户密码
 */
export function changePwd(params) {
  return request.post(url.user.changePwd, params);
}
