import { useState } from "react";
import { ValueField } from "../ex/field";

const useValueField = <T>(
  init: T,
): [ValueField<T>, { set: (payload: T) => void; err: (error: string) => void }] => {
  const [state, setState] = useState<ValueField<T>>({ value: init, error: "" });

  const onChangeState = (payload: T) => {
    setState({ ...state, value: payload });
  };

  const onError = (error: string) => {
    setState({ ...state, error });
  };

  return [state, { set: onChangeState, err: onError }];
};

export default useValueField;
