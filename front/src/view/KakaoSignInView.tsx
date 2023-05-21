import React, { useCallback } from "react";
import { SNS_URL } from "../lib/contants";

const KakaoSignInView = () => {
  const onClick = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.href = SNS_URL.kakao;
    }
  }, []);

  return (
    <button
      type="button"
      className="my-2 flex h-[40px] w-full items-center justify-center gap-2 overflow-hidden rounded-md shadow-lg"
      onClick={() => onClick()}
    >
      <img src="/img/kakao_login.png" alt="카카오 로그인" className="object-fill" />
    </button>
  );
};

export default KakaoSignInView;
