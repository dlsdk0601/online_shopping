import Link from "next/link";
import { Urls } from "../../url/url.g";
import { Banner } from "../../api/type.g";

const MainBannerView = (props: { banner: Banner }) => {
  return (
    <div className="main-banner" id="top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="left-content">
              <div className="thumb">
                <div className="inner-content">
                  <h4>{props.banner.mainBannerMain.title}</h4>
                  <span>{props.banner.mainBannerMain.subTitle}</span>
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
                        <span>{props.banner.mainBannerMain.description}</span>
                      </div>
                      <div className="hover-content">
                        <div className="inner">
                          <h4>{props.banner.mainBannerWomen.title}</h4>
                          <p>{props.banner.mainBannerWomen.subTitle}</p>
                          <div className="main-border-button">
                            <Link href={Urls.womens.index.url()}>Discover More</Link>
                          </div>
                        </div>
                      </div>
                      <img src={props.banner.mainBannerWomen.image.url} alt="banner-right" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-first-image">
                    <div className="thumb">
                      <div className="inner-content">
                        <h4>Men</h4>
                        <span>{props.banner.mainBannerMen.description}</span>
                      </div>
                      <div className="hover-content">
                        <div className="inner">
                          <h4>{props.banner.mainBannerMen.title}</h4>
                          <p>{props.banner.mainBannerMen.subTitle}</p>
                          <div className="main-border-button">
                            <Link href={Urls.mens.index.url()}>Discover More</Link>
                          </div>
                        </div>
                      </div>
                      <img src={props.banner.mainBannerMen.image.url} alt="banner-right" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-first-image">
                    <div className="thumb">
                      <div className="inner-content">
                        <h4>Kids</h4>
                        <span>{props.banner.mainBannerKid.description}</span>
                      </div>
                      <div className="hover-content">
                        <div className="inner">
                          <h4>{props.banner.mainBannerKid.title}</h4>
                          <p>{props.banner.mainBannerKid.subTitle}</p>
                          <div className="main-border-button">
                            <Link href={Urls.kids.index.url()}>Discover More</Link>
                          </div>
                        </div>
                      </div>
                      <img src={props.banner.mainBannerKid.image.url} alt="banner-right" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-first-image">
                    <div className="thumb">
                      <div className="inner-content">
                        <h4>Accessories</h4>
                        <span>{props.banner.mainBannerAccessory.description}</span>
                      </div>
                      <div className="hover-content">
                        <div className="inner">
                          <h4>{props.banner.mainBannerAccessory.title}</h4>
                          <p>{props.banner.mainBannerAccessory.subTitle}</p>
                          <div className="main-border-button">
                            <Link href={Urls.accessory.index.url()}>Discover More</Link>
                          </div>
                        </div>
                      </div>
                      <img src={props.banner.mainBannerAccessory.image.url} alt="banner-right" />
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
