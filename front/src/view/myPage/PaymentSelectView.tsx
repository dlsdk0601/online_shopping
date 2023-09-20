import { memo } from "react";
import { PaymentType } from "../../api/enum.g";
import { paymentEnumToLabel } from "../../api/enum";

const PaymentSelectView = (props: {
  onChange: (value: PaymentType) => void;
  className?: string;
}) => {
  const className = props.className ?? "";

  return (
    <select
      className={`form - select rounded px-2 ${className}`}
      onChange={(e) => props.onChange(e.target.value as PaymentType)}
    >
      <option selected>결제 방법</option>
      {Object.values(PaymentType).map((type) => (
        <option value={type}>{paymentEnumToLabel(type)}</option>
      ))}
    </select>
  );
};

export default memo(PaymentSelectView);
