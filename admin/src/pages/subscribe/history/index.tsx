import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { isArray, isNil } from "lodash";
import SearchBarView from "../../../components/table/searchBarView";
import { SubscribeHistorySearchType } from "../../../api/enum.g";
import { PaginationTableView } from "../../../components/table/Table";
import {
  SubscribeHistoryListReq,
  SubscribeHistoryListRes,
  SubscribeHistoryListResSubscribeHistory,
} from "../../../api/type.g";
import { d2 } from "../../../ex/dateEx";
import UseValueField from "../../../hooks/useValueField";
import { ignorePromise } from "../../../ex/utils";
import { Urls } from "../../../url/url.g";
import { api } from "../../../api/url.g";
import useIsReady from "../../../hooks/useIsReady";
import { subscribeHistorySearchTypeEnumToLabel } from "../../../api/enum";
import { CreateButtonView } from "../../../components/tailwindEx/EditButtonView";
import { NEWPK } from "../../../lib/contants";

const SubscribeHistoryListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = UseValueField("", "검색어");
  const [searchType, setSearchType] = useState<SubscribeHistorySearchType | null>(null);
  const [historyList, setHistoryList] = useState<SubscribeHistoryListRes | null>(null);

  const { mutate } = useMutation((req: SubscribeHistoryListReq) => api.subscribeHistoryList(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setHistoryList({ ...res });
    },
  });

  useIsReady(() => {
    const { page, search, searchType } = router.query;

    if (isArray(page) || isArray(search) || isArray(searchType)) {
      return;
    }

    const parsedPage = Number(page ?? 1);
    const parsedSearch = search ?? "";
    const parsedSearchType = subscribeHistorySearchTypeEnumToLabel(searchType) ?? null;
    setPage(parsedPage);
    setSearch.set(parsedSearch);
    setSearchType(parsedSearchType);
    mutate({ page: parsedPage, search: parsedSearch, searchType: parsedSearchType });
  });

  const onSearch = useCallback(() => {
    ignorePromise(() =>
      router.push(Urls.subscribe.history.index.url({ page: 1, search: search.value, searchType })),
    );
  }, [page, search]);

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView<SubscribeHistorySearchType>
          onSubmit={() => onSearch()}
          searchType={searchType}
          value={search.value}
          onChange={(e) => setSearch.set(e.target.value)}
          onChangeType={(type) => setSearchType(type)}
          options={[
            [null, "전체"],
            [SubscribeHistorySearchType.ISSEND, "발송여부"],
            [SubscribeHistorySearchType.TITLE, "제목"],
          ]}
        />
        <PaginationTableView<SubscribeHistoryListResSubscribeHistory>
          title="구독자 리스트"
          pagination={historyList ?? null}
          mapper={(value) => [
            ["제목", value.title],
            ["발송 일자", d2(value.send_time)],
            ["발송 여부", value.is_send ? "완료" : "미발송"],
          ]}
        />
        <CreateButtonView
          onClick={() => router.push(Urls.subscribe.history.edit["[pk]"].url({ pk: NEWPK }))}
        />
      </div>
    </div>
  );
};

export default SubscribeHistoryListPage;
