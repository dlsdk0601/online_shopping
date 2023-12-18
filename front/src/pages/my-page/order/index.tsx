import { useRouter } from "next/router";
import React from "react";
import { isEmpty, isNil } from "lodash";
import { validatePageQuery } from "../../../ex/utils";
import { useOrders } from "../../../hooks/useOrders";
import { Replace } from "../../../layout/App";
import { mf1 } from "../../../ex/numberEx";
import { d1 } from "../../../ex/dateEx";
import PaginationBarView from "../../../view/PaginationBarView";
import { Urls } from "../../../url/url.g";
import MyPageListSkeleton from "../../../view/skeleton/MyPageListSkeleton";
import { paymentStatusEnumToLabel } from "../../../api/enum";
import { TossPaymentStatus } from "../../../api/enum.g";

const OrderPage = () => {
  const router = useRouter();
  const page = validatePageQuery(router.query.page) ?? 1;

  const { pagination, isLoading } = useOrders(page);

  if (isLoading) {
    return <MyPageListSkeleton />;
  }

  if (isNil(pagination)) {
    return <Replace url="_error" />;
  }

  return (
    <section className="section mt-4" id="products">
      <div className="container sign-container">
        <div className="row">
          <ul className="cart-item-wrapper">
            {isEmpty(pagination) && (
              <li>
                <span>order is empty</span>
              </li>
            )}
            {!isEmpty(pagination) &&
              pagination.rows.map((item) => {
                return (
                  <li
                    className="order-item rounded"
                    onClick={() =>
                      router.push(Urls["my-page"].order.show["[pk]"].url({ pk: item.pk }))
                    }
                  >
                    <p>{d1(item.createAt)}</p>
                    <p>{item.orderCode}</p>
                    <p>₩{mf1(item.price)}</p>
                    <p>{item.method}</p>
                    <p>{paymentStatusEnumToLabel(item.status as TossPaymentStatus)}</p>
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
