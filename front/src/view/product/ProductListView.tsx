import { memo } from "react";
import { ProductListItem } from "../../api/type.g";
import ProductItemView from "../ProductItemView";
import { isNotNil } from "../../ex/utils";

const ProductListView = (props: { products: ProductListItem[] }) => {
  return (
    <>
      {isNotNil(props.products) &&
        props.products.map((item) => {
          return (
            <div key={`product-list-${item.pk}`} className="col-lg-4">
              <ProductItemView item={item} />
            </div>
          );
        })}
    </>
  );
};

export default memo(ProductListView);
