import { atom } from "recoil";
import { ShowManagerRes } from "../api/type.g";
import { queryKeys } from "../lib/contants";

export const userModel = atom<ShowManagerRes | null>({
  key: queryKeys.user,
  default: null,
});

export const userToken = atom<string | null>({
  key: queryKeys.token,
  default: null,
});
