import { useQuery, useQueryClient } from "react-query";
import { isNil } from "lodash";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { ShowManagerRes } from "../api/type.g";
import { queryKeys } from "../lib/contants";
import { api } from "../api/url.g";
import { tokenModel } from "../store/user";
import { Urls } from "../url/url.g";
import { ignorePromise } from "../ex/utils";

export interface UseUser {
  user: ShowManagerRes | null | undefined;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setToken = useSetRecoilState(tokenModel);

  const { data: user } = useQuery(queryKeys.manager, () => api.auth({}), {
    onSuccess: (res: ShowManagerRes | null) => {
      if (isNil(res)) {
        clearUser(router.asPath);
      }
    },
  });

  const clearUser = (returnTo?: string) => {
    queryClient.setQueryData(queryKeys.manager, null); // cache 삭제
    setToken(null); // 전역 변수 토큰 삭제
    const returnQuery = returnTo ? { returnTo } : {};

    // 어드민에서는 로그인 페이지로 보낸다.
    ignorePromise(() => router.replace(Urls.auth["sign-in"].url(returnQuery)));
  };

  return { user, clearUser };
}
