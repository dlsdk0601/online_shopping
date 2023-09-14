import React from "react";
import Skeleton from "react-loading-skeleton";

const PurchaseSkeleton = () => {
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
            <div className="col-lg-6 border-right">
              <div className="left-images skeleton">
                <div className="border rounded py-2 px-3 d-flex justify-content-start align-items-center mb-2">
                  <div style={{ height: "100px", width: "100%" }}>
                    <Skeleton width="100%" height="100%" />
                  </div>
                </div>
                <div className="border rounded py-2 px-3 d-flex justify-content-start align-items-center mb-2">
                  <div style={{ height: "100px", width: "100%" }}>
                    <Skeleton width="100%" height="100%" enableAnimation />
                  </div>
                </div>
                <div className="border rounded py-2 px-3 d-flex justify-content-start align-items-center mb-2">
                  <div style={{ height: "100px", width: "100%" }}>
                    <Skeleton width="100%" height="100%" enableAnimation />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right-first-image skeleton">
                <div className="total" style={{ height: "100px", width: "100%" }}>
                  <Skeleton width="100%" height="100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PurchaseSkeleton;
