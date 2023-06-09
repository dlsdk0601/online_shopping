import { useState } from "react";
import { isEmpty, isNil } from "lodash";
import { ValueField } from "../ex/field";
import { isBlank, isNotNil } from "../ex/utils";
import { k } from "../ex/korean-postposition";

type Validator = (value: string) => string | undefined;
const useValueField = <T>(
  init: T,
  name: string,
  ...validator: Validator[]
): [
  ValueField<T>,
  { set: (payload: T) => void; err: (error?: string) => void; validate: () => boolean },
] => {
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

  const validate = (): boolean => {
    let res = false;

    if (isEmpty(validator) && isBlank(state.value)) {
      onDefaultError();
      res = true;
      return res;
    }

    for (let i = 0; i < validator.length; i++) {
      const val = validator[i];
      const errorMessage = val(state.value);
      if (isNotNil(errorMessage)) {
        setState({ ...state, error: errorMessage });
        res = true;
        break;
      }
    }

    return res;
  };

  return [state, { set: onChangeState, err: onError, validate }];
};

export default useValueField;
