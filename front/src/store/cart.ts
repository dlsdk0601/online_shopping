import { atom } from "recoil";
import { ATOM_KEY } from "../lib/contants";

export const cartTotalPrice = atom<number>({
  key: ATOM_KEY.CART_TOTAL_PRICE,
  default: 0,
});
