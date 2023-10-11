import { useQuery, useQueryClient } from "react-query";
import { isNil } from "lodash";
import { PurchaseListRes } from "../api/type.g";
import { queryKeys } from "../lib/contants";
import { api } from "../api/url.g";
import { isNotNil } from "../ex/utils";

export function usePurchase(page: number): {
  pagination: PurchaseListRes | undefined;
  isLoading: boolean;
} {
  const queryClient = useQueryClient();

  const { data: pagination, isLoading } = useQuery(
    [queryKeys.purchase, page],
    () => api.purchaseList({ page }),
    {
      enabled: isNotNil(page),
      staleTime: 5000, // 5분을 기준으로 최신화
      keepPreviousData: true,
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        if (res.hasNext) {
          const ignore = queryClient.prefetchQuery([queryKeys.purchase, res.nextPage], () =>
            api.purchaseList({ page: res.nextPage }),
          );
        }
      },
    },
  );

  return { pagination, isLoading };
}
