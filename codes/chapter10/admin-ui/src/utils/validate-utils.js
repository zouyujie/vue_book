/**
 * 格式验证
 */
import Regexps from '@/utils/regexp.js';
import Utils from './utils';
// 密码
export function validatePwd(rule, value, callback) {
    if (!Utils.notEmpty(value)) {
        callback(new Error('请输入密码'));
    } else if (value.indexOf(' ') > -1) {
        callback(new Error('密码不能存在空格'));
    }
    callback();
}
// 确认密码
export function validatePwdCheck(rule, value, callback, oldPwd) {
    if (!Utils.notEmpty(value)) {
        return callback(new Error('请输入确认密码'));
    } else if (value.indexOf(' ') > -1) {
        return callback(new Error('密码不能存在空格'));
    } else if (value != oldPwd) {
        return callback(new Error('两次输入密码不一致!'));
    } else {
        return callback();
    }
}
// 登录名校验
export function validateUserName(rule, value, callback) {
    if (!Utils.notEmpty(value)) return callback();
    const pattern = /\s/;
    if (pattern.test(value)) {
        return callback(new Error('不能有空格'));
    }
    const len = (value || '').length;
    if (len > 16 || len < 5) {
        return callback(new Error('长度5到16位'));
    }
    return callback();
}
// 用户名
export function validateRealName(rule, value, callback) {
    if (!Utils.notEmpty(value)) return callback();
    if (!Regexps.realName.test(value)) {
        return callback(new Error('长度16位以内(中英文和·)'));
    }
    return callback();
}
// 手机
export function isPhone(rule, value, callback) {
    if (!Utils.notEmpty(value)) return callback();
    let patter = Regexps.mobile;
    if (!patter.test(value)) {
        return callback(new Error('请输入正确的手机号格式'));
    } else {
        return callback();
    }
}
// 联系方式（包含手机和固定电话）
export function validateTel(rule, value, callback) {
    if (!Utils.notEmpty(value)) return callback();
    if (Regexps.mobile.test(value) || Regexps.telephone.test(value))
        return callback();
    return callback(new Error('请输入正确的手机号/固号'));
}

// 经纬度校验
export function validatelonlat(rule, value, callback) {
    if (!Utils.notEmpty(value)) return callback();
    let arr = value.split(',');
    if (arr.length !== 2) return callback('经纬度格式不正确!');
    if (!Regexps.longitude.test(arr[0])) {
        return callback(new Error('经度整数部分为0-180,小数部分为0到6位!'));
    }
    if (!Regexps.latitude.test(arr[1])) {
        return callback(new Error('纬度整数部分为0-90,小数部分为0到6位!'));
    }
    return callback();
}
