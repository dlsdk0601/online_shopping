import Link from "next/link";
import Slider from "react-slick";
import { Urls } from "../url/url.g";

const settings = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
};

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
        <div className="slick-container">
          <div className="row">
            <Slider {...settings} className="owl-carousel owl-loaded">
              <li className="item">
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
                </div>
              </li>
              <li className="item">
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
                </div>
              </li>
              <li className="item">
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
                </div>
              </li>
              <li className="item">
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
                </div>
              </li>
            </Slider>
          </div>
        </div>
      </section>
      <section className="section" id="women">
        <div className="slick-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-heading">
                <h2>Women's Latest</h2>
                <span>
                  Details to details is what makes Hexashop different from the other themes.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <Slider {...settings} className="owl-carousel owl-loaded">
              <div className="item">
                <div className="thumb">
                  <div className="hover-content">
                    <ul>
                      <li>
                        <Link href="/">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-star"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <img src="/images/women-01.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>New Green Jacket</h4>
                  <span>$75.00</span>
                  <ul className="stars">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="item">
                <div className="thumb">
                  <div className="hover-content">
                    <ul>
                      <li>
                        <Link href="/">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-star"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <img src="/images/women-02.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>Classic Dress</h4>
                  <span>$45.00</span>
                  <ul className="stars">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="item">
                <div className="thumb">
                  <div className="hover-content">
                    <ul>
                      <li>
                        <Link href="/">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-star"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <img src="/images/women-03.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>Spring Collection</h4>
                  <span>$130.00</span>
                  <ul className="stars">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="item">
                <div className="thumb">
                  <div className="hover-content">
                    <ul>
                      <li>
                        <Link href="/">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-star"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <img src="/images/women-01.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>Classic Spring</h4>
                  <span>$120.00</span>
                  <ul className="stars">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
      <section className="section" id="kids">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-heading">
                <h2>Kid's Latest</h2>
                <span>
                  Details to details is what makes Hexashop different from the other themes.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="slick-container">
          <div className="row">
            <Slider {...settings} className="owl-carousel owl-loaded">
              <div className="item">
                <div className="thumb">
                  <div className="hover-content">
                    <ul>
                      <li>
                        <Link href="/">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-star"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <img src="/images/kid-01.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>School Collection</h4>
                  <span>$80.00</span>
                  <ul className="stars">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="item">
                <div className="thumb">
                  <div className="hover-content">
                    <ul>
                      <li>
                        <Link href="/">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-star"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <img src="/images/kid-02.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>Summer Cap</h4>
                  <span>$12.00</span>
                  <ul className="stars">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="item">
                <div className="thumb">
                  <div className="hover-content">
                    <ul>
                      <li>
                        <Link href="/">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-star"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <img src="/images/kid-03.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>Classic Kid</h4>
                  <span>$30.00</span>
                  <ul className="stars">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="item">
                <div className="thumb">
                  <div className="hover-content">
                    <ul>
                      <li>
                        <Link href="/">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-star"></i>
                        </Link>
                      </li>
                      <li>
                        <Link href="/">
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <img src="/images/kid-01.jpg" alt="" />
                </div>
                <div className="down-content">
                  <h4>Classic Spring</h4>
                  <span>$120.00</span>
                  <ul className="stars">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
      <div className="subscribe">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-heading">
                <h2>By Subscribing To Our Newsletter You Can Get 30% Off</h2>
                <span>
                  Details to details is what makes Hexashop different from the other themes.
                </span>
              </div>
              <form id="subscribe" action="" method="get">
                <div className="row">
                  <div className="col-lg-5">
                    <fieldset>
                      <input name="name" type="text" id="name" placeholder="Your Name" required />
                    </fieldset>
                  </div>
                  <div className="col-lg-5">
                    <fieldset>
                      <input
                        name="email"
                        type="text"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        placeholder="Your Email Address"
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-2">
                    <fieldset>
                      <button type="submit" id="form-submit" className="main-dark-button">
                        <i className="fa fa-paper-plane"></i>
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-6">
                  <ul>
                    <li>
                      Store Location:
                      <br />
                      <span>Sunny Isles Beach, FL 33160, United States</span>
                    </li>
                    <li>
                      Phone:
                      <br />
                      <span>010-6567-5303</span>
                    </li>
                    <li>
                      Office Location:
                      <br />
                      <span>Silim</span>
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul>
                    <li>
                      Work Hours:
                      <br />
                      <span>07:30 AM - 9:30 PM Daily</span>
                    </li>
                    <li>
                      Email:
                      <br />
                      <span>inajung7008@gmail.com</span>
                    </li>
                    <li>
                      Social Media:
                      <br />
                      <span>
                        <Link href="#">Facebook</Link>, <a href="#">Instagram</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
