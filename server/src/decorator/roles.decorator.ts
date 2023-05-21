import { SetMetadata } from "@nestjs/common";
import { ManagerType } from "../type/type";

export const ROLES_KEY = "roles";
export const Roles = (...roles: ManagerType[]) => SetMetadata(ROLES_KEY, roles);
