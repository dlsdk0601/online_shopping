import { DependencyList, useEffect } from "react";
import { useRouter } from "next/router";
import { isUndefined } from "lodash";

/**
 * useIsReady
 * next.js useDidMount 대체
 * @param func: mount 되고 실행 될 콜백
 * @param deps: DependencyList
 */

const useIsReady = (func: () => void, deps?: DependencyList) => {
  const router = useRouter();

  useEffect(
    () => {
      if (router.isReady) {
        func();
      }
    },
    isUndefined(deps) ? [router] : [...deps, router],
  );
};

export default useIsReady;
