import React, { ChangeEvent } from "react";
import classNames from "classnames";
import { isBlank } from "../ex/utils";
import { ValueField } from "../ex/field";

const AuthInputFieldView = (props: {
  field: ValueField<string>;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => {
  return (
    <>
      <div className="input-field">
        <label>{props.label}</label>
        <input
          className={classNames({
            "border-danger": !isBlank(props.field.error),
          })}
          value={props.field.value}
          onChange={(e) => props.onChange(e)}
          type={props.type ?? "text"}
        />
        {!isBlank(props.field.error) && (
          <p className="text-danger text-right">{props.field.error}</p>
        )}
      </div>
    </>
  );
};

export default AuthInputFieldView;
