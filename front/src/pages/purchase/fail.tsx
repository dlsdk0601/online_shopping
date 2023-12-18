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
  const [orderCode, setOrderCode] = useState("");
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
        setErrorCode(res.errorCode);
        setOrderCode(res.orderCode);
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
      <p>주문 번호: {orderCode}</p>
      <p>
        {message} code: [{errorCode}]
      </p>
      <p>주문 번호와 code 를 캡쳐하시고 문의주시면 더 빠르게 답변드릴 수 있습니다.</p>
    </div>
  );
};

export default FailPage;
