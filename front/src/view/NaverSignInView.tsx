import React, { useCallback } from "react";
import { SNS_URL } from "../lib/contants";

const NaverSignInView = () => {
  const onClick = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.href = SNS_URL.naver;
    }
  }, []);

  return (
    <button type="button" className="sns-button naver-button" onClick={() => onClick()}>
      {/*<img*/}
      {/*  className="naver-img"*/}
      {/*  // src="https://static.nid.naver.com/oauth/small_g_in.PNG"*/}
      {/*  src="/images/naver-logo.png"*/}
      {/*  alt="naver-logo"*/}
      {/*/>*/}
    </button>
  );
};

export default NaverSignInView;
