import React, { ChangeEvent, useCallback } from "react";
import { Moment } from "moment";
import classNames from "classnames";
import { dateFormatter } from "../../ex/utils";
import { ValueField } from "../../ex/field";
import { UserType } from "../../api/enum.g";

export const TextFieldView = (props: {
  value: ValueField<string>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
}) => {
  return (
    <div className="relative mb-3 w-full lg:w-6/12">
      {props.label && (
        <label
          className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
          htmlFor="grid-password"
        >
          {props.label}
        </label>
      )}
      <input
        type="text"
        className={classNames(
          "w-full rounded border-0 px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring lg:w-10/12",
          {
            "bg-white": !props.disabled,
            "bg-gray-100": props.disabled,
          },
        )}
        value={props.value.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div>
  );
};

export const MomentFieldView = (props: { value: Moment | null; label?: string }) => {
  // 날짜는 수정 하지 않는다. DB 에 있는 데이터 그대로 보여주기만 한다.
  return (
    <div className="relative mb-3 w-full lg:w-6/12">
      {props.label && (
        <label
          className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
          htmlFor="grid-password"
        >
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

export const UserTypeView = (props: { value: UserType | null }) => {
  const mapper = useCallback((): string => {
    switch (props.value) {
      case UserType.LOCAL:
        return "local";
      case UserType.GOOGLE:
        return "Google";
      case UserType.NAVER:
        return "Naver";
      case UserType.KAKAO:
        return "Kakao";
      default: // UserType.APPLE:
        return "";
    }
  }, []);

  return (
    <div className="relative mb-3 w-full lg:w-6/12">
      <label
        className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
        htmlFor="grid-password"
      >
        사용자 유형
      </label>
      <input
        type="text"
        className="w-full rounded border-0 bg-gray-100 px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring lg:w-10/12"
        value={mapper()}
        disabled
      />
    </div>
  );
};
