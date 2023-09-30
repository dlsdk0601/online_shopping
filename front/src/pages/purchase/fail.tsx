import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isBlank, queryFilter } from "../../ex/utils";

const Fail = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const code = queryFilter(router.query.code);
    const queryMessage = queryFilter(router.query.message);
    const orderId = queryFilter(router.query.orderId);

    if (isBlank(message)) {
      // TODO :: 문구 수정
      setMessage("알 수 없는 에러 발생.");
    }

    setMessage(queryMessage);
  }, [router.isReady]);

  return <div>{message}</div>;
};

export default Fail;
