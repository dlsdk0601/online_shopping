import Link from "next/link";
import { Urls } from "../../url/url.g";

const MainBannerView = () => {
  return (
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
                    <Link href={Urls.womens.index.url()}>Purchase Now!</Link>
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
                            Elevate your style with our exclusive men's fashion collection, designed
                            for the modern gentleman.
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
  );
};

export default MainBannerView;
