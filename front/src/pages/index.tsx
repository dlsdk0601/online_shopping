import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import SubscribeView from "../view/SubscribeView";
import MainBannerView from "../view/home/MainBannerView";
import SliderView from "../view/home/SliderView";
import { api } from "../api/url.g";
import { queryKeys } from "../lib/contants";
import IndexSkeleton from "../view/skeleton/IndexSkeleton";

export default function Home() {
  const router = useRouter();

  const { data: home } = useQuery([queryKeys.home], () => api.home({}), {
    enabled: router.isReady,
  });

  if (isNil(home)) {
    return <IndexSkeleton />;
  }

  return (
    <>
      <MainBannerView banner={home.banner} />
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
          <SliderView items={home.mensLatestItems} />
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
          <SliderView items={home.womensLatestItems} />
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
          <SliderView items={home.kidsLatestItems} />
        </div>
      </section>
      <SubscribeView />
    </>
  );
}
