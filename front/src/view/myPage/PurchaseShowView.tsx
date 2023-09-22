import { useMutation } from "react-query";
import { isNil } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { AddTossPayPurchaseReq, ShowPurchaseRes } from "../../api/type.g";
import { mf2 } from "../../ex/numberEx";
import { api } from "../../api/url.g";
import { ignorePromise } from "../../ex/utils";
import { PaymentType } from "../../api/enum.g";
import PaymentSelectView from "./PaymentSelectView";
import errorMessageG from "../../api/errorMessage.g";

const PurchaseShowView = (props: { purchase: ShowPurchaseRes }) => {
  const router = useRouter();
  const [type, setType] = useState<PaymentType | null>(null);

  const { mutate: onTossPayApi } = useMutation(
    (req: AddTossPayPurchaseReq) => api.addTossPayPurchase(req),
    {
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        // TODO :: 서버에서 try ~ catch 문에서 exception 을 return 하면
        // errhandle 에 잡히지 않는다.
        if (isNil(res.checkoutPage)) {
          alert(errorMessageG.INTERNAL_FAILED);
          return router.back();
        }

        ignorePromise(() => router.replace(res.checkoutPage));
      },
    },
  );

  const onClickBuy = useCallback(() => {
    const title = `${props.purchase.list[0]?.name ?? ""} 외 ${props.purchase.list.length - 1}`;
    if (type === PaymentType.TOSS) {
      onTossPayApi({
        pk: props.purchase.pk,
        productDesc: title,
        amount: props.purchase.totalPrice,
      });
    }
  }, [type, props]);

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
            <div className="col-lg-6 border-right">
              <div className="left-images">
                {props.purchase.list.map((product) => {
                  return (
                    <div className="border rounded py-2 px-3 d-flex justify-content-start align-items-center mb-2">
                      <div className="w-25 mr-3">
                        <img className="my-auto" src={product.image.url} alt="상품 이미지" />
                      </div>
                      <div>
                        <h3 className="mb-2">{product.name}</h3>
                        <p>price: ${mf2(product.price)}</p>
                        <p>count: {product.count}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-4">
              <PaymentSelectView onChange={(value) => setType(value)} />
              <div className="right-content">
                <div className="total">
                  <h4>Total: ${mf2(props.purchase.totalPrice)}</h4>
                  <div className="main-border-button">
                    <button className="rounded" type="button" onClick={() => onClickBuy()}>
                      Buy
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

export default PurchaseShowView;
