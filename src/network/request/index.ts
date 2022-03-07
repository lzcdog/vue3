import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus/lib/components';
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';

//axios实例拦截器的接口
interface requestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responsetInterceptor?: (config: T) => T;
  responsetInterceptorCatch?: (error: any) => any;
}

//axios实例和requset时候的接口
interface requestInterceptorsConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: requestInterceptors<T>;
  isShowLoading?: boolean;
}
const SHOW_LOADING = true;
class requestInstance {
  instance: AxiosInstance;
  elLoading?: LoadingInstance;
  isShowLoading: boolean = SHOW_LOADING;
  constructor(config: requestInterceptorsConfig) {
    this.instance = axios.create(config);
    this.isShowLoading = config.isShowLoading ?? SHOW_LOADING;
    //实例拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responsetInterceptor,
      config.interceptors?.requestInterceptor
    );
    //全局
    this.instance.interceptors.request.use(
      (config) => {
        if (this.isShowLoading === true) {
          this.elLoading = ElLoading.service({
            lock: true,
            text: '正在请求中',
            background: 'rgb(255,255,255,.8)'
          });
        }
        // console.log('全局请求成功', config);
        return config;
      },
      (error) => {
        // console.log('全局请求失败', error);
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应成功', res);
        this.elLoading?.close();
        const data = res.data;
        return data;
      },
      (error) => {
        if (error.response.status === 400) {
          console.log('404报错');
        }
        console.log('全局响应失败', error);
        return error;
      }
    );
  }

  request<T>(config: requestInterceptorsConfig<T>): Promise<T> {
    return new Promise((reslove, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.isShowLoading === false) {
        this.isShowLoading = config.isShowLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responsetInterceptor) {
            res = config.interceptors?.responsetInterceptor(res);
            // console.log('响应设置成功', res);
          }
          this.isShowLoading = SHOW_LOADING;

          reslove(res);
        })
        .catch((error) => {
          console.log(error);
          this.isShowLoading = SHOW_LOADING;
          reject(error);
        });
    });
  }
  get<T>(config: requestInterceptorsConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T>(config: requestInterceptorsConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T>(config: requestInterceptorsConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  patch<T>(config: requestInterceptorsConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}
export default requestInstance;
