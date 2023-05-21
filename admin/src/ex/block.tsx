import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { apiCount } from "../store/api";

export const useApiCountHandle = (isIncrease: boolean) => {
  const setCount = useSetRecoilState(apiCount);
  useEffect(() => {
    if (isIncrease) {
      setCount((prev) => prev++);
    } else {
      setCount((prev) => prev--);
    }
  }, [isIncrease]);
};
