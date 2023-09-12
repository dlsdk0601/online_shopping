import { ShowPurchaseRes } from "../../api/type.g";
import { mf2 } from "../../ex/numberEx";

const PurchaseShowView = (props: { purchase: ShowPurchaseRes }) => {
  console.log(props.purchase);
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
                {props.purchase.list.map((product) => {
                  return (
                    <div>
                      <p>{product.pk}</p>
                      <p>{product.name}</p>
                      <p>{product.price}</p>
                      {/* <img src={product.image.thumbnail} alt="product" /> */}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right-content">
                <div className="total">
                  <h4>Total: {mf2(props.purchase.totalPrice)}</h4>
                  <div className="main-border-button">
                    <button type="button" onClick={() => {}}>
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
