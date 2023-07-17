import { useRouter } from "next/router";
import { isNil } from "lodash";
import { ProductCategory } from "../../api/enum.g";
import { useProduct } from "../../hooks/useProduct";
import { validatePageQuery } from "../../ex/utils";
import ProductListSkeleton from "../../view/skeleton/ProductListSkeleton";
import { Replace } from "../../layout/App";
import ProductPaginationView from "../../view/product/ProductPaginationView";

const WomensPage = () => {
  const router = useRouter();
  const page = validatePageQuery(router.query.page) ?? 1;

  const { pagination, isLoading } = useProduct(ProductCategory.WOMEN, page);

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (isNil(pagination)) {
    return <Replace url="_error" />;
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
