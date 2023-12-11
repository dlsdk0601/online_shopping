import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import useValueField from "../../hooks/useValueField";
import { PurchaseSearchType } from "../../api/enum.g";
import { api } from "../../api/url.g";
import { PurchaseListReq, PurchaseListRes, PurchaseListResPurchase } from "../../api/type.g";
import useIsReady from "../../hooks/useIsReady";
import { labelToPurchaseSearchType } from "../../api/enum";
import { codecNumber, codecString, ignorePromise } from "../../ex/utils";
import { Urls } from "../../url/url.g";
import SearchBarView from "../../components/table/searchBarView";
import SelectView from "../../view/SelectView";
import { PaginationTableView } from "../../components/table/Table";
import { d2 } from "../../ex/dateEx";

const PurchaseListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useValueField("", "검색어");
  const [searchType, setSearchType] = useState<PurchaseSearchType | null>(null);
  const [purchaseList, setPurchaseList] = useState<PurchaseListRes | null>(null);

  const { mutate: onSearchApi } = useMutation((req: PurchaseListReq) => api.purchaseList(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setPurchaseList({ ...res });
    },
  });

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

    ignorePromise(() => router.push(Urls.order.index.url(query)));
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
        <PaginationTableView<PurchaseListResPurchase>
          title="상품 구매 리스트"
          pagination={purchaseList ?? null}
          mapper={(value) => [
            ["주문 번호", value.orderCode],
            ["주문자", value.name],
            ["주문자 연락처", value.phone],
            ["결제 금액", value.totalPrice],
            ["결제 수단", value.method],
            ["생성 일자", d2(value.createAt)],
          ]}
          links={(purchaseList?.rows ?? []).map((purchase) =>
            Urls.order.purchase.edit["[pk]"].url({ pk: purchase.pk }),
          )}
        />
      </div>
    </div>
  );
};

export default PurchaseListPage;
