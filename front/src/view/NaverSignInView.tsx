import React, { useCallback } from "react";
import { SNS_URL } from "../lib/contants";

const NaverSignInView = () => {
  const onClick = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.href = SNS_URL.naver;
    }
  }, []);

  return (
    <button type="button" onClick={() => onClick()}>
      <img src="https://static.nid.naver.com/oauth/small_g_in.PNG" alt="카카오 로그인" />
    </button>
  );
};

export default NaverSignInView;
