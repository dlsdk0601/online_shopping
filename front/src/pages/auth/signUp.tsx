import React, { useCallback } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { ignorePromise, preventDefaulted } from "../../ex/utils";
import { vEmail, vPassword, vPhone } from "../../ex/validate";
import AuthInputFieldView from "../../view/AuthInputFieldView";
import { api } from "../../api/url.g";
import { SignUpReq, SignUpRes } from "../../api/type.g";
import { tokenModel } from "../../store/user";
import { Urls } from "../../url/url.g";
import useValueField from "../../hooks/useValueField";

const SignUp = () => {
  const router = useRouter();
  const setToken = useSetRecoilState(tokenModel);

  const { mutate } = useMutation((req: SignUpReq) => api.signUp(req), {
    onSuccess: (res: SignUpRes) => {
      setToken(res.token);
      ignorePromise(() => router.replace(Urls.index));
    },
    onError: () => {}, // 설정 하지 않으면 에러 페이지로 보낸다.
  });

  const [id, setId] = useValueField("", "아이디");
  const [password, setPassword] = useValueField("", "비밀번호", vPassword);
  const [name, setName] = useValueField("", "이름");
  const [phone, setPhone] = useValueField("", "휴대폰", vPhone);
  const [email, setEmail] = useValueField("", "이메일", vEmail);

  const onSignUp = useCallback(async () => {
    if (
      setId.validate() ||
      setPassword.validate() ||
      setName.validate() ||
      setPhone.validate() ||
      setPassword.validate() ||
      setEmail.validate()
    ) {
      return;
    }

    mutate({
      id: id.value.toLocaleLowerCase(),
      password: password.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
    });
  }, [id, password, name, phone, email]);

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
          <form className="form-container" onSubmit={preventDefaulted(() => onSignUp())}>
            <AuthInputFieldView field={id} onChange={(e) => setId.set(e.target.value)} />
            <AuthInputFieldView
              field={password}
              onChange={(e) => setPassword.set(e.target.value)}
              type="password"
            />
            <AuthInputFieldView
              field={name}
              onChange={(e) => setName.set(e.target.value)}
              type="tel"
            />
            <AuthInputFieldView field={phone} onChange={(e) => setPhone.set(e.target.value)} />
            <AuthInputFieldView field={email} onChange={(e) => setEmail.set(e.target.value)} />
            <button type="submit" className="sign-button">
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
