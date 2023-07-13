import Slider from "react-slick";
import { ProductListItem } from "../../api/type.g";
import ProductItemView from "../ProductItemView";

const SliderView = (props: { items: ProductListItem[] }) => {
  return (
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
        {props.items &&
          props.items.map((item) => {
            return <ProductItemView key={`index-product-slider-${item.pk}`} item={item} />;
          })}
      </Slider>
    </div>
  );
};

export default SliderView;
