import { Request } from "express";
import { UserType } from "./commonType";

export type CustomRequest = Request;

export enum ManagerType {
  MANAGER = "MANAGER",
  SUPER = "SUPER",
}

export interface GlobalUser {
  pk: number;
  type: UserType;
  name: string;
  phone: string | null;
}

export interface GlobalManager {
  pk: number;
  type: ManagerType;
  name: string;
  id: string;
  email: string;
}

export type ImageType = {
  id?: number;
  type: string;
  fileName: string;
  fileBase64: string;
};

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

export enum TossPaymentCardAcquireStatus {
  READY = "READY", // 아직 매입 요청이 안 된 상태입니다.
  REQUESTED = "REQUESTED", // 매입이 요청된 상태입니다.
  COMPLETED = "COMPLETED", // 요청된 매입이 완료된 상태입니다.
  CANCEL_REQUESTED = "CANCEL_REQUESTED", // 매입 취소가 요청된 상태입니다.
  CANCELED = "CANCELED", // 요청된 매입 취소가 완료된 상태입니다.
}
