import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import GoogleSignInView from "../../view/GoogleSignInView";
import LocalSignInView from "../../view/LocalSignInView";
import { tokenModel } from "../../store/user";
import { Urls } from "../../url/url.g";
import { UserType } from "../../api/enum.g";
import { GoogleTokenVerifyRes } from "../../api/type.g";
import KakaoSignInView from "../../view/KakaoSignInView";
import NaverSignInView from "../../view/NaverSignInView";

const SignIn = () => {
  const router = useRouter();
  const setToken = useSetRecoilState(tokenModel);

  const onSuccess = useCallback((token: string) => {
    setToken(token);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ignore = router.replace(Urls.index);
  }, []);

  const onPushSnsSingUp = useCallback((res: GoogleTokenVerifyRes) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ignore = router.replace({
      pathname: Urls.auth.snsSignUp,
      query: { email: res.email, type: UserType.GOOGLE },
    });
  }, []);

  return (
    <div className="mx-auto mt-14 w-[400px] rounded border p-4">
      <LocalSignInView onSuccess={onSuccess} />
      <GoogleSignInView onSuccess={onSuccess} onPushSnsSignUp={onPushSnsSingUp} />
      <KakaoSignInView />
      <NaverSignInView />
    </div>
  );
};

export default SignIn;
