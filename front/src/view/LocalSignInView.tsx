import React, { useCallback } from "react";
import { useMutation } from "react-query";
import { isBlank, preventDefaulted } from "../ex/utils";
import { NaverCodeVerifyRes, SignInReq } from "../api/type.g";
import { api } from "../api/url.g";
import AuthInputFieldView from "./AuthInputFieldView";
import useValueField from "../hooks/useValueField";

const LocalSignInView = (props: { onSuccess: (token: string) => void }) => {
  const [id, setId] = useValueField("");
  const [password, setPassword] = useValueField("");

  const { mutate } = useMutation((req: SignInReq) => api.signIn(req), {
    onSuccess: (res: NaverCodeVerifyRes) => {
      props.onSuccess(res.token);
    },
    onError: () => {},
  });

  const errorInit = useCallback(() => {
    setId.err("");
    setPassword.err("");
  }, [id, password]);

  const isValidate = useCallback((): boolean => {
    errorInit();
    if (isBlank(id.value.toLocaleLowerCase())) {
      setId.err("아이디는 필수 입력사항입니다.");
      return false;
    }

    if (isBlank(password.value)) {
      setPassword.err("비밀번호는 필수 입력사항입니다.");
      return false;
    }

    // TODO :: 토이 프로젝트할때 풀 것
    // if (isNotNil(vPassword(password))) {
    //   setError(vPassword(password));
    //   return false;
    // }

    return true;
  }, [id, password, name]);

  const onLocalSignIn = useCallback(async () => {
    if (!isValidate()) {
      return;
    }

    mutate({ id: id.value.toLocaleLowerCase(), password: password.value });
  }, [id, password]);

  return (
    <form className="form-container" onSubmit={preventDefaulted(() => onLocalSignIn())}>
      <AuthInputFieldView field={id} label="ID" onChange={(e) => setId.set(e.target.value)} />
      <AuthInputFieldView
        field={password}
        label="PASSWORD"
        onChange={(e) => setPassword.set(e.target.value)}
        type="password"
      />
      <button type="submit" className="sign-button">
        Sign In
      </button>
    </form>
  );
};

export default LocalSignInView;
