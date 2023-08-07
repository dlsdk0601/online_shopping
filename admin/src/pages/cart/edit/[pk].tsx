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
  const router = useRouter();
  const [name, setName] = useValueField("", "유저 이름");
  const [phone, setPhone] = useValueField("", "유저 휴대폰");
  const [list, setList] = useState<CartProductListItem[]>([]);

  useEffect(() => {
    if (isNil(props.res)) {
      return;
    }

    setName.set(props.res.name);
    setPhone.set(props.res.phone);
    setList([...props.res.list]);
  }, [props.res]);

  return (
    <CardFormView title="장바구니 정보">
      <TextFieldView value={name} onChange={(value) => setName.set(value)} isShowingLabel />
      <TextFieldView value={phone} onChange={(value) => setPhone.set(value)} isShowingLabel />
      <ul>
        {list.map((product) => {
          return (
            <li key={product.pk}>
              <div>
                <img src={product.image.url} alt="product" />
              </div>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.count}</p>
            </li>
          );
        })}
      </ul>
    </CardFormView>
  );
});

export default CartEditPage;
