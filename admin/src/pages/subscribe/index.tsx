import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { isArray, isNil } from "lodash";
import UseValueField from "../../hooks/useValueField";
import { ignorePromise } from "../../ex/utils";
import {
  DeleteSubscribeReq,
  SubscribeListReq,
  SubscribeListRes,
  SubscribeListResSubscribe,
} from "../../api/type.g";
import { api } from "../../api/url.g";
import useIsReady from "../../hooks/useIsReady";
import { SubscribeSearchType } from "../../api/enum.g";
import { subscribeSearchTypeEnumToLabel } from "../../api/enum";
import SearchBarView from "../../components/table/searchBarView";
import { PaginationTableView } from "../../components/table/Table";
import { d2 } from "../../ex/dateEx";
import { Urls } from "../../url/url.g";
import SelectView from "../../view/SelectView";

const SubscribeListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = UseValueField("", "검색어");
  const [searchType, setSearchType] = useState<SubscribeSearchType | null>(null);
  const [subscribeList, setSubscribeList] = useState<SubscribeListRes | null>(null);

  const { mutate: onEditApi } = useMutation((req: SubscribeListReq) => api.subscribeList(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setSubscribeList({ ...res });
    },
  });

  const { mutate: onDeleteApi } = useMutation(
    (req: DeleteSubscribeReq) => api.deleteSubscribe(req),
    {
      onSuccess: () => {
        router.reload();
      },
    },
  );

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
    onEditApi({ page: parsedPage, search: parsedSearch, searchType: parsedSearchType });
  });

  const onSearch = useCallback(() => {
    const query = {
      page: 1,
      search: search.value,
      searchType,
    };

    ignorePromise(() => router.push(Urls.subscribe.index.url(query)));
  }, [page, search, searchType]);

  const onDelete = useCallback(async (pk: number) => {
    if (!confirm("삭제 하시겠습니까?")) {
      return;
    }

    onDeleteApi({ pk });
  }, []);

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView
          onSubmit={() => onSearch()}
          value={search.value}
          onChange={(e) => setSearch.set(e.target.value)}
        >
          <SelectView<SubscribeSearchType>
            searchType={searchType}
            onChangeType={(type) => setSearchType(type)}
            options={[
              [null, "전체"],
              [SubscribeSearchType.NAME, "이름"],
              [SubscribeSearchType.EMAIL, "이메일"],
            ]}
          />
        </SearchBarView>
        <PaginationTableView<SubscribeListResSubscribe>
          title="구독자 리스트"
          pagination={subscribeList ?? null}
          mapper={(value) => [
            ["이름", value.name],
            ["이메일", value.email],
            ["신청 일자", d2(value.create_at)],
            [
              "삭제",
              <button
                type="button"
                className="rounded-lg border border-red-700 px-2.5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white"
                onClick={() => onDelete(value.pk)}
              >
                삭제
              </button>,
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default SubscribeListPage;
