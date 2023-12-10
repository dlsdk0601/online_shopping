import { isNil } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { isNotNil } from "../../../../ex/utils";
import { queryKeys } from "../../../../lib/contants";
import { api } from "../../../../api/url.g";
import { PurchaseItem, ShowPurchaseRes } from "../../../../api/type.g";
import CardFormView from "../../../../components/tailwindEx/CardFormView";
import { ReadOnlyTextView, TextFieldView } from "../../../../components/field/field";
import useValueField from "../../../../hooks/useValueField";
import { d1 } from "../../../../ex/dateEx";
import { mf2 } from "../../../../ex/numberEx";
import { purchaseEnumToLabel } from "../../../../api/enum";
import ShowContainer from "../../../../layout/ShowContainer";

const PurchaseEditPage = () => {
  return (
    <ShowContainer
      queryKey={queryKeys.purchase}
      api={api.showPurchase}
      Component={PurchaseEditView}
    />
  );
};

const PurchaseEditView = memo((props: { data?: ShowPurchaseRes }) => {
  const [name, setName] = useValueField("", "유저 이름");
  const [phone, setPhone] = useValueField("", "유저 휴대폰");
  const [list, setList] = useState<PurchaseItem[]>([]);

  useEffect(() => {
    if (isNil(props.data)) {
      return;
    }

    setName.set(props.data.name);
    setPhone.set(props.data.phone);
    setList([...props.data.purchaseItems]);
  }, [props.data]);

  return (
    <div className="w-full px-4">
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
        <ReadOnlyTextView value={props.data?.orderCode ?? ""} label="주문 번호" />
        <ReadOnlyTextView
          value={isNotNil(props.data?.createAt) ? d1(props.data?.createAt) : ""}
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
            <p className="w-1/12">상태</p>
            <p className="w-1/12">
              <button
                type="button"
                className="rounded border border-red-500 p-2 text-red-500 transition-all hover:bg-red-500 hover:text-white"
              >
                전체 환불
              </button>
            </p>
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
                <p className="w-1/12">{purchaseEnumToLabel(product.status)}</p>
                <p className="w-1/12">
                  <button
                    type="button"
                    className="rounded border border-red-500 p-2 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                  >
                    환불
                  </button>
                </p>
              </li>
            );
          })}
        </ul>
      </CardFormView>
    </div>
  );
});

export default PurchaseEditPage;
