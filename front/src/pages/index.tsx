import Link from "next/link";
import { Urls } from "../url/url.g";

export default function Home() {
  return (
    <>
      <div className="main-banner" id="top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-content">
                <div className="thumb">
                  <div className="inner-content">
                    <h4>We Are Online-Shop</h4>
                    <span>Awesome, best &amp; perfect Shop</span>
                    <div className="main-border-button">
                      <Link href={Urls.womens.index}>Purchase Now!</Link>
                    </div>
                  </div>
                  <img src="/images/left-banner-image.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Women</h4>
                          <span>Best Clothes For Women</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Women</h4>
                            <p>
                              Discover your style with our stunning collection of women's fashion.
                            </p>
                            <div className="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img src="/images/baner-right-image-01.jpg" alt="banner-right" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Men</h4>
                          <span>Best Clothes For Men</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Men</h4>
                            <p>
                              Elevate your style with our exclusive men's fashion collection,
                              designed for the modern gentleman.
                            </p>
                            <div className="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img src="/images/baner-right-image-02.jpg" alt="banner-right" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Kids</h4>
                          <span>Best Clothes For Kids</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Kids</h4>
                            <p>
                              Discover adorable outfits for your little ones with our charming
                              children's clothing collection.
                            </p>
                            <div className="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img src="/images/baner-right-image-03.jpg" alt="banner-right" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-first-image">
                      <div className="thumb">
                        <div className="inner-content">
                          <h4>Accessories</h4>
                          <span>Best Trend Accessories</span>
                        </div>
                        <div className="hover-content">
                          <div className="inner">
                            <h4>Accessories</h4>
                            <p>
                              Accessorize in style with our exquisite collection of fashion
                              accessories, perfect for adding the finishing touch to any outfit.
                            </p>
                            <div className="main-border-button">
                              <a href="#">Discover More</a>
                            </div>
                          </div>
                        </div>
                        <img src="/images/baner-right-image-04.jpg" alt="banner-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="section" id="men">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-heading">
                <h2>Men's Latest</h2>
                <span>
                  Details to details is what makes Hexashop different from the other themes.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="men-item-carousel">
                <div className="owl-men-item owl-carousel">
                  <div className="item">
                    <div className="thumb">
                      <div className="hover-content">
                        <ul>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-shopping-cart" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <img src="/images/men-01.jpg" alt="" />
                    </div>
                    <div className="down-content">
                      <h4>Classic Spring</h4>
                      <span>$120.00</span>
                      <ul className="stars">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="item">
                    <div className="thumb">
                      <div className="hover-content">
                        <ul>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-shopping-cart" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <img src="/images/men-02.jpg" alt="" />
                    </div>
                    <div className="down-content">
                      <h4>Air Force 1 X</h4>
                      <span>$90.00</span>
                      <ul className="stars">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="item">
                    <div className="thumb">
                      <div className="hover-content">
                        <ul>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-shopping-cart" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <img src="/images/men-03.jpg" alt="" />
                    </div>
                    <div className="down-content">
                      <h4>Love Nana ‘20</h4>
                      <span>$150.00</span>
                      <ul className="stars">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="item">
                    <div className="thumb">
                      <div className="hover-content">
                        <ul>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-eye" />
                            </a>
                          </li>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-star" />
                            </a>
                          </li>
                          <li>
                            <a href="single-product.html">
                              <i className="fa fa-shopping-cart" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <img src="/images/men-01.jpg" alt="" />
                    </div>
                    <div className="down-content">
                      <h4>Classic Spring</h4>
                      <span>$120.00</span>
                      <ul className="stars">
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                        <li>
                          <i className="fa fa-star" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
