import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import { useSetRecoilState } from "recoil";
import SearchBarView from "../../../components/table/searchBarView";
import { PaginationTableView } from "../../../components/table/Table";
import {
  SubscribeHistoryListReq,
  SubscribeHistoryListRes,
  SubscribeHistoryListResSubscribeHistory,
} from "../../../api/type.g";
import { d2 } from "../../../ex/dateEx";
import UseValueField from "../../../hooks/useValueField";
import { codecNumber, codecString, ignorePromise } from "../../../ex/utils";
import { Urls } from "../../../url/url.g";
import { api } from "../../../api/url.g";
import useIsReady from "../../../hooks/useIsReady";
import { CreateButtonView } from "../../../components/tailwindEx/EditButtonView";
import { NEWPK } from "../../../lib/contants";
import { isGlobalLoading } from "../../../store/loading";

const SubscribeHistoryListPage = () => {
  const router = useRouter();
  const setIsLoading = useSetRecoilState(isGlobalLoading);
  const [page, setPage] = useState(1);
  const [search, setSearch] = UseValueField("", "검색어");
  const [historyList, setHistoryList] = useState<SubscribeHistoryListRes | null>(null);

  const { mutate, isLoading } = useMutation(
    (req: SubscribeHistoryListReq) => api.subscribeHistoryList(req),
    {
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        setHistoryList({ ...res });
      },
    },
  );

  setIsLoading(isLoading);

  useIsReady(() => {
    const { page, search } = router.query;

    const parsedPage = codecNumber(page) ?? 1;
    const parsedSearch = codecString(search);
    setPage(parsedPage);
    setSearch.set(parsedSearch);

    mutate({ page: parsedPage, search: parsedSearch });
  });

  const onSearch = useCallback(() => {
    ignorePromise(() =>
      router.push(Urls.subscribe.history.index.url({ page: 1, search: search.value })),
    );
  }, [page, search]);

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView
          onSubmit={() => onSearch()}
          value={search.value}
          onChange={(e) => setSearch.set(e.target.value)}
        />
        <PaginationTableView<SubscribeHistoryListResSubscribeHistory>
          title="구독자 리스트"
          pagination={historyList ?? null}
          mapper={(value) => [
            ["제목", value.title],
            ["발송 일자", d2(value.send_time)],
            ["발송 여부", value.is_send ? "완료" : "미발송"],
          ]}
          links={(historyList?.rows ?? []).map((history) =>
            Urls.subscribe.history.edit["[pk]"].url({ pk: history.pk }),
          )}
        />
        <CreateButtonView
          onClick={() => router.push(Urls.subscribe.history.edit["[pk]"].url({ pk: NEWPK }))}
        />
      </div>
    </div>
  );
};

export default SubscribeHistoryListPage;
