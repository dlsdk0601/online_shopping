import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import SubscribeView from "../SubscribeView";
import "react-loading-skeleton/dist/skeleton.css";

const IndexSkeletonView = () => {
  return (
    <>
      <div className="main-banner" id="top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <div className="left-content skeleton">
                <Skeleton width="100%" height="100%" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="right-first-image skeleton">
                      <Skeleton width="100%" height="100%" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-first-image skeleton">
                      <Skeleton width="100%" height="100%" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-first-image skeleton">
                      <Skeleton width="100%" height="100%" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-first-image skeleton">
                      <Skeleton width="100%" height="100%" />
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
            <Slider
              className="owl-carousel owl-loaded"
              dots={false}
              infinite
              speed={300}
              slidesToShow={3}
              slidesToScroll={1}
              responsive={[
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
              ]}
            >
              {[1, 2, 3].map((item) => {
                return (
                  <li className="item">
                    <div className="thumb skeleton">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="down-content">
                      <Skeleton width="100%" height="100%" count={2} />
                    </div>
                  </li>
                );
              })}
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
        <div className="slick-container">
          <div className="row">
            <Slider
              className="owl-carousel owl-loaded"
              dots={false}
              infinite
              speed={300}
              slidesToShow={3}
              slidesToScroll={1}
              responsive={[
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
              ]}
            >
              {[1, 2, 3].map((item) => {
                return (
                  <li className="item">
                    <div className="thumb skeleton">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="down-content">
                      <Skeleton width="100%" height="100%" count={2} />
                    </div>
                  </li>
                );
              })}
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
            <Slider
              className="owl-carousel owl-loaded"
              dots={false}
              infinite
              speed={300}
              slidesToShow={3}
              slidesToScroll={1}
              responsive={[
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
              ]}
            >
              {[1, 2, 3].map((item) => {
                return (
                  <li className="item">
                    <div className="thumb skeleton">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="down-content">
                      <Skeleton width="100%" height="100%" count={2} />
                    </div>
                  </li>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
      <SubscribeView />
    </>
  );
};

export default IndexSkeletonView;
