import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";
import { action } from "mobx";
import { Moment } from "moment";
import { ValueFiled } from "../../ex/field";
import { dateFormatter } from "../../ex/utils";

export const TextFieldView = observer(
  (props: {
    value: ValueFiled<string>;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    isShowingLabel?: boolean;
    disabled?: boolean;
  }) => {
    const onChange = props.onChange ?? action((e) => (props.value.value = e.target.value));
    return (
      <div className="relative mb-3 w-full lg:w-6/12">
        {props.isShowingLabel && (
          <label
            className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
            htmlFor="grid-password"
          >
            {props.value.name}
          </label>
        )}
        <input
          type="text"
          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring lg:w-10/12"
          value={props.value.value ?? ""}
          onChange={onChange}
          disabled={props.disabled}
        />
      </div>
    );
  },
);

export const MomentFieldView = observer(
  (props: { value: ValueFiled<Moment>; isShowingLabel?: boolean }) => {
    // 날짜는 수정 하지 않는다. DB 에 있는 데이터 그대로 보여주기만 한다.
    return (
      <div className="relative mb-3 w-full lg:w-6/12">
        {props.isShowingLabel && (
          <label
            className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
            htmlFor="grid-password"
          >
            {props.value.name}
          </label>
        )}
        <input
          type="text"
          className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring lg:w-10/12"
          value={dateFormatter(props.value.value)}
          disabled
        />
      </div>
    );
  },
);
