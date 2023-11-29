import { atom } from "recoil";
import { ATOM_KEY } from "../lib/contants";

// front 에서는 skeleton UI 를 사용하지만
// admin 에서는 굳이 skeleton 까지 사용하지 않고 스피너로 처리하기 위한 state
export const isLoading = atom<boolean>({
  key: ATOM_KEY.LOADING,
  default: false,
});
