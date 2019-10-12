import axios from './axios';
import qs from 'qs';
export default {
  // get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param
      })
        .then((res = {}) => {
          if (res.code !== 200) reject(res);
          resolve(res);
        })
        .catch(_ => reject(_));
    });
  },
  // post请求
  post(url, param, headers) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param
      })
        .then((res = {}) => {
          if (res.code !== 200) reject(res);
          resolve(res);
        })
        .catch(_ => reject(_));
    });
  },
  // url表单请求
  postForm(url, param, headers) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(param)
      })
        .then((res = {}) => {
          if (res.code !== 200) reject(res);
          resolve(res);
        })
        .catch(_ => reject(_));
    });
  },
  // post表单数据
  postFormData(url, param) {
    const formtData = new FormData();
    for (const k in param) {
      formtData.append(k, param[k]);
    }
    return this.ajax({
      url: url,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formtData
    });
  }
};
