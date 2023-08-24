import { Injectable } from "@nestjs/common";
import axios, { AxiosRequestConfig } from "axios";

@Injectable()
export class HttpService {
  // TODO :: 공통 log 기록 여기서 하기
  async get<T>(url: string, config: AxiosRequestConfig): Promise<T | null> {
    try {
      const res = await axios.get<T>(url, config);

      return res.data;
    } catch (e) {
      return null;
    }
  }

  async post<T>(url: string, config: AxiosRequestConfig, data: any): Promise<T | null> {
    try {
      const res = await axios.post<T>(url, data, config);

      return res.data;
    } catch (e) {
      return null;
    }
  }
}
