import axios, { AxiosRequestConfig } from "axios";
import { sleep } from "sleepjs";
import { baseConfig } from "../lib/config";
import { CONSTANT } from "../lib/contants";

export const axiosInstance = axios.create({
  baseURL: `${baseConfig.apiBaseUrl}`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = config.headers ?? {};
    if (sessionStorage.getItem(CONSTANT.sessionTokenKey)) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(CONSTANT.sessionTokenKey)}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export class ApiBase {
  get = async (url: string, config?: axios.AxiosRequestConfig<any>) => {
    return this.with(async () => {
      try {
        if (baseConfig.apiDelay) {
          await sleep(baseConfig.apiDelay);
        }

        const res = await axiosInstance.get(url, config);
        return res.data;
      } catch (err) {
        this.errorHandle(err);
      }
    });
  };

  post = async (url: string, data?: any, config?: axios.AxiosRequestConfig<any>) => {
    return this.with(async () => {
      try {
        if (baseConfig.apiDelay) {
          await sleep(baseConfig.apiDelay);
        }

        const res = await axiosInstance.post(url, data, config);
        return res.data;
      } catch (err) {
        this.errorHandle(err);
      }
    });
  };

  put = async (url: string, data: any, config?: AxiosRequestConfig<any>) => {
    return this.with(async () => {
      if (baseConfig.apiDelay) {
        await sleep(baseConfig.apiDelay);
      }

      const res = await axiosInstance.put(url, data, config);
      return res.data;
    });
  };

  delete = async (url: string, config?: AxiosRequestConfig<any>) => {
    return this.with(async () => {
      if (baseConfig.apiDelay) {
        await sleep(baseConfig.apiDelay);
      }

      const res = await axiosInstance.delete(url, config);
      return res.data;
    });
  };

  with = <T>(block: () => Promise<T>) => {
    return block();
  };

  build<T, U>(url: string): (req: T) => Promise<U> {
    return (req: T) => this.post(url, req);
  }

  errorHandle(err: unknown) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data.error ?? err.message;
      if (message !== "비로그인 유저 입니다.") {
        alert(message);
      }
      throw new Error(message);
    }
  }
}
