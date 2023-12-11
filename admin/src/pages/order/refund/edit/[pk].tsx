import React, { memo, useEffect, useState } from "react";
import { isNil } from "lodash";
import ShowContainer from "../../../../layout/ShowContainer";
import { queryKeys } from "../../../../lib/contants";
import { api } from "../../../../api/url.g";
import useValueField from "../../../../hooks/useValueField";
import { RefundItem, ShowRefundRes } from "../../../../api/type.g";
import CardFormView from "../../../../components/tailwindEx/CardFormView";
import { ReadOnlyTextView, TextFieldView } from "../../../../components/field/field";
import { isNotNil } from "../../../../ex/utils";
import { d1 } from "../../../../ex/dateEx";
import { mf2 } from "../../../../ex/numberEx";

const RefundEditPage = () => {
  return (
    <ShowContainer queryKey={queryKeys.refund} api={api.showRefund} Component={RefundEditView} />
  );
};

const RefundEditView = memo((props: { data?: ShowRefundRes }) => {
  const [name, setName] = useValueField("", "유저 이름");
  const [phone, setPhone] = useValueField("", "유저 휴대폰");
  const [list, setList] = useState<RefundItem[]>([]);

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
      <CardFormView title="환불 정보">
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
    </div>
  );
});

export default RefundEditPage;
