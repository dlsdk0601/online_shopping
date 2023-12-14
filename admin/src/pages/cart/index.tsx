import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { isArray, isNil } from "lodash";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import useValueField from "../../hooks/useValueField";
import useIsReady from "../../hooks/useIsReady";
import { ignorePromise } from "../../ex/utils";
import { Urls } from "../../url/url.g";
import SearchBarView from "../../components/table/searchBarView";
import { CartListReq, CartListRes } from "../../api/type.g";
import { api } from "../../api/url.g";
import { PaginationTableView } from "../../components/table/Table";
import { isGlobalLoading } from "../../store/loading";

const CartListPage = () => {
  const router = useRouter();
  const setIsLoading = useSetRecoilState(isGlobalLoading);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useValueField("", "검색어");
  const [carts, setCart] = useState<CartListRes | null>(null);

  const { mutate: onSearchApi, isLoading } = useMutation((req: CartListReq) => api.cartList(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setCart({ ...res });
    },
  });

  setIsLoading(isLoading);

  useIsReady(() => {
    const { page, search } = router.query;

    if (isArray(page) || isArray(search)) {
      return;
    }

    const parsedPage = Number(page ?? 1);
    const parsedSearch = search ?? "";
    setPage(parsedPage);
    setSearch.set(parsedSearch);
    onSearchApi({ page: parsedPage, search: parsedSearch });
  });

  const onSearch = useCallback(() => {
    const query = {
      page: 1,
      search: search.value,
    };

    ignorePromise(() => router.push(Urls.cart.index.url(query)));
  }, [page, search]);

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView
          value={search.value}
          onChange={(e) => setSearch.set(e.target.value)}
          onSubmit={() => onSearch()}
        />
        <PaginationTableView
          title="장바구니 리스트"
          pagination={carts}
          mapper={(item) => [
            ["유저 이름", item.name],
            ["유저 휴대폰", item.phone],
            ["상품 갯수", item.count],
          ]}
          links={(carts?.rows ?? []).map((cart) => Urls.cart.edit["[pk]"].url({ pk: cart.pk }))}
        />
      </div>
    </div>
  );
};

export default CartListPage;
