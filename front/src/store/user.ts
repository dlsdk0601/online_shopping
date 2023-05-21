import { atom, selector } from "recoil";
import { isNil } from "lodash";
import { ATOM_KEY, CONSTANT } from "../lib/contants";

export const userToken = atom<string | null>({
  key: ATOM_KEY.TOKEN,
  default: null,
});

export const tokenModel = selector<string | null>({
  key: ATOM_KEY.TOKEN_MODEL,
  get: ({ get }) => {
    return get(userToken);
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === "string") {
      set(userToken, newValue);
      sessionStorage.setItem(CONSTANT.sessionTokenKey, newValue);
      return;
    }

    if (isNil(newValue)) {
      set(userToken, newValue);
      sessionStorage.removeItem(CONSTANT.sessionTokenKey);
    }
  },
});
