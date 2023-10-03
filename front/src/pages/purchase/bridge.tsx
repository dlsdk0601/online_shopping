import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import { ignorePromise, isBlank, isNotNil, queryFilter } from "../../ex/utils";
import { Urls } from "../../url/url.g";
import { api } from "../../api/url.g";
import { TossPaymentApproveReq } from "../../api/type.g";
import { TossPaymentType } from "../../api/enum.g";
import { BlockView } from "../../layout/Layout";

const BridgeView = () => {
  const router = useRouter();
  const { mutate: onApiPayment } = useMutation(
    (req: TossPaymentApproveReq) => api.tossPaymentApprove(req),
    {
      onSuccess: (res) => {
        if (isNil(res)) {
          ignorePromise(() => router.replace(Urls.purchase.fail.url()));
          return;
        }

        if (isNotNil(res.error)) {
          const query = {
            code: res.error.code,
            message: res.error.message,
          };
          ignorePromise(() => router.replace(Urls.purchase.fail.url(query)));
          return;
        }

        ignorePromise(() => router.replace(Urls.purchase.success["[pk]"].url({ pk: res.pk })));
      },
    },
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const paymentType = queryFilter(router.query.paymentType);
    const orderId = queryFilter(router.query.orderId);
    const paymentKey = queryFilter(router.query.paymentKey);
    const amount = queryFilter(router.query.amount);

    if (isBlank(paymentKey) || isBlank(orderId) || isBlank(paymentKey) || isBlank(amount)) {
      ignorePromise(() => router.replace(Urls.purchase.fail.url()));
      return;
    }

    onApiPayment({
      paymentKey,
      amount: Number(amount),
      paymentType: paymentType as TossPaymentType,
      orderCode: orderId,
    });
  }, [router.isReady, router.query]);

  return (
    <div>
      <BlockView />
    </div>
  );
};

export default BridgeView;
