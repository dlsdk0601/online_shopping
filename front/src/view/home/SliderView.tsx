import Slider from "react-slick";
import { ProductListItem } from "../../api/type.g";
import { mf2 } from "../../ex/numberEx";

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
            return (
              <li className="item">
                <div className="thumb">
                  <div className="hover-content">
                    <ul>
                      <li>
                        <button type="button">
                          <i className="fa fa-star" />
                        </button>
                      </li>
                      <li>
                        <button type="button">
                          <i className="fa fa-shopping-cart" />
                        </button>
                      </li>
                    </ul>
                  </div>
                  <img src={item.image.url} alt={`${item.category}-img-${item.pk}`} />
                </div>
                <div className="down-content">
                  <h4>{item.name}</h4>
                  <span>${mf2(item.price)}</span>
                </div>
              </li>
            );
          })}
      </Slider>
    </div>
  );
};

export default SliderView;
