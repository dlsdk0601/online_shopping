import { useRouter } from "next/router";
import React, { memo, useCallback, useEffect, useRef } from "react";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { isNil } from "lodash";
import { nanoid } from "nanoid";
import { ShowPurchaseRes } from "../../api/type.g";
import { mf1 } from "../../ex/numberEx";
import { ignorePromise } from "../../ex/utils";
import { useUser } from "../../hooks/useUser";
import { baseConfig } from "../../lib/config";
import { Urls } from "../../url/url.g";

const PurchaseShowView = (props: { purchase: ShowPurchaseRes }) => {
  const router = useRouter();
  const paymentId = "payment_container";
  const agreementId = "agreement";
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  const { user } = useUser();

  useEffect(() => {
    ignorePromise(() => tossPaymentInit());
  }, [props, user]);

  const tossPaymentInit = useCallback(async () => {
    if (isNil(user)) {
      return;
    }

    // CustomerKey: 영문 대소문자, 숫자, 특수문자(`-`,`_`,`=`,`.`,`@`)로 최소 2자 이상 최대 50자 이하
    const customerKey = nanoid();

    try {
      // 회원 결제
      const paymentWidget = await loadPaymentWidget(baseConfig.toss_client_key, customerKey);
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(`#${paymentId}`, {
        value: props.purchase.totalPrice,
      });
      paymentWidget.renderAgreement(`#${agreementId}`);
      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    } catch (e) {
      alert(e);
    }
  }, [user, props]);

  const onClickPay = useCallback(async () => {
    if (isNil(user) || typeof window === "undefined") {
      return;
    }

    const paymentWidget = paymentWidgetRef.current;
    try {
      await paymentWidget?.requestPayment({
        orderId: props.purchase.orderId,
        orderName: props.purchase.title,
        customerName: user.name,
        customerEmail: user.email,
        successUrl: `${window.location.origin}${Urls.purchase.bridge.pathname}`,
        failUrl: `${window.location.origin}${Urls.purchase.fail.pathname}`,
      });
    } catch (e) {
      await router.replace(Urls.purchase.fail.url());
    }
  }, [props, user]);

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
                <div id={paymentId} style={{ width: "100%" }} />
                <div id={agreementId} style={{ width: "100%" }} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="right-content">
                <div className="total">
                  <span style={{ fontSize: "12px" }} className="text-danger">
                    카드 결제 및 간편 결제만 지원합니다.
                  </span>
                  <h4>Total: ₩{mf1(props.purchase.totalPrice)}</h4>
                  <div className="main-border-button">
                    <button className="rounded" type="button" onClick={() => onClickPay()}>
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

export default memo(PurchaseShowView);
