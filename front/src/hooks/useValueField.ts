import { useState } from "react";
import { isNil } from "lodash";
import { ValueField } from "../ex/field";
import { k } from "../ex/korean-postposition";

const useValueField = <T>(
  init: T,
  name: string,
): [ValueField<T>, { set: (payload: T) => void; err: (error?: string) => void }] => {
  const [state, setState] = useState<ValueField<T>>({ value: init, error: "", name });

  const onChangeState = (payload: T) => {
    setState({ ...state, value: payload, error: "" });
  };

  const onError = (error?: string) => {
    if (isNil(error)) {
      onDefaultError();
      return;
    }
    setState({ ...state, error });
  };

  const onDefaultError = () => {
    setState({ ...state, error: k(`${state.name}(은|는) 필수입니다.`) });
  };

  return [state, { set: onChangeState, err: onError }];
};

export default useValueField;
