import { UrlObject } from "url";
import React, { PropsWithChildren, useEffect } from "react";
import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { some } from "lodash";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import { ignorePromise } from "../ex/utils";
import { DefaultLayoutView, LayoutView } from "./Layout";
import { tokenModel } from "../store/user";
import { CONSTANT } from "../lib/contants";
import { useUser } from "../hooks/useUser";
import { baseConfig } from "../lib/config";
import { Urls } from "../url/url.g";

export const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: () => Router.replace("/_error"),
        staleTime: 600000, // 10min
        cacheTime: 900000, // 15min, 데이터 유효 시간이 캐싱 저장 시간보다 길다는건 말이 안됨. 데이터 유효 시간을 기준으로 데이터를 다시 불러올텐데, 유효 시간이 더 길면 데이터가 없는 상태가 됨
        // refetchOnMount: false, // 데이터가 stale 상태일 경우 마운트 될때마다 refetch를 실행하는 옵션,
        // refetchOnWindowFocus: false, // 데이터가 stale 상태일 경우, 윈도우 포커싱될때마다 refetch하는 옵션
        // refetchOnReconnect: false, // 데이터가 stale 상태일 경우, 재 연결이 될때 refetch하는 옵션
      },
      mutations: {
        onError: () => Router.replace("/_error"),
      },
    },
  });
  return (
    <>
      <Head>
        <script
          src={`https://kit.fontawesome.com/${baseConfig.font_awesome}.js`}
          crossOrigin="anonymous"
        />
        <title>online</title>
      </Head>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <LayoutSelector>
            <Component {...pageProps} />
          </LayoutSelector>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
};

const LayoutSelector = (props: PropsWithChildren) => {
  const router = useRouter();

  // 예외 URL
  const isSpecialUrl = some(["/_", Urls.purchase.bridge.pathname], (prefix) =>
    router.pathname.startsWith(prefix),
  );

  if (isSpecialUrl) {
    return <>{props.children}</>;
  }

  // 로그인
  if (router.pathname.startsWith("sign-in")) {
    return <DefaultLayoutView>{props.children}</DefaultLayoutView>;
  }

  // 비로그인 유저 접근 권환 영역 (마이페이지 같은 페이지)
  // if (isNil(accessToken)){
  //   return;
  // }

  return <UserApp>{props.children}</UserApp>;
};

const UserApp = (props: PropsWithChildren<Record<never, any>>) => {
  const accessToken = sessionStorage.getItem(CONSTANT.sessionTokenKey) ?? null;
  const setToken = useSetRecoilState(tokenModel);
  const { user } = useUser();

  useEffect(() => {
    setToken(accessToken);
  }, []);

  // 로그인 전
  // if (accessToken === null && router.isReady) {
  //   return (
  //     <Replace
  //       url={{
  //         pathname: "sign-in",
  //         query: {
  //           returnTo: router.asPath,
  //         },
  //       }}
  //     />
  //   );
  // }

  return <LayoutView>{props.children}</LayoutView>;
};

export const Replace = (props: { url: UrlObject | string }) => {
  const router = useRouter();
  useEffect(() => {
    ignorePromise(() => router.replace(props.url));
  }, [props.url]);

  return <></>;
};
