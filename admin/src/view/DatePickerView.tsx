import Datepicker from "react-tailwindcss-datepicker";
import moment, { Moment } from "moment";
import { isNil } from "lodash";
import { ValueField } from "../ex/field";

const DatePickerView = (props: {
  label?: string;
  filed: ValueField<Moment | null>;
  onChange: (value: Moment) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="relative mb-3 w-full lg:w-5/12">
      {/* 아이콘 때문에 width 값을 다른 input 과 다르게 한다. */}
      {props.label && (
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
          {props.label}
        </label>
      )}
      <Datepicker
        asSingle
        useRange={false}
        inputClassName="w-full rounded border-0 px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
        // 꼭 두가지의 날짜가 모두 있어야 해서, 하나는 null 처리한다.
        value={{
          startDate: props.filed.value?.toDate() ?? null,
          endDate: props.filed.value?.toDate() ?? null,
        }}
        onChange={(newValue) => {
          if (isNil(newValue)) {
            return;
          }
          const m = moment(newValue.startDate);
          props.onChange(m);
        }}
        disabled={props.disabled}
      />
    </div>
  );
};

export default DatePickerView;
