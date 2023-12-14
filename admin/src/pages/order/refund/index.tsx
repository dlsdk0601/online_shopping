import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import { useSetRecoilState } from "recoil";
import useValueField from "../../../hooks/useValueField";
import { PurchaseSearchType } from "../../../api/enum.g";
import { RefundListReq, RefundListRes, RefundListResRefund } from "../../../api/type.g";
import { api } from "../../../api/url.g";
import useIsReady from "../../../hooks/useIsReady";
import { labelToPurchaseSearchType } from "../../../api/enum";
import { codecNumber, codecString, ignorePromise } from "../../../ex/utils";
import { Urls } from "../../../url/url.g";
import SearchBarView from "../../../components/table/searchBarView";
import SelectView from "../../../view/SelectView";
import { PaginationTableView } from "../../../components/table/Table";
import { d2 } from "../../../ex/dateEx";
import { isGlobalLoading } from "../../../store/loading";

const RefundListPage = () => {
  const router = useRouter();
  const setIsLoading = useSetRecoilState(isGlobalLoading);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useValueField("", "검색어");
  const [searchType, setSearchType] = useState<PurchaseSearchType | null>(null);
  const [refundList, setRefundList] = useState<RefundListRes | null>(null);

  const { mutate: onSearchApi, isLoading } = useMutation(
    (req: RefundListReq) => api.refundList(req),
    {
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        setRefundList({ ...res });
      },
    },
  );

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

    ignorePromise(() => router.push(Urls.order.refund.index.url(query)));
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
        <PaginationTableView<RefundListResRefund>
          title="상품 구매 리스트"
          pagination={refundList ?? null}
          mapper={(value) => [
            ["주문 번호", value.orderCode],
            ["주문자", value.name],
            ["주문자 연락처", value.phone],
            ["환불 금액", value.cancelPrice],
            ["결제 수단", value.method],
            ["생성 일자", d2(value.createAt)],
            ["환불 일자", d2(value.canceledAt)],
          ]}
          links={(refundList?.rows ?? []).map((cancel) =>
            Urls.order.refund.edit["[pk]"].url({ pk: cancel.pk }),
          )}
        />
      </div>
    </div>
  );
};

export default RefundListPage;
