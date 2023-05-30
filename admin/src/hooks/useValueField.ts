import { useState } from "react";
import { ValueField } from "../ex/field";

type onChangeStateParameter<U> = U | ((prev: U) => U);
const useValueField = <T>(init: T) => {
  const [state, setState] = useState<ValueField<T>>({ value: init, error: "" });

  const onChangeState = (action: onChangeStateParameter<T>) => {
    if (typeof action === "function") {
      setState((prev) => action(prev));
    } else {
      setState({ ...state, value: action });
    }
  };

  const onError = (error: string) => {
    setState({ ...state, error });
  };

  return [state, { set: onChangeState, err: onError }];
};

export default useValueField;
