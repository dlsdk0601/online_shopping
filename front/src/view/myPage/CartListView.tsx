import React, { memo, useCallback, useEffect, useState } from "react";
import { compact, isEmpty } from "lodash";
import { CartListItem } from "../../api/type.g";
import { mf1 } from "../../ex/numberEx";

const CartListView = memo((props: { list: CartListItem[] }) => {
  const checkArray = new Array(props.list.length).fill(true);
  const [checkList, setCheckList] = useState<boolean[]>([...checkArray]);
  const [totalPrice, setTotalPrice] = useState(0);

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
    const pks = compact(
      props.list.map((cart, index) => {
        if (!checkList[index]) {
          return;
        }

        return cart.pk;
      }),
    );

    console.log(pks);
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
            {isEmpty(props.list) && <li>cart is empty</li>}
            {!isEmpty(props.list) &&
              props.list.map((cart, index) => {
                return (
                  <li key={`cart-list-${cart.pk}`} className="rounded">
                    <input
                      type="checkbox"
                      value=""
                      onChange={() => onCheck(index)}
                      checked={checkList[index]}
                    />
                    <figure className="figure">
                      <img className="figure-img rounded" src={cart.image.url} alt="cart-img" />
                    </figure>
                    <p>{cart.name}</p>
                    <div>
                      <div>
                        <button type="button" className="count-button">
                          +
                        </button>
                        {cart.count}
                        <button type="button" className="count-button">
                          -
                        </button>
                      </div>
                    </div>
                    <p className="price">${mf1(cart.count * cart.price)}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default CartListView;
