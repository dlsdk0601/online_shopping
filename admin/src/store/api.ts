import { atom } from "recoil";
import { CONSTANT } from "../lib/contants";

export const apiCount = atom<number>({
  key: CONSTANT.apiCount,
  default: 0,
});
