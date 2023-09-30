import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { isBlank, queryFilter } from "../../ex/utils";

const Fail = () => {
  const router = useRouter();
  const isApi = useRef(false); // API 통신 후 막기
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (isApi) {
      return;
    }

    const code = queryFilter(router.query.code);
    const queryMessage = queryFilter(router.query.message);
    const orderId = queryFilter(router.query.orderId);

    // API 통신 에서 메세지 받을지 여기서 처리할지 결정
    if (isBlank(message)) {
      // TODO :: 문구 수정
      setMessage("알 수 없는 에러 발생.");
      return;
    }

    setMessage(queryMessage);
  }, [router.isReady]);

  return <div>{message}</div>;
};

export default Fail;
