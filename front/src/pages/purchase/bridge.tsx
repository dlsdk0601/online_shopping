import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { queryFilter } from "../../ex/utils";

const Bridge = () => {
  // http://localhost:3000/purchase/success
  // ?paymentType=NORMAL
  // &orderId=GXWMACW1695648114395
  // &paymentKey=xMljweGQBN5OWRapdA8dQn21WDoX93o1zEqZKLPbmD70vk4y
  // &amount=928

  const router = useRouter();
  const [paymentType, setPaymentType] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [paymentKey, setPaymentKey] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (router.isReady) {
      return;
    }

    const { paymentType, orderId, paymentKey, amount } = router.query;
    setPaymentType(queryFilter(paymentType));
    setOrderCode(queryFilter(orderId));
    setPaymentKey(queryFilter(paymentKey));
    setAmount(queryFilter(amount));
  }, [router]);

  return <div />;
};

export default Bridge;
