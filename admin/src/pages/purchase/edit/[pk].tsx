import { useRouter } from "next/router";
import { isNil } from "lodash";
import { useQuery } from "react-query";
import { memo } from "react";
import { ignorePromise, isNotNil, validatePk } from "../../../ex/utils";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { Urls } from "../../../url/url.g";
import { ShowPurchaseRes } from "../../../api/type.g";

const PurchaseEditPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (isNil(pk)) {
    return <PurchaseEditView />;
  }

  const { data: purchase } = useQuery([queryKeys.purchase, pk], () => api.showPurchase({ pk }), {
    enabled: router.isReady && isNotNil(pk),
    onSuccess: (res) => {
      if (isNil(res)) {
        ignorePromise(() => router.replace(Urls.purchase.index.url()));
      }
    },
  });

  return (
    <div className="w-full px-4">
      <PurchaseEditView res={purchase} />
    </div>
  );
};

const PurchaseEditView = memo((props: { res?: ShowPurchaseRes }) => {
  const router = useRouter();
  console.log(props.res);
  return <div>test</div>;
});

export default PurchaseEditPage;
