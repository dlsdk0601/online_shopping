import { isNil } from "lodash";
import React, {
  Dispatch,
  forwardRef,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import classNames from "classnames";
import { ignorePromise, isNotNil } from "../../../../ex/utils";
import { queryKeys } from "../../../../lib/contants";
import { api } from "../../../../api/url.g";
import { PurchaseItem, RefundPurchaseReq, ShowPurchaseRes } from "../../../../api/type.g";
import CardFormView from "../../../../components/tailwindEx/CardFormView";
import { ReadOnlyTextView, TextFieldView } from "../../../../components/field/field";
import useValueField from "../../../../hooks/useValueField";
import { d1 } from "../../../../ex/dateEx";
import { mf2 } from "../../../../ex/numberEx";
import { purchaseEnumToLabel } from "../../../../api/enum";
import ShowContainer from "../../../../layout/ShowContainer";
import { Urls } from "../../../../url/url.g";
import { useClickOutside } from "../../../../hooks/useClickOutside";

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
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useClickOutside(modalRef);
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

  const onClickRefundButton = useCallback(() => {
    if (isNil(props.data)) {
      return;
    }

    setIsOpen(true);
  }, [props.data]);

  return (
    <>
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
                  onClick={() => onClickRefundButton()}
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
                  <p className="w-1/12" />
                </li>
              );
            })}
          </ul>
        </CardFormView>
      </div>
      {isNotNil(props.data) && (
        <RefundModal ref={modalRef} pk={props.data.pk} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
});

const RefundModal = forwardRef<
  HTMLDivElement,
  { pk: number; isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }
>((props, ref) => {
  const router = useRouter();
  const [reason, setReason] = useValueField("", "환불 사유");

  const { mutate: onRefundApi } = useMutation((req: RefundPurchaseReq) => api.refundPurchase(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      alert("환불 되었습니다.");
      ignorePromise(() => router.replace(Urls.order.index.url()));
    },
  });

  const onClickRefund = useCallback(() => {
    if (setReason.validate()) {
      return;
    }

    onRefundApi({ pk: props.pk, cancelReason: reason.value });
  }, []);

  return (
    <div
      className={classNames(
        "fixed top-0 right-0 left-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0",
        {
          flex: props.isOpen,
          hidden: !props.isOpen,
        },
      )}
    >
      <div ref={ref} className="relative max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white shadow ">
          <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5">
            <h3 className="text-xl font-semibold text-gray-900">Refund</h3>
            <button
              type="button"
              className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
              onClick={() => props.setIsOpen(false)}
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="space-y-4 p-4 md:p-5">
            <p className="text-base leading-relaxed text-gray-500">환불 사유를 적어주세요</p>
            {/* TODO :: 길이 조정 */}
            <TextFieldView
              value={reason}
              onChange={(value) => setReason.set(value)}
              isShowingLabel
            />
          </div>
          <div className="flex justify-end rounded-b border-t border-gray-200 p-4 md:p-5">
            <button
              type="button"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
              onClick={() => onClickRefund()}
            >
              신청하기
            </button>
            <button
              type="button"
              className="ms-3 ml-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 "
              onClick={() => props.setIsOpen(false)}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PurchaseEditPage;
