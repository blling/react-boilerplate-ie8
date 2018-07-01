import axios from 'axios';
import uuidv4 from 'uuid/v4';
import merge from 'lodash/merge';
import jscookie from 'js-cookie';

import { SERVER_URL } from '../constants';

// 将X-Request-Id放入Cookie
const xRequestIdCookieName = 'X-Request-Id';
let xRequestId = jscookie.get(xRequestIdCookieName);
if (!xRequestId) {
  // 设置Cookie有效期1天
  jscookie.set(xRequestIdCookieName, uuidv4().replace(/-/g, ''), { expires: 1 });
  xRequestId = jscookie.get(xRequestIdCookieName);
}

// 若需要个性化
export const createAxios = (customerConfig = {}) => {
  const defaultConfig = {
    baseURL: SERVER_URL,
    timeout: 180000,
    withCredentials: false,
    headers: { 'X-Request-Id': xRequestId },
  };

  return axios.create(merge(defaultConfig, customerConfig));
};

// 创建Axios单例
const axiosInstance = createAxios();

export default axiosInstance;
