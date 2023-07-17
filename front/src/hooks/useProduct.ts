import { useQuery, useQueryClient } from "react-query";
import { ProductListRes } from "../api/type.g";
import { ProductCategory } from "../api/enum.g";
import { api } from "../api/url.g";
import { isNotNil } from "../ex/utils";

export function useProduct(
  category: ProductCategory,
  page: number,
): { pagination: ProductListRes | null | undefined; isLoading: boolean } {
  const queryClient = useQueryClient();

  const { data: pagination, isLoading } = useQuery(
    [category, page],
    () =>
      api.productList({
        page,
        category,
      }),
    {
      enabled: isNotNil(page),
      staleTime: 60 * 1000, // 1시간을 기준으로 최신화
      keepPreviousData: true, // 이전 데이터 유지,
      onSuccess: (res) => {
        if (res.hasNext) {
          const ignore = queryClient.prefetchQuery([category, res.nextPage], () =>
            api.productList({ page: res.nextPage, category }),
          );
        }
      },
    },
  );

  return { pagination, isLoading };
}
