import { Request } from "express";
import { UserType } from "./commonType";

export type DataType = "ADMIN" | "FRONT";

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
}

export type CustomRequest = Request;

export enum ManagerType {
  MANAGER = "MANAGER",
  SUPER = "SUPER",
}

export interface GlobalUser {
  pk: number | null;
  type: ManagerType | UserType;
  name: string | null;
  dataType: DataType | null;
}

export type ImageType = {
  id?: number;
  type: string;
  fileName: string;
  fileBase64: string;
};
