import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { isEmpty, isNil } from "lodash";
import { api } from "../../../api/url.g";
import { queryKeys } from "../../../lib/contants";
import { isNotNil } from "../../../ex/utils";
import { mf1 } from "../../../ex/numberEx";

const CartPage = () => {
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);

  const { data: cartList } = useQuery([queryKeys.cart], () => api.cartList({}), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      let total = 0;
      for (let i = 0; i < res.list.length; i++) {
        total += (res.list[i]?.count ?? 0) * (res.list[i]?.price ?? 0);
      }

      setTotalPrice(total);
    },
  });

  return (
    <section className="section mt-4" id="products">
      <div className="container sign-container">
        <div className="row">
          <div className="cart-item-wrapper">
            {(isNil(cartList) || isEmpty(cartList.list)) && <li>cart is empty</li>}
            {isNotNil(cartList) &&
              !isEmpty(cartList.list) &&
              cartList.list.map((cart) => {
                return (
                  <li className="rounded">
                    <figure className="figure">
                      <img className="figure-img rounded" src={cart.image.url} alt="cart-img" />
                    </figure>
                    <p>{cart.name}</p>
                    <div>
                      <div>
                        <button type="button" className="count-button">
                          +
                        </button>
                        {cart.count}
                        <button type="button" className="count-button">
                          -
                        </button>
                      </div>
                    </div>
                    <p className="price">${mf1(cart.count * cart.price)}</p>
                  </li>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
