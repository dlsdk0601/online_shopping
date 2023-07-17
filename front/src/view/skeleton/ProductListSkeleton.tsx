import Skeleton from "react-loading-skeleton";

const ProductListSkeleton = () => {
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
        <div className="container">
          <div className="row">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
              return (
                <div key={`product-list-${item}`} className="col-lg-4">
                  <li className="item">
                    <div className="thumb skeleton">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="down-content">
                      <Skeleton width="100%" height="100%" count={2} />
                    </div>
                  </li>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListSkeleton;
