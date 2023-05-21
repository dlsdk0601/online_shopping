import React, { useCallback, useRef } from "react";
import { useMutation } from "react-query";
import useScript from "../hooks/useScript";
import { SNS_URL } from "../lib/contants";
import { baseConfig } from "../lib/config";
import { api } from "../api/url.g";
import { isNotNil } from "../ex/utils";
import { GoogleTokenVerifyReq, GoogleTokenVerifyRes } from "../api/type.g";

const GoogleSignInView = (props: {
  onSuccess: (token: string) => void;
  onPushSnsSignUp: (res: GoogleTokenVerifyRes) => void;
}) => {
  const googleBtn = useRef<HTMLDivElement | null>(null);

  const { mutate } = useMutation((req: GoogleTokenVerifyReq) => api.googleTokenVerify(req), {
    onSuccess: (res: GoogleTokenVerifyRes) => {
      if (res.isSignUp && isNotNil(res.token)) {
        props.onSuccess(res.token);
        return;
      }

      props.onPushSnsSignUp(res);
    },
  });

  const onGoogleSignIn = useCallback(
    async (response: {
      clientId: string;
      client_id: string;
      credential: string;
      select_by: string;
    }) => {
      mutate({ token: response.credential });
    },
    [],
  );

  useScript(SNS_URL.google_client, () => {
    // google 객체에 데이터 설정
    // @ts-ignore
    window.google.accounts.id.initialize({
      client_id: baseConfig.google_client_id,
      callback: onGoogleSignIn,
    });

    // google 로그인 버튼 커스텀
    // @ts-ignore
    window.google.accounts.id.renderButton(googleBtn.current, {
      theme: "outline",
      size: "large",
      width: "366",
    });
  });

  return (
    <div className="relative mt-2">
      <div ref={googleBtn} />
    </div>
  );
};

export default GoogleSignInView;
