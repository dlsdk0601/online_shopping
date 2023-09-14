import { ShowPurchaseRes } from "../../api/type.g";
import { mf2 } from "../../ex/numberEx";

const PurchaseShowView = (props: { purchase: ShowPurchaseRes }) => {
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
              <div className="right-content">
                <div className="total">
                  <h4>Total: ${mf2(props.purchase.totalPrice)}</h4>
                  <div className="main-border-button">
                    <button className="rounded" type="button" onClick={() => {}}>
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
