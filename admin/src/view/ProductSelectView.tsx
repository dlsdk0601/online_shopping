import classNames from "classnames";
import React from "react";
import { SelectBoxView } from "../components/field/field";
import { ProductCategory } from "../api/enum.g";
import { categoryEnumToLabel } from "../api/enum";
import { ValueField } from "../ex/field";
import { isBlank } from "../ex/utils";

const ProductSelectView = (props: {
  value: ValueField<ProductCategory | null>;
  onChange: (category: ProductCategory | null) => void;
}) => {
  return (
    <>
      <SelectBoxView<ProductCategory | null>
        label={props.value.name}
        value={props.value.value}
        className={classNames(
          "px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring",
          {
            "border border-red-500": !isBlank(props.value.error),
            "border-0": isBlank(props.value.error),
          },
        )}
        options={[
          [null, "카테고리 선택"],
          [ProductCategory.MEN, categoryEnumToLabel(ProductCategory.MEN)],
          [ProductCategory.WOMEN, categoryEnumToLabel(ProductCategory.WOMEN)],
          [ProductCategory.KIDS, categoryEnumToLabel(ProductCategory.KIDS)],
          [ProductCategory.ACCESSORY, categoryEnumToLabel(ProductCategory.ACCESSORY)],
        ]}
        onChange={(value) => props.onChange(value)}
        error={props.value.error}
      />
    </>
  );
};

export default ProductSelectView;
