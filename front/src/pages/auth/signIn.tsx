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
    <>
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Sign In</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container sign-container">
          <LocalSignInView onSuccess={onSuccess} />
          <div className="sns-button-wrapper">
            <GoogleSignInView onSuccess={onSuccess} onPushSnsSignUp={onPushSnsSingUp} />
            <KakaoSignInView />
            <NaverSignInView />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
