import { useRouter } from "next/router";
import { isNil } from "lodash";
import { useMutation } from "react-query";
import React, { memo, useCallback, useEffect, useState } from "react";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { CartProductListItem, DeleteCartReq, ShowCartRes } from "../../../api/type.g";
import useValueField from "../../../hooks/useValueField";
import CardFormView from "../../../components/tailwindEx/CardFormView";
import { TextFieldView } from "../../../components/field/field";
import { mf2 } from "../../../ex/numberEx";
import ShowContainer from "../../../layout/ShowContainer";

const CartEditPage = () => {
  return <ShowContainer queryKey={queryKeys.cart} api={api.showCart} Component={CartEditView} />;
};

const CartEditView = memo((props: { data?: ShowCartRes }) => {
  const router = useRouter();
  const [name, setName] = useValueField("", "유저 이름");
  const [phone, setPhone] = useValueField("", "유저 휴대폰");
  const [totalPrice, setTotalPrice] = useState(0);
  const [list, setList] = useState<CartProductListItem[]>([]);

  const { mutate: onDeleteApi } = useMutation((req: DeleteCartReq) => api.deleteCart(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      alert("삭제 되었습니다.");
      router.reload();
    },
  });

  useEffect(() => {
    if (isNil(props.data)) {
      return;
    }

    setName.set(props.data.name);
    setPhone.set(props.data.phone);
    setTotalPrice(props.data.totalPrice);
    setList([...props.data.list]);
  }, [props.data]);

  const onDelete = useCallback((pk: number) => {
    if (!confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }

    onDeleteApi({ pk });
  }, []);

  return (
    <div className="w-full px-4">
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
        <div className="mt-2 flex w-11/12 justify-between">
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
            <p className="w-1/12">삭제</p>
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
                <button
                  type="button"
                  className="mr-2 mb-2 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
                  onClick={() => onDelete(product.pk)}
                >
                  삭제
                </button>
              </li>
            );
          })}
        </ul>
      </CardFormView>
    </div>
  );
});

export default CartEditPage;
