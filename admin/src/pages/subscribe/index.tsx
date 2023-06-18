import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { isArray, isNil } from "lodash";
import UseValueField from "../../hooks/useValueField";
import { ignorePromise } from "../../ex/utils";
import { SubscribeListReq, SubscribeListRes, SubscribeListResSubscribe } from "../../api/type.g";
import { api } from "../../api/url.g";
import useIsReady from "../../hooks/useIsReady";
import { SubscribeSearchType } from "../../api/enum.g";
import { subscribeSearchTypeEnumToLabel } from "../../api/enum";
import SearchBarView from "../../components/table/searchBarView";
import { PaginationTableView } from "../../components/table/Table";
import { d2 } from "../../ex/dateEx";

const SubscribeListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = UseValueField("", "검색어");
  const [searchType, setSearchType] = useState<SubscribeSearchType | null>(null);
  const [subscribeList, setSubscribeList] = useState<SubscribeListRes | null>(null);

  const { mutate } = useMutation((req: SubscribeListReq) => api.subscribeList(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setSubscribeList({ ...res });
    },
  });

  useIsReady(() => {
    const { page, search, searchType } = router.query;

    if (isArray(page) || isArray(search) || isArray(searchType)) {
      return;
    }

    const parsedPage = Number(page ?? 1);
    const parsedSearch = search ?? "";
    const parsedSearchType = subscribeSearchTypeEnumToLabel(searchType) ?? null;
    setPage(parsedPage);
    setSearch.set(parsedSearch);
    setSearchType(parsedSearchType);
    mutate({ page: parsedPage, search: parsedSearch, searchType: parsedSearchType });
  });

  const onSearch = useCallback(() => {
    const query = {
      page: 1,
      search: search.value,
      searchType,
    };

    ignorePromise(() => router.push({ pathname: router.pathname, query }));
  }, [page, search]);

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView<SubscribeSearchType>
          onSubmit={() => onSearch()}
          searchType={searchType}
          value={search.value}
          onChange={(e) => setSearch.set(e.target.value)}
          onChangeType={(type) => setSearchType(type)}
          options={[
            [null, "전체"],
            [SubscribeSearchType.NAME, "이름"],
            [SubscribeSearchType.EMAIL, "이메일"],
          ]}
        />
        <PaginationTableView<SubscribeListResSubscribe>
          title="구독자 리스트"
          pagination={subscribeList ?? null}
          mapper={(value) => [
            ["이름", value.name],
            ["이메일", value.email],
            ["신청 일자", d2(value.create_at)],
          ]}
        />
      </div>
    </div>
  );
};

export default SubscribeListPage;
