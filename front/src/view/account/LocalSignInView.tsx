import React, { useCallback } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { preventDefaulted } from "../../ex/utils";
import { SignInReq, SignInRes } from "../../api/type.g";
import { api } from "../../api/url.g";
import AuthInputFieldView from "../AuthInputFieldView";
import useValueField from "../../hooks/useValueField";
import { Urls } from "../../url/url.g";
import { vPassword } from "../../ex/validate";

const LocalSignInView = (props: { onSuccess: (token: string) => void }) => {
  const router = useRouter();
  const [id, setId] = useValueField("", "아이디");
  const [password, setPassword] = useValueField("", "비밀번호", vPassword);

  const { mutate } = useMutation((req: SignInReq) => api.signIn(req), {
    onSuccess: (res: SignInRes) => {
      props.onSuccess(res.token);
    },
  });

  const onLocalSignIn = useCallback(async () => {
    if (setId.validate() || setPassword.validate()) {
      return;
    }

    mutate({ id: id.value.toLocaleLowerCase(), password: password.value });
  }, [id, password]);

  return (
    <form className="form-container" onSubmit={preventDefaulted(() => onLocalSignIn())}>
      <div onClick={() => mutate({ id: "test", password: "1234" })}>test</div>
      <AuthInputFieldView field={id} onChange={(e) => setId.set(e.target.value)} />
      <AuthInputFieldView
        field={password}
        onChange={(e) => setPassword.set(e.target.value)}
        type="password"
      />
      <button type="submit" className="sign-button">
        Sign In
      </button>
      <button
        type="button"
        className="sign-button mt-3"
        onClick={() => router.replace(Urls.auth.signUp)}
      >
        Sign Up
      </button>
    </form>
  );
};

export default LocalSignInView;
