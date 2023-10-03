import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import { isBlank, queryFilter } from "../../ex/utils";
import { api } from "../../api/url.g";
import { FailPurchaseReq } from "../../api/type.g";

const FailView = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const { mutate: onApiPurchaseFail } = useMutation(
    (req: FailPurchaseReq) => api.failPurchase(req),
    {
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        // front 에서 바로 처리 해도 되지만, 일반 API 통신과 같은 로직을 사용하기 위해 API 로 받아서 처리
        setMessage(res.message);
      },
    },
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const code = queryFilter(router.query.code);
    const queryMessage = queryFilter(router.query.message);
    const orderId = queryFilter(router.query.orderId);

    // API 통신 에서 메세지 받을지 여기서 처리할지 결정
    if (isBlank(message) || isBlank(queryMessage) || isBlank(orderId)) {
      return;
    }

    onApiPurchaseFail({ code, orderCode: orderId, message: queryMessage });
  }, [router.isReady]);

  return <div>{message}</div>;
};

export default FailView;
