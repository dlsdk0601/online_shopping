import { Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";
import { HttpServiceLog } from "../../entities/http-log.entity";
import { HttpMethod } from "../../type/type";

@Injectable()
export class HttpService {
  async get<T>(url: string, config: AxiosRequestConfig): Promise<T | null> {
    const startAt = Date.now();
    const log = new HttpServiceLog();

    const baseUrl = url.split("?")[0];
    const query = url.split("?")[1];

    log.request_url = baseUrl;
    log.request_method = HttpMethod.GET;
    log.request_query = query;
    log.request_headers = config?.headers ?? {};
    try {
      const res = await axios.get<T>(url, config);

      log.response_status_code = res.status;
      log.response_headers = res.headers;
      log.response_body = JSON.stringify(res.data);
      return res.data;
    } catch (e) {
      log.exception = e instanceof Error ? e.message : "알수 없는 에러 발생";
      return null;
    } finally {
      log.response_duration_ms = Date.now() - startAt;
      await log.save();
    }
  }

  async post<T, U>(url: string, config: AxiosRequestConfig, data: U): Promise<T | null> {
    const startAt = Date.now();
    const log = new HttpServiceLog();

    log.request_url = url;
    log.request_method = HttpMethod.POST;
    log.request_body = JSON.stringify(data);
    log.request_headers = config?.headers ?? {};

    try {
      const res = await axios.post<T>(url, data, config);

      log.response_status_code = res.status;
      log.response_headers = res.headers;
      log.response_body = JSON.stringify(res.data);
      return res.data;
    } catch (e) {
      log.exception = e instanceof Error ? e.message : "알수 없는 에러 발생";
      return null;
    } finally {
      log.response_duration_ms = Date.now() - startAt;
      await log.save();
    }
  }
}
