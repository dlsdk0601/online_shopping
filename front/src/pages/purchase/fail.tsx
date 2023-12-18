import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import { codecString } from "../../ex/utils";
import { api } from "../../api/url.g";
import { FailPurchaseReq } from "../../api/type.g";

const FailPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const { mutate: onApiPurchaseFail } = useMutation(
    (req: FailPurchaseReq) => api.failPurchase(req),
    {
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        // front 에서 바로 처리 해도 되지만, 일반 API 통신과 같은 로직을 사용하기 위해 API 로 받아서 처리
        setMessage(res.message);
        setErrorCode(res.code);
      },
    },
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const code = codecString(router.query.code);
    const queryMessage = codecString(router.query.message);
    const orderId = codecString(router.query.orderId);

    onApiPurchaseFail({ code, orderCode: orderId, message: queryMessage });
  }, [router.isReady]);

  return (
    <div>
      {message} code: [{errorCode}]
    </div>
  );
};

export default FailPage;
