import { useQuery, useQueryClient } from "react-query";
import { isNil } from "lodash";
import { useSetRecoilState } from "recoil";
import Router from "next/router";
import { ShowManagerRes } from "../api/type.g";
import { queryKeys } from "../lib/contants";
import { api } from "../api/url.g";
import { userModel } from "../store/user";
import { Urls } from "../url/url.g";
import { ignorePromise } from "../ex/utils";
import { useApiCountHandle } from "../ex/block";

export interface UseUser {
  user: ShowManagerRes | null | undefined;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  const setUser = useSetRecoilState(userModel);

  const { data: user, isLoading } = useQuery(queryKeys.user, () => api.auth({}), {
    onSuccess: (received: ShowManagerRes | null) => {
      if (isNil(received)) {
        setUser(null);
      } else {
        setUser(received);
      }
    },
  });

  const clearUser = () => {
    queryClient.setQueryData(queryKeys.user, null);
    ignorePromise(() => Router.replace(Urls.auth["sign-in"].url()));
  };

  if (isLoading) {
    useApiCountHandle(true);
  } else {
    useApiCountHandle(false);
  }

  return { user, clearUser };
}
