import axios, { AxiosRequestConfig } from "axios";
import { sleep } from "sleepjs";
import { isString } from "lodash";
import { baseConfig } from "../lib/config";
import { CONSTANT } from "../lib/contants";
import errorMessageG from "./errorMessage.g";

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
  private counter = 0;

  get = async (url: string, config?: AxiosRequestConfig<any>) => {
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

  post = async (url: string, data?: any, config?: AxiosRequestConfig<any>) => {
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
    this.increaseCounter();
    try {
      return block();
    } finally {
      this.decreaseCounter();
    }
  };

  build<T, U>(url: string): (req: T) => Promise<U> {
    return (req: T) => this.post(url, req);
  }

  deleteBuild<T extends { pk: number }, U>(url: string): (req: T) => Promise<U> {
    return (req: T) => this.delete(url.replace(":pk", `${req.pk}`));
  }

  getBuild<T, U>(url: string): (req: T) => Promise<U> {
    return (req: T) => this.get(this.getParameterHandle(url, req));
  }

  getParameterHandle<T>(url: string, req: T): string {
    const query = Object.entries(req)
      .flatMap(([key, values]) => {
        if (values === undefined) {
          return [];
        }

        return (isString(values) ? [values] : values)
          .map(encodeURIComponent)
          .map((value) => `${key}=${value}`);
      })
      .join("&");

    return `${url}?${query}`;
  }

  errorHandle(err: unknown) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data.message ?? err.message;
      if (message !== errorMessageG.NOT_TOKEN_USER) {
        alert(message);
      }
      // throw new Error(message);
    }
  }

  private increaseCounter = () => {
    this.counter++;
  };

  private decreaseCounter = () => {
    this.counter--;
  };
}
