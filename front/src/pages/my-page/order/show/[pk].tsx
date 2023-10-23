import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import { isNotNil, validatePk } from "../../../../ex/utils";
import { api } from "../../../../api/url.g";

const OrderShowPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (isNil(pk)) {
    return <div>pk 실패</div>;
  }

  const { data, isLoading } = useQuery(["order", pk], () => api.showOrder({ pk }), {
    onSuccess: (res) => {},
    staleTime: 5000,
    enabled: isNotNil(pk),
  });

  if (isLoading || isNil(data)) {
    // TODO :: skeleton
    return <></>;
  }

  return <div>test</div>;
};

export default OrderShowPage;
