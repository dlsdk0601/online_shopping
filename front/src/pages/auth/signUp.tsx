import React, { useCallback } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { ignorePromise, isBlank, isNotNil, preventDefaulted } from "../../ex/utils";
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

  const [id, setId] = useValueField("");
  const [password, setPassword] = useValueField("");
  const [name, setName] = useValueField("");
  const [phone, setPhone] = useValueField("");
  const [email, setEmail] = useValueField("");

  const errorInit = useCallback(() => {
    setId.err("");
    setPassword.err("");
    setName.err("");
    setPhone.err("");
    setEmail.err("");
  }, [id, password, name, phone, email]);

  const isValidate = useCallback((): boolean => {
    errorInit();
    if (isBlank(id.value.toLocaleLowerCase())) {
      setId.err("아이디 필수 입력사항입니다.");
      return false;
    }

    if (isBlank(password.value)) {
      setPassword.err("비밀번호는 필수 입력사항입니다.");
      return false;
    }

    if (isNotNil(vPassword(password.value))) {
      setPassword.err(vPassword(password.value));
      return false;
    }

    if (isBlank(name.value)) {
      setName.err("이름은 필수 입력사항입니다.");
      return false;
    }

    if (isNotNil(vPhone(phone.value))) {
      setPhone.err(vPhone(phone.value));
      return false;
    }

    if (isNotNil(vEmail(email.value))) {
      setEmail.err(vEmail(email.value));
      return false;
    }

    return true;
  }, [id, password, name, phone, email]);

  const onSignUp = useCallback(async () => {
    if (!isValidate()) {
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
            <AuthInputFieldView
              field={id}
              label="아이디"
              onChange={(e) => setId.set(e.target.value)}
            />
            <AuthInputFieldView
              field={password}
              label="비밀번호"
              onChange={(e) => setPassword.set(e.target.value)}
              type="password"
            />
            <AuthInputFieldView
              field={name}
              label="이름"
              onChange={(e) => setName.set(e.target.value)}
              type="tel"
            />
            <AuthInputFieldView
              field={phone}
              label="휴대폰"
              onChange={(e) => setPhone.set(e.target.value)}
            />
            <AuthInputFieldView
              field={email}
              label="이메일"
              onChange={(e) => setEmail.set(e.target.value)}
            />
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
