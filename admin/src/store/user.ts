import { atom, selector } from "recoil";
import { isNil } from "lodash";
import { ATOM_KEY, CONSTANT } from "../lib/contants";

export const accessToken = atom<string | null>({
  key: ATOM_KEY.TOKEN,
  default: null,
});

export const tokenModel = selector<string | null>({
  key: ATOM_KEY.TOKEN_MODEL,
  get: ({ get }) => {
    return get(accessToken);
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === "string") {
      set(accessToken, newValue);
      sessionStorage.setItem(CONSTANT.sessionTokenKey, newValue);
      return;
    }

    if (isNil(newValue)) {
      set(accessToken, newValue);
      sessionStorage.removeItem(CONSTANT.sessionTokenKey);
    }
  },
});
