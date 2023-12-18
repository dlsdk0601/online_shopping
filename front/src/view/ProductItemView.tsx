import { UrlObject } from "url";
import { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import { useRecoilValue } from "recoil";
import { AddCartReq, ProductListItem } from "../api/type.g";
import { Urls } from "../url/url.g";
import { api } from "../api/url.g";
import { tokenModel } from "../store/user";
import { mf1 } from "../ex/numberEx";

const ProductItemView = (props: { item: ProductListItem }) => {
  const router = useRouter();
  const token = useRecoilValue(tokenModel);
  const [url, setUrl] = useState<UrlObject | null>(null);

  const { mutate: onAddCartApi } = useMutation((req: AddCartReq) => api.addCart(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      alert("장바구니에 추가 되었습니다.");
    },
  });

  const onAddCart = useCallback(() => {
    if (isNil(token)) {
      return alert("장바구니에 추가 하시려면\n 로그인을 해주세요.");
    }

    onAddCartApi({ pk: props.item.pk });
  }, [props.item]);

  useEffect(() => {
    switch (props.item.category) {
      case "KIDS":
        setUrl(Urls.kids.show["[pk]"].url({ pk: props.item.pk }));
        return;
      case "MEN":
        setUrl(Urls.mens.show["[pk]"].url({ pk: props.item.pk }));
        return;
      case "WOMEN":
        setUrl(Urls.womens.show["[pk]"].url({ pk: props.item.pk }));
        return;
      case "ACCESSORY":
      default:
        setUrl(Urls.accessory.show["[pk]"].url({ pk: props.item.pk }));
    }
  }, []);

  return (
    <li className="item">
      <div className="thumb">
        <div className="hover-content">
          <ul>
            <li>
              <button type="button" onClick={() => router.push(url ?? "/")}>
                <i className="fa fa-eye" />
              </button>
            </li>
            <li>
              <button type="button">
                <i className="fa fa-star" />
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onAddCart()}>
                <i className="fa fa-shopping-cart" />
              </button>
            </li>
          </ul>
        </div>
        <img src={props.item.image.url} alt={`${props.item.category}-img-${props.item.pk}`} />
      </div>
      <div className="down-content">
        <h4>{props.item.name}</h4>
        <span>₩{mf1(props.item.price)}</span>
      </div>
    </li>
  );
};

export default memo(ProductItemView);
