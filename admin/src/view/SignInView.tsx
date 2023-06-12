import React, { useCallback, useEffect } from "react";
import { isNil } from "lodash";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useMutation } from "react-query";
import classNames from "classnames";
import { ignorePromise, isBlank, preventDefaulted, returnTo } from "../ex/utils";
import { api } from "../api/url.g";
import { Urls } from "../url/url.g";
import { tokenModel } from "../store/user";
import useValueField from "../hooks/useValueField";
import { SignInReq } from "../api/type.g";

const SignInView = () => {
  const router = useRouter();
  const [token, setToken] = useRecoilState(tokenModel);

  const [id, setId] = useValueField("", "아이디");
  const [password, setPassword] = useValueField("", "비밀번호");

  const { mutate } = useMutation((req: SignInReq) => api.signIn(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setToken(res.token);
      ignorePromise(() => router.replace(returnTo(router.query) ?? Urls.index.url()));
    },
  });

  useEffect(() => {
    if (isNil(token)) {
      return;
    }

    ignorePromise(() => router.replace(returnTo(router.query) ?? Urls.index.url()));
  }, [token]);

  const onSignIn = useCallback(async () => {
    if (setId.validate() || setPassword.validate()) {
      return;
    }

    mutate({ id: id.value, password: password.value });
  }, [id, password]);

  return (
    <form onSubmit={preventDefaulted(() => onSignIn())}>
      <div className="relative mb-3 w-full">
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">Id</label>
        <input
          type="text"
          className={classNames(
            "w-full rounded  bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring",
            {
              "border-red-500": !isBlank(id.error),
              "border-0": isBlank(id.error),
            },
          )}
          placeholder={id.name}
          value={id.value}
          onChange={(e) => setId.set(e.target.value)}
        />
        {!isBlank(id.error) && <div className="mt-1 text-xs text-red-500">{id.error}</div>}
      </div>

      <div className="relative mb-3 w-full">
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">Password</label>
        <input
          type="password"
          className={classNames(
            "w-full rounded  bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring",
            {
              "border-red-500": !isBlank(id.error),
              "border-0": isBlank(id.error),
            },
          )}
          placeholder={password.name}
          value={password.value}
          onChange={(e) => setPassword.set(e.target.value)}
        />
        {!isBlank(password.error) && (
          <div className="mt-1 text-xs text-red-500">{password.error}</div>
        )}
      </div>
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="mr-1 mb-1 w-full rounded bg-blueGray-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignInView;
