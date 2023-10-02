import React from "react";
import Link from "next/link";
import { Urls } from "../../../url/url.g";

const Success = () => {
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
          <p className="success-text">PAYMENT SUCCESS</p>
          <div className="success-button-box">
            <Link className="success-button" href={Urls.index.url()}>
              HOME
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Success;
