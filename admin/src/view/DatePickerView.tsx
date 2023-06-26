import Datepicker from "react-tailwindcss-datepicker";
import moment, { Moment } from "moment";
import { isNil } from "lodash";
import React from "react";
import classNames from "classnames";
import { ValueField } from "../ex/field";
import { isBlank } from "../ex/utils";

const DatePickerView = (props: {
  field: ValueField<Moment | null>;
  onChange: (value: Moment) => void;
  disabled?: boolean;
  isShowingLabel?: boolean;
}) => {
  return (
    <div className="relative mb-3 w-full lg:w-5/12">
      {/* 아이콘 때문에 width 값을 다른 input 과 다르게 한다. */}
      {props.isShowingLabel && (
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
          {props.field.name}
        </label>
      )}
      <Datepicker
        asSingle
        useRange={false}
        inputClassName={classNames(
          "w-full rounded border-0 px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring",
          {
            "border-red-500": !isBlank(props.field.error),
            "border-0": isBlank(props.field.error),
          },
        )}
        // 꼭 두가지의 날짜가 모두 있어야 해서, 하나는 null 처리한다.
        value={{
          startDate: props.field.value?.toDate() ?? null,
          endDate: props.field.value?.toDate() ?? null,
        }}
        onChange={(newValue) => {
          if (isNil(newValue)) {
            return;
          }
          const m = moment(newValue.startDate);
          props.onChange(m);
        }}
        disabled={props.disabled}
        minDate={new Date()}
      />
      {!isBlank(props.field.error) && (
        <p className="mt-1 text-xs text-red-500">{props.field.error}</p>
      )}
    </div>
  );
};

export default DatePickerView;
