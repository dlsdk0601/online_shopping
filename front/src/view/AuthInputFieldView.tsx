import React, { ChangeEvent } from "react";
import classNames from "classnames";
import { isBlank } from "../ex/utils";
import { ValueField } from "../ex/field";

const AuthInputFieldView = (props: {
  field: ValueField<string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: string;
  disabled?: boolean;
}) => {
  return (
    <>
      <div className="input-field">
        <label>{props.field.name}</label>
        <input
          className={classNames({
            "border-danger": !isBlank(props.field.error),
          })}
          value={props.field.value}
          onChange={(e) => props.onChange(e)}
          type={props.type ?? "text"}
          disabled={props.disabled}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
        {!isBlank(props.field.error) && (
          <p className="text-danger text-right">{props.field.error}</p>
        )}
      </div>
    </>
  );
};

export default AuthInputFieldView;
