import { useRouter } from "next/router";
import { isNil } from "lodash";
import { useQuery } from "react-query";
import React, { memo, useEffect, useState } from "react";
import { ignorePromise, isNotNil, validatePk } from "../../../ex/utils";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { Urls } from "../../../url/url.g";
import { PurchaseItem, ShowPurchaseRes } from "../../../api/type.g";
import CardFormView from "../../../components/tailwindEx/CardFormView";
import { ReadOnlyTextView, TextFieldView } from "../../../components/field/field";
import useValueField from "../../../hooks/useValueField";
import { d1 } from "../../../ex/dateEx";
import { mf2 } from "../../../ex/numberEx";

const PurchaseEditPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (isNil(pk)) {
    return <PurchaseEditView />;
  }

  const { data: purchase } = useQuery([queryKeys.purchase, pk], () => api.showPurchase({ pk }), {
    enabled: router.isReady && isNotNil(pk),
    onSuccess: (res) => {
      if (isNil(res)) {
        ignorePromise(() => router.replace(Urls.purchase.index.url()));
      }
    },
  });

  return (
    <div className="w-full px-4">
      <PurchaseEditView res={purchase} />
    </div>
  );
};

const PurchaseEditView = memo((props: { res?: ShowPurchaseRes }) => {
  const [name, setName] = useValueField("", "유저 이름");
  const [phone, setPhone] = useValueField("", "유저 휴대폰");
  const [list, setList] = useState<PurchaseItem[]>([]);

  useEffect(() => {
    if (isNil(props.res)) {
      return;
    }

    setName.set(props.res.name);
    setPhone.set(props.res.phone);
    setList([...props.res.purchaseItems]);
  }, [props.res]);

  return (
    <CardFormView title="구매 정보">
      <TextFieldView
        value={name}
        onChange={(value) => setName.set(value)}
        isShowingLabel
        disabled
      />
      <TextFieldView
        value={phone}
        onChange={(value) => setPhone.set(value)}
        isShowingLabel
        disabled
      />
      <ReadOnlyTextView value={props.res?.orderCode ?? ""} label="주문 번호" />
      <ReadOnlyTextView
        value={isNotNil(props.res?.createAt) ? d1(props.res?.createAt) : ""}
        label="주문 번호"
      />
      <div className="mt-2 flex w-11/12 justify-between">
        <p className="text-m font-bold uppercase text-blueGray-600">구매 상품 리스트</p>
      </div>
      <ul className="w-11/12">
        <li className="mb-1 flex items-center justify-between rounded border-2 p-5 text-center">
          <p className="w-1/12">이미지</p>
          <p className="w-1/12">상품이름</p>
          <p className="w-1/12">가격</p>
          <p className="w-1/12">갯수</p>
          <p className="w-1/12">가격</p>
        </li>
        {list.map((product) => {
          return (
            <li
              key={product.pk}
              className="mb-3 flex items-center justify-between rounded border p-5 text-center"
            >
              <div className="w-1/12">
                <img src={product.image.url} alt="product" className="w-full" />
              </div>
              <p className="w-1/12">{product.name}</p>
              <p className="w-1/12">{mf2(product.price)}</p>
              <p className="w-1/12">{product.count}</p>
              <p className="w-1/12">$ {mf2(product.price * product.count)}</p>
            </li>
          );
        })}
      </ul>
    </CardFormView>
  );
});

export default PurchaseEditPage;
