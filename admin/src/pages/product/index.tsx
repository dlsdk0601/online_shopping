import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { isArray, isNil } from "lodash";
import UseValueField from "../../hooks/useValueField";
import { ProductCategory } from "../../api/enum.g";
import { ProductListReq, ProductListRes, ProductListResProduct } from "../../api/type.g";
import { api } from "../../api/url.g";
import useIsReady from "../../hooks/useIsReady";
import { categoryEnumToLabel, labelToCategoryEnum } from "../../api/enum";
import { ignorePromise } from "../../ex/utils";
import { Urls } from "../../url/url.g";
import SearchBarView from "../../components/table/searchBarView";
import { PaginationTableView } from "../../components/table/Table";
import { d2 } from "../../ex/dateEx";
import { mf1 } from "../../ex/numberEx";
import { CreateButtonView } from "../../components/tailwindEx/EditButtonView";
import { NEWPK } from "../../lib/contants";
import SelectView from "../../view/SelectView";

const ProductListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = UseValueField("", "검색어");
  const [category, setCategory] = useState<ProductCategory | null>(null);
  const [products, setProducts] = useState<ProductListRes | null>(null);

  const { mutate: onSearchApi } = useMutation((req: ProductListReq) => api.productList(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setProducts({ ...res });
    },
  });

  useIsReady(() => {
    const { page, search, category } = router.query;

    if (isArray(page) || isArray(search) || isArray(category)) {
      return;
    }

    const parsedPage = Number(page ?? 1);
    const parsedSearch = search ?? "";
    const parsedCategory = labelToCategoryEnum(category) ?? null;
    setPage(parsedPage);
    setSearch.set(parsedSearch);
    setCategory(parsedCategory);
    onSearchApi({ page: parsedPage, search: parsedSearch, category: parsedCategory });
  });

  const onSearch = useCallback(() => {
    const query = {
      page: 1,
      search: search.value,
      category,
    };

    ignorePromise(() => router.push(Urls.product.index.url(query)));
  }, [page, search, category]);

  return (
    <div className="mt-4">
      <div className="mb-12 w-full rounded px-4">
        <SearchBarView
          onSubmit={() => onSearch()}
          value={search.value}
          onChange={(e) => setSearch.set(e.target.value)}
        >
          <SelectView<ProductCategory>
            searchType={category}
            onChangeType={(type) => setCategory(type)}
            options={[
              [null, "전체"],
              [ProductCategory.MEN, "남자"],
              [ProductCategory.WOMEN, "여자"],
              [ProductCategory.KIDS, "키즈"],
              [ProductCategory.ACCESSORY, "악세서리"],
            ]}
          />
        </SearchBarView>
        <PaginationTableView<ProductListResProduct>
          title="상품 리스트"
          pagination={products ?? null}
          mapper={(value) => [
            ["상품명", value.name],
            ["가격", `${mf1(value.price)} $`],
            ["카테고리", categoryEnumToLabel(value.category)],
            ["생성 일자", d2(value.create_at)],
          ]}
          links={(products?.rows ?? []).map((product) =>
            Urls.product.edit["[pk]"].url({ pk: product.pk }),
          )}
        />
        <CreateButtonView
          onClick={() => router.push(Urls.product.edit["[pk]"].url({ pk: NEWPK }))}
        />
      </div>
    </div>
  );
};

export default ProductListPage;
