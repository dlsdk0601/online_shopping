import { useEffect } from "react";
import { isNotNil } from "../ex/utils";

const useScript = (src: string, onLoad?: () => void, deps?: any[]) => {
  useEffect(
    () => {
      const script = document.createElement("script");

      script.src = src;
      document.head.appendChild(script);
      script.onload = () => {
        if (isNotNil(onLoad)) {
          onLoad();
        }
      };

      return () => {
        document.head.removeChild(script);
      };
    },
    deps ? [...deps] : [],
  );
};
export default useScript;
