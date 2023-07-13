import { memo } from "react";
import { mf2 } from "../ex/numberEx";
import { ProductListItem } from "../api/type.g";

const ProductItemView = (props: { item: ProductListItem }) => {
  return (
    <li className="item">
      <div className="thumb">
        <div className="hover-content">
          <ul>
            <li>
              <button type="button">
                <i className="fa fa-star" />
              </button>
            </li>
            <li>
              <button type="button">
                <i className="fa fa-shopping-cart" />
              </button>
            </li>
          </ul>
        </div>
        <img src={props.item.image.url} alt={`${props.item.category}-img-${props.item.pk}`} />
      </div>
      <div className="down-content">
        <h4>{props.item.name}</h4>
        <span>${mf2(props.item.price)}</span>
      </div>
    </li>
  );
};

export default memo(ProductItemView);
