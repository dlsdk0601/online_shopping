import React, { ChangeEvent } from "react";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import { preventDefaulted } from "../../ex/utils";

const SearchBarView = <T,>(props: {
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onChangeType: (type: T) => void;
  options: [T | null, string][];
  searchType: T | null;
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <form
          className="relative mb-4 flex w-full flex-wrap items-stretch"
          onSubmit={preventDefaulted(() => props.onSubmit())}
        >
          <select
            className="rounded-l border border-solid border-neutral-300"
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
          <input
            type="text"
            className="focus:border-primary-600 focus:shadow-te-primary relative m-0 -mr-px block w-[1%] min-w-0 flex-auto  bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:text-neutral-700 focus:outline-none"
            placeholder="Search"
            value={props.value}
            onChange={(e) => props.onChange(e)}
          />
          <button
            className="border-primary text-primary relative z-[2] border-2 border-r-0 px-6 py-2 text-xs font-medium uppercase text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            type="submit"
          >
            Search
          </button>
          <button
            className="border-primary text-primary relative z-[2] rounded-r border-2 px-6 py-2 text-xs font-medium uppercase text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
            id="button-addon3"
            type="button"
            onClick={() => router.push(router.pathname)}
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

function stringify(value: any): string {
  if (isNil(value)) {
    return "";
  }

  return value.toString();
}

export default SearchBarView;
