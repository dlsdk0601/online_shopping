import React from "react";
import { useRouter } from "next/router";
import { isArray, isNil } from "lodash";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import useIsReady from "../../hooks/useIsReady";
import { api } from "../../api/url.g";
import { Urls } from "../../url/url.g";
import { UserType } from "../../api/enum.g";
import { tokenModel } from "../../store/user";
import { KakaoCodeVerifyReq, KakaoCodeVerifyRes } from "../../api/type.g";

const KakaoRedirectView = () => {
  const router = useRouter();
  const setToken = useSetRecoilState(tokenModel);

  const { mutate } = useMutation((req: KakaoCodeVerifyReq) => api.kakaoCodeVerify(req), {
    onSuccess: (res: KakaoCodeVerifyRes) => {
      if (!res.isSignUp) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const ignore = router.replace({
          pathname: Urls.auth.snsSignUp,
          query: { email: res.email, type: UserType.KAKAO },
        });
      } else {
        setToken(res.token);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const ignore = router.replace(Urls.index);
      }
    },
  });

  useIsReady(() => {
    const { code } = router.query;

    if (isNil(code)) {
      return;
    }

    if (isArray(code)) {
      return;
    }

    mutate({ code });
  });

  return <div />;
};

export default KakaoRedirectView;
