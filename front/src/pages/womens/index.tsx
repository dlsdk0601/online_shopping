import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { isArray, isNil } from "lodash";
import { api } from "../../api/url.g";
import { ProductCategory } from "../../api/enum.g";
import useIsReady from "../../hooks/useIsReady";
import { Urls } from "../../url/url.g";
import ProductPaginationView from "../../view/product/ProductPaginationView";

const WomensPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { data: pagination } = useQuery(
    [ProductCategory.WOMEN, page],
    () => api.productList({ page, category: ProductCategory.WOMEN }),
    {
      enabled: router.isReady,
      staleTime: 60 * 1000, // 1시간을 기준으로 최신화
      keepPreviousData: true, // 이전 데이터 유지
    },
  );

  useIsReady(() => {
    if (isNil(pagination)) {
      return;
    }

    const { page: currentPage } = router.query;

    if (isNil(currentPage)) {
      return router.replace(Urls.womens.index.url({ page: 1 }));
    }

    if (isArray(currentPage)) {
      return router.replace(Urls.womens.index.url({ page: 1 }));
    }

    if (!isNaN(Number(currentPage))) {
      setPage(Number(currentPage));
    }

    if (pagination.hasNext) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ignore = queryClient.prefetchQuery([ProductCategory.WOMEN, pagination.nextPage], () =>
        api.productList({ page: pagination.nextPage, category: ProductCategory.WOMEN }),
      );
    }
  }, [queryClient]);

  if (isNil(pagination)) {
    return <></>;
  }

  return (
    <>
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Check Our Products</h2>
                <span>Awesome &amp; Creative HTML CSS layout by TemplateMo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section" id="products">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Our Latest Products</h2>
                <span>Check out all of our products.</span>
              </div>
            </div>
          </div>
        </div>
        <ProductPaginationView pagination={pagination} />
      </section>
    </>
  );
};

export default WomensPage;
