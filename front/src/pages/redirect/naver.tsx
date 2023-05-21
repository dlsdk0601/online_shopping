import React from "react";
import { useRouter } from "next/router";
import { isArray, isNil } from "lodash";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import useIsReady from "../../hooks/useIsReady";
import { tokenModel } from "../../store/user";
import { api } from "../../api/url.g";
import { Urls } from "../../url/url.g";
import { NaverCodeVerifyReq, NaverCodeVerifyRes } from "../../api/type.g";

const NaverRedirectView = () => {
  const router = useRouter();
  const setToken = useSetRecoilState(tokenModel);

  const { mutate } = useMutation((req: NaverCodeVerifyReq) => api.naverCodeVerify(req), {
    onSuccess: (res: NaverCodeVerifyRes) => {
      setToken(res.token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ignore = router.replace(Urls.index);
    },
  });

  useIsReady(() => {
    const { state, code } = router.query;

    if (isNil(state) || isNil(code)) {
      return;
    }

    if (isArray(state) || isArray(code)) {
      return;
    }

    mutate({ state, code });
  });

  return <div />;
};

export default NaverRedirectView;
