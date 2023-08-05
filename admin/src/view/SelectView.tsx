import React from "react";
import { isNil } from "lodash";
import { isNotNil } from "../ex/utils";

function SelectView<T>(props: {
  onChangeType: (type: T) => void;
  options: [T | null, string][];
  searchType: T | null;
  label?: string;
}) {
  return (
    <>
      {isNotNil(props.label) && <label>{props.label}</label>}
      <select
        className="rounded-l border border-solid border-neutral-300"
        value={stringify(props.searchType)}
        onChange={(e) => {
          for (let i = 0; i < props.options.length; i++) {
            if (isNil(props.options[i])) {
              continue;
            }

            // @ts-ignore
            const [label, _] = props.options[i];

            if (stringify(label) === e.target.value) {
              props.onChangeType(label);
              return;
            }
          }
        }}
      >
        {props.options.map(([label, value], index) => (
          <option key={index} value={stringify(label)}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}

function stringify(value: any): string {
  if (isNil(value)) {
    return "";
  }

  return value.toString();
}

export default SelectView;
