import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import { isGlobalLoading } from "../../../store/loading";
import useValueField from "../../../hooks/useValueField";
import { PurchaseSearchType } from "../../../api/enum.g";
import { codecNumber, codecString, ignorePromise } from "../../../ex/utils";
import { Urls } from "../../../url/url.g";
import SearchBarView from "../../../components/table/searchBarView";
import SelectView from "../../../view/SelectView";
import { PaginationTableView } from "../../../components/table/Table";
import { FailListReq, FailListRes, FailListResFail } from "../../../api/type.g";
import { d2 } from "../../../ex/dateEx";
import { api } from "../../../api/url.g";
import useIsReady from "../../../hooks/useIsReady";
import { labelToPurchaseSearchType } from "../../../api/enum";

const FailListPage = () => {
  const router = useRouter();
  const setIsLoading = useSetRecoilState(isGlobalLoading);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useValueField("", "검색어");
  const [searchType, setSearchType] = useState<PurchaseSearchType | null>(null);
  const [failList, setFailList] = useState<FailListRes | null>(null);

  const { mutate: onSearchApi, isLoading } = useMutation((req: FailListReq) => api.failList(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setFailList({ ...res });
    },
  });

  setIsLoading(isLoading);

  useIsReady(() => {
    const { page, search, searchType } = router.query;

    const parsedPage = codecNumber(page) ?? 1;
    const parsedSearch = codecString(search);
    const parsedSearchType = labelToPurchaseSearchType(codecString(searchType)) ?? null;

    setPage(parsedPage);
    setSearch.set(parsedSearch);
    setSearchType(parsedSearchType);
    onSearchApi({ page: parsedPage, search: parsedSearch, searchType: parsedSearchType });
  });

  const onSearch = useCallback(() => {
    const query = {
      page: 1,
      search: search.value,
      searchType,
    };

    ignorePromise(() => router.push(Urls.order.fail.index.url(query)));
  }, [page, search, searchType]);

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView
          onSubmit={() => onSearch()}
          value={search.value}
          onChange={(e) => setSearch.set(e.target.value)}
        >
          <SelectView<PurchaseSearchType | null>
            searchType={searchType}
            onChangeType={(type) => setSearchType(type)}
            options={[
              [null, "전체"],
              [PurchaseSearchType.NAME, "이름"],
              [PurchaseSearchType.PHONE, "휴대폰"],
              [PurchaseSearchType.ORDER_CODE, "주문번호"],
            ]}
          />
        </SearchBarView>
        <PaginationTableView<FailListResFail>
          title="상품 구매 리스트"
          pagination={failList ?? null}
          mapper={(value) => [
            ["주문 번호", value.orderCode],
            ["주문자", value.name],
            ["주문자 연락처", value.phone],
            ["에러 코드", value.errorCode],
            ["생성 일자", d2(value.createAt)],
          ]}
        />
        {/* SHOW 페이지는 불필요해서 따로 생성하지 않는다. */}
      </div>
    </div>
  );
};

export default FailListPage;
