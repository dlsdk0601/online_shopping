import { useRouter } from "next/router";
import { isNil } from "lodash";
import { useQuery } from "react-query";
import React, { memo, useEffect, useState } from "react";
import { ignorePromise, isNotNil, validatePk } from "../../../ex/utils";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { Urls } from "../../../url/url.g";
import { CartProductListItem, ShowCartRes } from "../../../api/type.g";
import useValueField from "../../../hooks/useValueField";
import CardFormView from "../../../components/tailwindEx/CardFormView";
import { TextFieldView } from "../../../components/field/field";
import { mf2 } from "../../../ex/numberEx";

const CartEditPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (isNil(pk)) {
    return <CartEditView />;
  }

  const { data: cart } = useQuery([queryKeys.cart, pk], () => api.showCart({ pk }), {
    enabled: router.isReady && isNotNil(pk),
    onSuccess: (res) => {
      if (isNil(res)) {
        ignorePromise(() => router.replace(Urls.cart.index.url()));
      }
    },
  });

  return (
    <div className="w-full px-4">
      <CartEditView res={cart} />
    </div>
  );
};

const CartEditView = memo((props: { res?: ShowCartRes }) => {
  const [name, setName] = useValueField("", "유저 이름");
  const [phone, setPhone] = useValueField("", "유저 휴대폰");
  const [totalPrice, setTotalPrice] = useState(0);
  const [list, setList] = useState<CartProductListItem[]>([]);

  useEffect(() => {
    if (isNil(props.res)) {
      return;
    }

    setName.set(props.res.name);
    setPhone.set(props.res.phone);
    setTotalPrice(props.res.totalPrice);
    setList([...props.res.list]);
  }, [props.res]);

  return (
    <CardFormView title="장바구니 정보">
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
      <div className="mt-2  flex w-11/12 justify-between">
        <p className="text-m font-bold uppercase text-blueGray-600">상품 리스트</p>
        <p className="text-m pr-2 text-end font-bold uppercase text-blueGray-600">
          총 합: $ {mf2(totalPrice)}
        </p>
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
              {/* TODO ::  장바구니에서 상품 삭제 시키는 버튼 생성 */}
            </li>
          );
        })}
      </ul>
    </CardFormView>
  );
});

export default CartEditPage;
