import { useRouter } from "next/router";
import React from "react";
import { isNil } from "lodash";
import { validatePageQuery } from "../../../ex/utils";
import { usePurchase } from "../../../hooks/usePurchase";
import { Replace } from "../../../layout/App";
import { mf2 } from "../../../ex/numberEx";
import { d1 } from "../../../ex/dateEx";
import PaginationBarView from "../../../view/PaginationBarView";

const OrderPage = () => {
  const router = useRouter();
  const page = validatePageQuery(router.query.page) ?? 1;

  const { pagination, isLoading } = usePurchase(page);

  if (isLoading) {
    // TODO :: skeleton
    return <></>;
  }

  if (isNil(pagination)) {
    return <Replace url="_error" />;
  }

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="row">
          <ul className="cart-item-wrapper">
            {pagination.rows.map((item) => {
              return (
                <li>
                  <p>{d1(item.createAt)}</p>
                  <p>{item.orderCode}</p>
                  <p>${mf2(item.price)}</p>
                  <p>{item.method}</p>
                  <p>{item.status}</p>
                </li>
              );
            })}
          </ul>
          <PaginationBarView pagination={pagination} />
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
