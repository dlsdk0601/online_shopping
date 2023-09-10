import { ShowPurchaseRes } from "../../api/type.g";

const PurchaseShowView = (props: { purchase: ShowPurchaseRes }) => {
  console.log(props.purchase);
  return <div>test</div>;
};

export default PurchaseShowView;
