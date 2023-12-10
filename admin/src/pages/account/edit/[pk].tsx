import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import CardFormView from "../../../components/tailwindEx/CardFormView";
import { ReadOnlyTextView, TextFieldView } from "../../../components/field/field";
import useValueField from "../../../hooks/useValueField";
import { api } from "../../../api/url.g";
import { dateFormatter, editAlert, ignorePromise, isNotBlank } from "../../../ex/utils";
import { EditUserReq, EditUserRes, ShowUserRes } from "../../../api/type.g";
import { vEmail, vPhone } from "../../../ex/validate";
import { UserType } from "../../../api/enum.g";
import { Urls } from "../../../url/url.g";
import { EditButtonView } from "../../../components/tailwindEx/EditButtonView";
import { UserTypeView } from "../../../view/UserTypeView";
import { queryKeys } from "../../../lib/contants";
import ShowContainer from "../../../layout/ShowContainer";

const UserShowPage = () => {
  return (
    <ShowContainer queryKey={queryKeys.showUser} api={api.showUser} Component={UserShowView} />
  );
};

const UserShowView = React.memo((props: { data?: ShowUserRes }) => {
  const router = useRouter();
  const [phone, setPhone] = useValueField("", "휴대폰");
  const [email, setEmail] = useValueField("", "이메일");
  const [type, setType] = useState<UserType | null>(null);
  const [buyCount, setBuyCount] = useState(0);
  const [refundCount, setRefundCount] = useState(0);

  const { mutate } = useMutation((req: EditUserReq) => api.editUser(req), {
    onSuccess: (res: EditUserRes) => {
      editAlert(isNil(props.data));
      ignorePromise(() => router.replace(Urls.account.edit["[pk]"].url({ pk: res.pk })));
    },
  });

  const onEdit = useCallback(() => {
    if (isNil(props.data)) {
      return alert("유저 정보가 없습니다.");
    }

    const isValidPhone = vPhone(phone.value);
    if (isNotBlank(isValidPhone)) {
      return alert(isValidPhone);
    }

    const isValidEmail = vEmail(email.value);
    if (isNotBlank(isValidEmail)) {
      return alert(isValidEmail);
    }

    mutate({
      pk: props.data.pk,
      phone: phone.value,
      email: email.value,
    });
  }, [phone, email]);

  useEffect(() => {
    if (isNil(props.data)) {
      // new 가 없기 때문에 뒤로 보낸다.
      ignorePromise(() => router.replace(Urls.account.index.url()));
      return;
    }

    setType(props.data.type as UserType);
    setPhone.set(props.data.phone ?? "");
    setEmail.set(props.data.email);
    setBuyCount(props.data.buyCount);
    setRefundCount(props.data.refundCount);
  }, [props]);

  return (
    <div className="w-full px-4">
      <CardFormView title="유저 정보">
        <ReadOnlyTextView value={props.data?.id ?? ""} label="아이디" />
        <UserTypeView value={type} />
        <ReadOnlyTextView value={props.data?.name ?? ""} label="이름" />
        <TextFieldView value={phone} onChange={(value) => setPhone.set(value)} isShowingLabel />
        <TextFieldView
          value={email}
          onChange={(value) => setEmail.set(value)}
          disabled={type !== UserType.LOCAL}
          isShowingLabel
        />
        <ReadOnlyTextView value={buyCount} label="상품 구매 횟수" />
        <ReadOnlyTextView value={refundCount} label="환불 상품 갯수" />
        <ReadOnlyTextView value={dateFormatter(props.data?.createAt)} label="생성 일자" />
        <ReadOnlyTextView value={dateFormatter(props.data?.updateAt)} label="수정 일자" />
        <EditButtonView isNew={isNil(props.data)} onClick={() => onEdit()} />
      </CardFormView>
    </div>
  );
});

export default UserShowPage;
