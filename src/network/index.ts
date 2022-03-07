import requestInstance from './request/index';
import { baseURL, timeout } from './request/config';
import localCacheInstance from '../utils/cache';

const HyRequest = new requestInstance({
  baseURL,
  timeout,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCacheInstance.getCache('token');
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        };
      }
      // console.log('实例设置的请求成功');
      return config;
    },
    requestInterceptorCatch: (error) => {
      // console.log('实例设置的请求失败');
      return error;
    },
    responsetInterceptor: (res) => {
      // console.log('实例设置的响应成功');
      return res;
    },
    responsetInterceptorCatch: (error) => {
      // console.log('实例设置的响应失败');
      return error;
    }
  }
});
export default HyRequest;
