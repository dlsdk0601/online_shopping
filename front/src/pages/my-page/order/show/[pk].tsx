import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import { isNotNil, validatePk } from "../../../../ex/utils";
import { api } from "../../../../api/url.g";
import { queryKeys } from "../../../../lib/contants";
import { mf2 } from "../../../../ex/numberEx";

const OrderShowPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (isNil(pk)) {
    // TODO :: skeleton
    return <></>;
  }

  const { data, isLoading } = useQuery([queryKeys.order, pk], () => api.showOrder({ pk }), {
    onSuccess: (res) => {},
    staleTime: 5000,
    enabled: isNotNil(pk),
  });

  if (isLoading || isNil(data)) {
    // TODO :: skeleton
    return <></>;
  }

  return (
    <section className="section" id="product">
      <div className="container">
        <div className="w-50 mx-auto">
          <ul className="d-flex justify-content-between align-items-center flex-wrap">
            <li className="w-50 px-3 mb-2">주문 번호:</li>
            <li className="w-50 text-right px-3 mb-2">{data.orderId}</li>
            <li className="w-50 px-3 mb-2">주문 명:</li>
            <li className="w-50 text-right px-3 mb-2">{data.title}</li>
            <li className="w-50 px-3 mb-2">결제 가격:</li>
            <li className="w-50 text-right px-3 mb-2">${mf2(data.totalPrice)}</li>
            <li className="w-50 px-3 mb-2">결제 상태:</li>
            <li className="w-50 text-right px-3 mb-2">상태</li>
          </ul>
        </div>
        <ul className="w-75 mx-auto mt-3">
          <li className="d-flex justify-content-between align-items-center mb-2">
            <p style={{ width: "20%" }} className="text-center">
              제품
            </p>
            <p style={{ width: "20%" }} className="text-center">
              제품명
            </p>
            <p style={{ width: "20%" }} className="text-center">
              수량
            </p>
            <p style={{ width: "20%" }} className="text-center">
              가격
            </p>
            <p style={{ width: "20%" }} className="text-center">
              상태
            </p>
          </li>
          {data.products.map((item) => (
            <li className="d-flex justify-content-between align-items-center mb-2">
              <figure style={{ height: "100px", width: "20%" }} className="text-center">
                <img style={{ height: "100%" }} src={item.image.url} alt="product" />
              </figure>
              <p style={{ width: "20%" }} className="text-center">
                {item.name}
              </p>
              <p style={{ width: "20%" }} className="text-center">
                {item.count}
              </p>
              <p style={{ width: "20%" }} className="text-center">
                {item.price}
              </p>
              <p style={{ width: "20%" }} className="text-center">
                {item.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OrderShowPage;
