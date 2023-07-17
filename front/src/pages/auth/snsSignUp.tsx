import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { isArray, isNil } from "lodash";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { ignorePromise, preventDefaulted } from "../../ex/utils";
import { api } from "../../api/url.g";
import { UserType } from "../../api/enum.g";
import { tokenModel } from "../../store/user";
import { Urls } from "../../url/url.g";
import useIsReady from "../../hooks/useIsReady";
import { vEmail, vPhone } from "../../ex/validate";
import { SnsSignUpReq, SnsSignUpRes } from "../../api/type.g";
import AuthInputFieldView from "../../view/AuthInputFieldView";
import useValueField from "../../hooks/useValueField";
import { userTypeLabelToEnum } from "../../api/enum";

const SnsSignInPage = () => {
  const router = useRouter();
  const setToken = useSetRecoilState(tokenModel);
  const [email, setEmail] = useValueField("", "이메일", vEmail);
  const [name, setName] = useValueField("", "이름");
  const [phone, setPhone] = useValueField("", "휴대폰", vPhone);
  const [type, setType] = useValueField<UserType | null>(null, "가입유형");

  const { mutate } = useMutation((req: SnsSignUpReq) => api.snsSignUp(req), {
    onSuccess: (res: SnsSignUpRes) => {
      setToken(res.token);
      ignorePromise(() => router.replace(Urls.index));
    },
  });

  useIsReady(() => {
    const { type, email: queryEmail } = router.query;

    if (isNil(queryEmail) || isNil(type)) {
      // 값이 없다면 페이지 탈출 시킨다.
      return router.replace(Urls.auth.signIn);
    }

    if (isArray(queryEmail) || isArray(type)) {
      return;
    }

    setEmail.set(queryEmail);
    setType.set(userTypeLabelToEnum(type));
  });

  const onSnsSignUp = useCallback(async () => {
    // useEffect 에서 처리 했지만, ts 추적 때문에 유효성을 걸어둔다.
    if (isNil(type.value)) {
      return router.replace(Urls.auth.signIn);
    }

    if (setEmail.validate() || setName.validate() || setPhone.validate()) {
      return;
    }

    mutate({
      email: email.value,
      name: name.value,
      phone: phone.value,
      type: type.value,
    });
  }, [email, name, phone]);

  return (
    <>
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Sign Up</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container sign-container">
          <form className="form-container" onSubmit={preventDefaulted(() => onSnsSignUp())}>
            <AuthInputFieldView field={email} onChange={(e) => setEmail.set(e.target.value)} />
            <AuthInputFieldView
              field={name}
              onChange={(e) => setName.set(e.target.value)}
              type="tel"
            />
            <AuthInputFieldView field={phone} onChange={(e) => setPhone.set(e.target.value)} />
            <button type="submit" className="sign-button">
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SnsSignInPage;
