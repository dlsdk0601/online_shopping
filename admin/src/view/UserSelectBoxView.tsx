import { isNil } from "lodash";
import useValueField from "../hooks/useValueField";
import { SelectBoxView } from "../components/field/field";

const UserSelectBoxView = (props: {
  userList: [number | null, string][];
  onChange: (value: null | [number | null, string]) => void;
}) => {
  const [selectBox, setSelectBox] = useValueField<number | null>(null, "유저");
  const options: [number | null, string][] = [
    [null, "전체"],
    [1, "2"],
    [2, "1"],
  ];

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
    />
  );
};

export default UserSelectBoxView;
