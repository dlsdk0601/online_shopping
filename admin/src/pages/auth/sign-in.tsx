import React, { useCallback, useEffect, useState } from "react";
import { isNil } from "lodash";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import SignFooterView from "../../components/layoutView/SignFooterView";
import { api } from "../../api/url.g";
import { userToken } from "../../store/user";
import { Urls } from "../../url/url.g";
import { ignorePromise, preventDefaulted, returnTo } from "../../ex/utils";
import { CONSTANT } from "../../lib/contants";

const SignInPage = () => {
  const router = useRouter();
  const [token, setToken] = useRecoilState(userToken);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isNil(token)) {
      return;
    }

    ignorePromise(() => router.replace(returnTo(router.query) ?? Urls.index.url()));
  }, [token]);

  const onSignIn = useCallback(async () => {
    const res = await api.signIn({ id, password });

    if (isNil(res)) {
      return;
    }

    setToken(res.token);
    sessionStorage.setItem(CONSTANT.sessionTokenKey, res.token);
    ignorePromise(() => router.replace(Urls.index.url()));
  }, [id, password]);

  return (
    <main>
      <section className="relative h-full min-h-screen w-full py-40">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full content-center items-center justify-center">
            <div className="w-full px-4 lg:w-4/12">
              <div className="mb-6 flex w-full flex-col break-words rounded-lg border bg-blueGray-200 shadow-lg">
                <div className="mb-0 rounded-t px-6 py-6">
                  <div className="mb-3 text-center">
                    <h6 className="text-sm font-bold text-blueGray-500">Sign in with</h6>
                  </div>
                  <hr className="border-b-1 mt-6 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <form onSubmit={preventDefaulted(() => onSignIn())}>
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
                        Id
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                      />
                    </div>

                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <SignFooterView absolute />
      </section>
    </main>
  );
};

export default SignInPage;
