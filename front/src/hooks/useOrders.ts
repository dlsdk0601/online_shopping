import { useQuery, useQueryClient } from "react-query";
import { isNil } from "lodash";
import { queryKeys } from "../lib/contants";
import { api } from "../api/url.g";
import { isNotNil } from "../ex/utils";
import { OrderListRes } from "../api/type.g";

export function useOrders(page: number): {
  pagination: OrderListRes | undefined;
  isLoading: boolean;
} {
  const queryClient = useQueryClient();

  const { data: pagination, isLoading } = useQuery(
    [queryKeys.purchase, page],
    () => api.orderList({ page }),
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
            api.orderList({ page: res.nextPage }),
          );
        }
      },
    },
  );

  return { pagination, isLoading };
}
