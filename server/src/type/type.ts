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
