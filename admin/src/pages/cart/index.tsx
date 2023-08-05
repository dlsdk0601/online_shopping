import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { isArray } from "lodash";
import useValueField from "../../hooks/useValueField";
import useIsReady from "../../hooks/useIsReady";
import { ignorePromise } from "../../ex/utils";
import { Urls } from "../../url/url.g";
import SearchBarView from "../../components/table/searchBarView";

const CartListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useValueField("", "검색어");
  const [carts, setSCart] = useState(null);

  useIsReady(() => {
    const { page, search } = router.query;

    if (isArray(page) || isArray(search)) {
      return;
    }

    const parsedPage = Number(page ?? 1);
    const parsedSearch = search ?? "";
    setPage(parsedPage);
    setSearch.set(parsedSearch);
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
      </div>
    </div>
  );
};

export default CartListPage;
