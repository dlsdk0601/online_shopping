import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const ProductShowSkeleton = () => {
  return (
    <>
      <div className="page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Single Product Page</h2>
                <span>Awesome &amp; Creative HTML CSS layout by TemplateMo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" id="product">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="left-images skeleton">
                <Skeleton width="100%" height="100%" style={{ marginBottom: "20px" }} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right-content">
                <h4>
                  <Skeleton width="100%" height="100%" />
                </h4>
                <span className="price">
                  <Skeleton width="100%" height="100%" />
                </span>
                <span>
                  <Skeleton width="100%" height="100%" count={3} />
                </span>
                <div className="quote">
                  <i className="fa fa-quote-left" />
                  <p>
                    <Skeleton width="100%" height="100%" />
                  </p>
                </div>
                <div className="quantity-content">
                  <div className="left-content">
                    <h6>No. of Orders</h6>
                  </div>
                  <div className="right-content">
                    <div className="quantity buttons_added">
                      <input type="button" value="-" className="minus" />
                      <input
                        type="number"
                        name="quantity"
                        value={1}
                        className="input-text qty text"
                      />
                      <input type="button" value="+" className="plus" />
                    </div>
                  </div>
                </div>
                <div className="total">
                  <h4>
                    <Skeleton width="100%" height="100%" />
                  </h4>
                  <div className="main-border-button">
                    <Link href="/">Add To Cart</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductShowSkeleton;
