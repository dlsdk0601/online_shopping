import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import { isNotNil, validatePk } from "../../../../ex/utils";
import { api } from "../../../../api/url.g";
import { queryKeys } from "../../../../lib/contants";

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
        <div className="row">
          <div className="col-lg-8">
            <p>{data.pk}</p>
            <p>{data.orderId}</p>
            <p>{data.title}</p>
            <p>{data.totalPrice}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderShowPage;
