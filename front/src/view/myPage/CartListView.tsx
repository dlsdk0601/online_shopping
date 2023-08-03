import React, { memo, useCallback, useEffect, useState } from "react";
import { compact, isEmpty, isNil } from "lodash";
import { useMutation } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { CartListItem, DeleteCartItemReq, EditCartProductCountReq } from "../../api/type.g";
import { mf1 } from "../../ex/numberEx";
import { api } from "../../api/url.g";
import { cartTotalPrice } from "../../store/cart";
import { isNotNil } from "../../ex/utils";

const CartListView = (props: { list: CartListItem[] }) => {
  const router = useRouter();
  const checkArray = new Array(props.list.length).fill(true);
  const [totalPrice, setTotalPrice] = useRecoilState(cartTotalPrice);
  const [checkList, setCheckList] = useState<boolean[]>([...checkArray]);

  const { mutate: onDeleteApi } = useMutation((req: DeleteCartItemReq) => api.deleteCart(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      alert("삭제 되었습니다.");
      router.reload();
    },
  });

  useEffect(() => {
    let total = 0;
    props.list.forEach((cart, index) => {
      if (!checkList[index]) {
        return;
      }
      total += cart.price * cart.count;
    });

    setTotalPrice(total);
  }, [checkList]);

  const onCheck = useCallback(
    (index: number) => {
      const newCheckList = [...checkList];
      newCheckList[index] = !newCheckList[index];
      setCheckList([...newCheckList]);
    },
    [checkList],
  );

  const onAddAllCheck = useCallback(
    (length: number) => {
      const list = new Array(length).fill(true);
      setCheckList([...list]);
    },
    [props.list],
  );

  const onDeleteCart = useCallback(() => {
    const cartProductPks = compact(
      props.list.map((cart, index) => {
        if (!checkList[index]) {
          return;
        }

        return cart.pk;
      }),
    );

    onDeleteApi({ cartProductPks });
  }, [checkList, props.list]);

  return (
    <section className="section mt-4" id="products">
      <div className="container sign-container">
        <div className="row">
          <ul className="cart-item-wrapper">
            <li className="rounded">
              <div>
                <button
                  type="button"
                  className="count-button"
                  onClick={() => onAddAllCheck(props.list.length)}
                >
                  전체 선택
                </button>
                <button type="button" className="count-button" onClick={() => onDeleteCart()}>
                  선택 삭제
                </button>
                <button type="button" className="count-button">
                  구매 하기
                </button>
              </div>
              <p className="total-price">Total: ${mf1(totalPrice)}</p>
            </li>
            {isEmpty(props.list) && (
              <li>
                <span>cart is empty</span>
              </li>
            )}
            {!isEmpty(props.list) &&
              props.list.map((cart, index) => {
                return (
                  <CartListItemView
                    key={`cart-list-${cart.pk}`}
                    cart={cart}
                    checked={checkList[index]}
                    onChangeCheckBox={() => onCheck(index)}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

const CartListItemView = memo(
  (props: { cart: CartListItem; checked?: boolean; onChangeCheckBox: () => void }) => {
    const [cartItem, setCartItem] = useState(props.cart);
    const setTotalPrice = useSetRecoilState(cartTotalPrice);

    const { mutate: onEditCount } = useMutation(
      (req: EditCartProductCountReq) => api.editCartProductCount(req),
      {
        onSuccess: (res) => {
          if (isNil(res)) {
            return;
          }

          // 체크가 되어있는 아이템만 총 가격을 수정한다.
          if (isNotNil(props.checked) && props.checked) {
            const price = res.data.price * res.data.count - cartItem.price * cartItem.count;
            setTotalPrice((prev) => prev + price);
          }
          setCartItem({ ...res.data });
        },
      },
    );

    const onEdit = useCallback((count: number) => {
      onEditCount({ pk: cartItem.pk, count });
    }, []);

    return (
      <li className="rounded">
        <input
          type="checkbox"
          value=""
          onChange={() => props.onChangeCheckBox()}
          checked={props.checked}
        />
        <figure className="figure">
          <img className="figure-img rounded" src={cartItem.image.url} alt="cart-img" />
        </figure>
        <p>{cartItem.name}</p>
        <div>
          <div>
            <button
              type="button"
              className="count-button"
              onClick={() => onEdit(cartItem.count + 1)}
            >
              +
            </button>
            {cartItem.count}
            <button
              type="button"
              className="count-button"
              onClick={() => onEdit(cartItem.count - 1)}
            >
              -
            </button>
          </div>
        </div>
        <p className="price">${mf1(cartItem.count * cartItem.price)}</p>
      </li>
    );
  },
);

export default memo(CartListView);
