import { isNil } from "lodash";
import { useEffect, useState } from "react";
import useValueField from "../hooks/useValueField";
import { SelectBoxView } from "../components/field/field";
import { api } from "../api/url.g";

const SubscribeSelectBoxView = (props: {
  userList: [number | null, string][];
  onChange: (value: null | [number | null, string]) => void;
  disabled?: boolean;
}) => {
  const [selectBox, setSelectBox] = useValueField<number | null>(null, "유저");
  const [options, setOptions] = useState<[number | null, string][]>([]);

  useEffect(() => {
    api.selectSubscribe({}).then((res) => {
      if (isNil(res)) {
        return;
      }

      setOptions([[null, "전체"], ...res.list]);
    });
  }, []);

  return (
    <SelectBoxView<number | null>
      value={selectBox.value}
      label={selectBox.name}
      onChange={(value) => {
        setSelectBox.set(value);
        if (isNil(value)) {
          props.onChange(value);
          return;
        }

        const isExist = props.userList.some(([pk, _]) => pk === value);
        if (isExist) {
          return;
        }

        const option = options.find(([pk, _]) => pk === value);
        props.onChange(option);
      }}
      options={options}
      disabled={props.disabled}
    />
  );
};

export default SubscribeSelectBoxView;
