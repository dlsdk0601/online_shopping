import React from "react";
import { Moment } from "moment";
import classNames from "classnames";
import { isNil } from "lodash";
import { dateFormatter, isBlank } from "../../ex/utils";
import { ValueField } from "../../ex/field";
import { mf1 } from "../../ex/numberEx";

export const TextFieldView = (props: {
  value: ValueField<string>;
  onChange: (value: string) => void;
  isShowingLabel?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div className="relative mb-3 w-full lg:w-6/12">
      {props.isShowingLabel && (
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
          {props.value.name}
        </label>
      )}
      <input
        type="text"
        className={classNames(
          "w-full rounded px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring lg:w-10/12",
          {
            "bg-white": !props.disabled,
            "bg-gray-100": props.disabled,
            "border-red-500": !isBlank(props.value.error),
            "border-0": isBlank(props.value.error),
          },
        )}
        value={props.value.value}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
      />
      {!isBlank(props.value.error) && (
        <p className="mt-1 text-xs text-red-500">{props.value.error}</p>
      )}
    </div>
  );
};

export const NumberFieldView = (props: {
  value: ValueField<number>;
  onChange: (value: number) => void;
  isShowingLabel?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div className="relative mb-3 w-full lg:w-6/12">
      {props.isShowingLabel && (
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
          {props.value.name}
        </label>
      )}
      <input
        type="text"
        className={classNames(
          "w-full rounded px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring lg:w-10/12",
          {
            "bg-white": !props.disabled,
            "bg-gray-100": props.disabled,
            "border-red-500": !isBlank(props.value.error),
            "border-0": isBlank(props.value.error),
          },
        )}
        value={mf1(props.value.value)}
        onChange={(e) => {
          const value = e.target.value.replaceAll(",", "");
          if (isNaN(Number(value))) {
            return;
          }
          props.onChange(Number(value));
        }}
        disabled={props.disabled}
      />
      {!isBlank(props.value.error) && (
        <p className="mt-1 text-xs text-red-500">{props.value.error}</p>
      )}
    </div>
  );
};

export const MomentFieldView = (props: { value: Moment | null; label?: string }) => {
  // 날짜는 수정 하지 않는다. DB 에 있는 데이터 그대로 보여주기만 한다.
  return (
    <div className="relative mb-3 w-full lg:w-6/12">
      {props.label && (
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
          {props.label}
        </label>
      )}
      <input
        type="text"
        className="w-full rounded border-0 bg-gray-100 px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring lg:w-10/12"
        value={dateFormatter(props.value)}
        disabled
      />
    </div>
  );
};

export const ReadOnlyTextView = (props: { value: string | number; label?: string }) => {
  return (
    <div className="relative mb-3 w-full lg:w-6/12">
      {props.label && (
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
          {props.label}
        </label>
      )}
      <input
        type="text"
        className="w-full rounded border-0 bg-gray-100 px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring lg:w-10/12"
        value={props.value}
        disabled
      />
    </div>
  );
};

export function SelectBoxView<T>(props: {
  label?: string;
  value: T;
  options: [T, string][];
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className="relative mb-3 w-full rounded lg:w-6/12">
      {props.label && (
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
          {props.label}
        </label>
      )}
      <select
        className={`${props.className} lg:w-/12 w-full rounded border-0`}
        value={stringify(props.value)}
        onChange={(event) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const [value, _] of props.options) {
            if (stringify(value) === event.target.value) {
              props.onChange(value);
              return;
            }
          }
        }}
        disabled={props.disabled ?? false}
      >
        {props.options.map(([value, label], index) => {
          return (
            <option key={index} value={stringify(value)}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function stringify(value: any): string {
  if (isNil(value)) {
    return "";
  }

  return value.toString();
}
