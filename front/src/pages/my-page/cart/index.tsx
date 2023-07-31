import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { isNil } from "lodash";
import { api } from "../../../api/url.g";
import { queryKeys } from "../../../lib/contants";
import { ignorePromise } from "../../../ex/utils";
import { Replace } from "../../../layout/App";
import { Urls } from "../../../url/url.g";
import CartListView from "../../../view/myPage/CartListView";

const CartPage = () => {
  // TODO :: 전체 선택, 전체 삭제, 체크 박스 넣기
  const router = useRouter();

  const { data: cartList, isLoading } = useQuery([queryKeys.cart], () => api.cartList({}), {
    onSuccess: (res) => {
      if (isNil(res)) {
        ignorePromise(() => router.replace(Urls.index.url()));
      }
    },
  });

  if (isLoading) {
    // TODO :: 스켈레톤
    return <></>;
  }

  if (isNil(cartList)) {
    return <Replace url={Urls.index.url()} />;
  }

  return <CartListView list={cartList.list} />;
};

export default CartPage;
