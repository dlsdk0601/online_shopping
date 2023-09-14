import { useRouter } from "next/router";
import { isNil } from "lodash";
import { useQuery } from "react-query";
import { ignorePromise, validatePk } from "../../ex/utils";
import { api } from "../../api/url.g";
import { Replace } from "../../layout/App";
import { Urls } from "../../url/url.g";
import PurchaseShowView from "../../view/myPage/PurchaseShowView";
import { queryKeys } from "../../lib/contants";
import PurchaseSkeleton from "../../view/skeleton/PurchaseSkeleton";

const PurchasePage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (!router.isReady || isNil(pk)) {
    return <PurchaseSkeleton />;
  }

  const { data: purchase, isLoading } = useQuery(
    [queryKeys.product, pk],
    () => api.showPurchase({ pk }),
    {
      onSuccess: (res) => {
        if (isNil(res)) {
          ignorePromise(() => router.replace(Urls.index.url()));
        }
      },
    },
  );

  if (isLoading) {
    return <PurchaseSkeleton />;
  }

  if (isNil(purchase)) {
    return <Replace url={Urls.index.url()} />;
  }

  return <PurchaseShowView purchase={purchase} />;
};

export default PurchasePage;
