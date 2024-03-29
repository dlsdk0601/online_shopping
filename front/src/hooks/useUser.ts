import { useQuery, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { isNil } from "lodash";
import { AuthUserRes } from "../api/type.g";
import { CONSTANT, queryKeys } from "../lib/contants";
import { api } from "../api/url.g";
import { isNotNil } from "../ex/utils";
import { tokenModel } from "../store/user";

export interface UseUser {
  user: AuthUserRes | null | undefined;
  clearUser: () => void;
  isLoading: boolean;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  const setToken = useSetRecoilState(tokenModel);

  const { data: user, isLoading } = useQuery(queryKeys.user, () => api.auth({}), {
    enabled: isNotNil(sessionStorage.getItem(CONSTANT.sessionTokenKey)),
    onSuccess: (res: AuthUserRes | null) => {
      if (isNil(res)) {
        clearUser();
      }
    },
  });

  const clearUser = () => {
    setToken(null);
    queryClient.setQueryData(queryKeys.user, null);
  };

  return { user, clearUser, isLoading };
}
