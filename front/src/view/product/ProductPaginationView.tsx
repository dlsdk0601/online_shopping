import { memo } from "react";
import ProductListView from "./ProductListView";
import { ProductListRes } from "../../api/type.g";
import PaginationBarView from "../PaginationBarView";

const ProductPaginationView = (props: { pagination: ProductListRes }) => {
  return (
    <div className="container">
      <div className="row">
        <ProductListView products={props.pagination.rows} />
        <PaginationBarView pagination={props.pagination} />
      </div>
    </div>
  );
};

export default memo(ProductPaginationView);
