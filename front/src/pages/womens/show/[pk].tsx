import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { isNotNil, validatePk } from "../../../ex/utils";
import ProductShowSkeleton from "../../../view/skeleton/ProductShowSkeleton";
import ProductShowView from "../../../view/product/ProductShowView";
import { Replace } from "../../../layout/App";
import { Urls } from "../../../url/url.g";

const WomenProductShowPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  // pk 가 조회중일때 로딩처리한다.
  if (!router.isReady || isNil(pk)) {
    return <ProductShowSkeleton />;
  }

  const { data: product, isLoading } = useQuery(
    [queryKeys.product, router.query.pk],
    () => api.showProduct({ pk }),
    {
      enabled: isNotNil(pk),
    },
  );

  // 로딩
  if (isLoading) {
    return <ProductShowSkeleton />;
  }

  // 데이터 조회 실패
  if (isNil(product)) {
    return <Replace url={Urls.womens.index.url()} />;
  }

  return <ProductShowView product={product} />;
};

export default WomenProductShowPage;
