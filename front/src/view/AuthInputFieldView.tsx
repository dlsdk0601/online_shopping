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
      <div className="m-1 flex items-center justify-between">
        <label>{props.label}</label>
        <input
          className={classNames("w-1/2 rounded border p-1", {
            "border-red-400": !isBlank(props.field.error),
          })}
          value={props.field.value}
          onChange={(e) => props.onChange(e)}
          type={props.type ?? "text"}
        />
      </div>
      {!isBlank(props.field.error) && (
        <p className="text-right text-[13px] text-red-400">{props.field.error}</p>
      )}
    </>
  );
};

export default AuthInputFieldView;
