import React, { useCallback } from "react";
import { SNS_URL } from "../lib/contants";

const KakaoSignInView = () => {
  const onClick = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.href = SNS_URL.kakao;
    }
  }, []);

  return (
    <button type="button" onClick={() => onClick()}>
      <img src="/images/kakao_login.png" alt="카카오 로그인" />
    </button>
  );
};

export default KakaoSignInView;
