import { UrlObject } from "url";
import React, { PropsWithChildren, useEffect } from "react";
import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { isNil, some } from "lodash";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";
import { ignorePromise } from "../ex/utils";
import { DefaultLayoutView, LayoutView } from "./Layout";
import { Urls } from "../url/url.g";
import { userToken } from "../store/user";
import { CONSTANT } from "../lib/contants";

export const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: () => Router.replace("/_error"),
        staleTime: 600000, // 10min
        cacheTime: 900000, // 15min, 데이터 유효 시간이 캐싱 저장 시간보다 길다는건 말이 안됨. 데이터 유효 시간을 기준으로 데이터를 다시 불러올텐데, 유효 시간이 더 길면 데이터가 없는 상태가 됨
        refetchOnMount: false, // 데이터가 stale 상태일 경우 마운트 될때마다 refetch를 실행하는 옵션,
        refetchOnWindowFocus: false, // 데이터가 stale 상태일 경우, 윈도우 포커싱될때마다 refetch하는 옵션
        refetchOnReconnect: false, // 데이터가 stale 상태일 경우, 재 연결이 될때 refetch하는 옵션
        // TODO :: 사실 위와 같은 option은 좋지 않다. 유저가 제대로 된 데이터를 접하지 못할 수도 있기 떄문에
      },
      mutations: {
        onError: () => Router.replace("/_error"),
      },
    },
  });
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <LayoutSelector>
          <Component {...pageProps} />
        </LayoutSelector>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const LayoutSelector = (props: PropsWithChildren) => {
  const router = useRouter();
  const accessToken = sessionStorage.getItem(CONSTANT.sessionTokenKey);
  const setToken = useSetRecoilState(userToken);

  useEffect(() => {
    if (isNil(accessToken)) {
      return;
    }

    setToken(accessToken);
  }, []);

  // 예외 URL
  const isSpecialUrl = some(["/_"], (prefix) => router.pathname.startsWith(prefix));

  if (isSpecialUrl) {
    return <>{props.children}</>;
  }

  // 로그인
  if (router.pathname.startsWith(Urls.auth["sign-in"].pathname)) {
    return <DefaultLayoutView>{props.children}</DefaultLayoutView>;
  }

  return <UserApp>{props.children}</UserApp>;
};

const UserApp = (props: PropsWithChildren<Record<never, any>>) => {
  const router = useRouter();
  const accessToken = sessionStorage.getItem(CONSTANT.sessionTokenKey);

  if (!router.isReady) {
    return <DefaultLayoutView />;
  }

  // 로그인 전
  if (isNil(accessToken)) {
    return <Replace url={Urls.auth["sign-in"].url({ returnTo: router.asPath })} />;
  }

  return <LayoutView>{props.children}</LayoutView>;
};

export const Replace = (props: { url: UrlObject | string }) => {
  const router = useRouter();
  useEffect(() => {
    ignorePromise(() => router.replace(props.url));
  }, [props.url]);

  return <></>;
};
