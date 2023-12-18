import { memo, useCallback } from "react";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import { useRecoilValue } from "recoil";
import { AddCartReq, ShowProductRes } from "../../api/type.g";
import useValueField from "../../hooks/useValueField";
import { mf1 } from "../../ex/numberEx";
import { api } from "../../api/url.g";
import { tokenModel } from "../../store/user";

const ProductShowView = (props: { product: ShowProductRes }) => {
  const token = useRecoilValue(tokenModel);
  const [productCount, setProductCount] = useValueField(1, "제품 갯수");

  const { mutate: onAddCartApi } = useMutation((req: AddCartReq) => api.addCart(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      alert("장바구니에 추가 되었습니다.");
    },
  });

  const onAddCart = useCallback(() => {
    if (isNil(token)) {
      return alert("장바구니에 추가 하시려면\n 로그인을 해주세요.");
    }

    onAddCartApi({ pk: props.product.pk });
  }, [props.product]);

  const onClickCount = useCallback(
    (type: "PLUS" | "MINUS") => {
      if (type === "PLUS") {
        if (props.product.stockCount > productCount.value) {
          setProductCount.set(productCount.value + 1);
          return;
        }

        return alert("상품 재고를 초과했습니다.");
      }

      if (1 >= productCount.value) {
        return;
      }

      setProductCount.set(productCount.value - 1);
    },
    [productCount.value, props.product.price],
  );

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
                {props.product.subImages.map((image) => {
                  return <img src={image.url} alt={`product-single-${image.uuid}`} />;
                })}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right-content">
                <h4>{props.product.name}</h4>
                <span className="price">₩{mf1(props.product.price)}</span>
                <span>{props.product.description}</span>
                <div className="quote">
                  <i className="fa fa-quote-left" />
                  <p>{props.product.descriptionTitle}</p>
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
                        onClick={() => onClickCount("MINUS")}
                      />
                      <input
                        type="number"
                        name="quantity"
                        value={productCount.value}
                        className="input-text qty text"
                      />
                      <input
                        type="button"
                        value="+"
                        className="plus"
                        onClick={() => onClickCount("PLUS")}
                      />
                    </div>
                  </div>
                </div>
                <div className="total">
                  <h4>Total: ₩{mf1(props.product.price * productCount.value)}</h4>
                  <div className="main-border-button">
                    <button type="button" onClick={() => onAddCart()}>
                      Add To Cart
                    </button>
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

export default memo(ProductShowView);
