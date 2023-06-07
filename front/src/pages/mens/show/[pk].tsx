import Link from "next/link";
import { useState } from "react";
import Stars from "../../../layout/components/Stars";

const MenProductShowPage = () => {
  const [productCount, setProductCount] = useState(1);
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
              <div className="left-images">
                <img src="/images/single-product-01.jpg" alt="" />
                <img src="/images/single-product-02.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right-content">
                <h4>New Green Jacket</h4>
                <span className="price">$75.00</span>
                <Stars starScore={5} />
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod kon tempor
                  incididunt ut labore.
                </span>
                <div className="quote">
                  <i className="fa fa-quote-left" />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuski smod.
                  </p>
                </div>
                <div className="quantity-content">
                  <div className="left-content">
                    <h6>No. of Orders</h6>
                  </div>
                  <div className="right-content">
                    <div className="quantity buttons_added">
                      <input
                        type="button"
                        value="-"
                        className="minus"
                        onClick={() => setProductCount(productCount - 1)}
                      />
                      <input
                        type="number"
                        name="quantity"
                        value={productCount}
                        className="input-text qty text"
                      />
                      <input
                        type="button"
                        value="+"
                        className="plus"
                        onClick={() => setProductCount(productCount + 1)}
                      />
                    </div>
                  </div>
                </div>
                <div className="total">
                  <h4>Total: $210.00</h4>
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

export default MenProductShowPage;
