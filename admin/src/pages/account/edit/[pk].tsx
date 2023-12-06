import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import CardFormView from "../../../components/tailwindEx/CardFormView";
import { ReadOnlyTextView, TextFieldView } from "../../../components/field/field";
import useValueField from "../../../hooks/useValueField";
import { api } from "../../../api/url.g";
import {
  dateFormatter,
  editAlert,
  ignorePromise,
  isNotBlank,
  isNotNil,
  validatePk,
} from "../../../ex/utils";
import { EditUserReq, EditUserRes, ShowUserRes } from "../../../api/type.g";
import { vEmail, vPhone } from "../../../ex/validate";
import { UserType } from "../../../api/enum.g";
import { Urls } from "../../../url/url.g";
import { EditButtonView } from "../../../components/tailwindEx/EditButtonView";
import { UserTypeView } from "../../../view/UserTypeView";
import { isGlobalLoading } from "../../../store/loading";
import { queryKeys } from "../../../lib/contants";
import { Replace } from "../../../layout/App";

const UserShowPage = () => {
  const router = useRouter();
  const setIsLoading = useSetRecoilState(isGlobalLoading);

  const pk = validatePk(router.query.pk);

  if (!router.isReady || isNil(pk)) {
    setIsLoading(true);
    return <></>;
  }

  const { data: user, isLoading } = useQuery([queryKeys.showUser, pk], () => api.showUser({ pk }), {
    enabled: isNotNil(pk),
  });

  if (isLoading) {
    setIsLoading(true);
    return <></>;
  }

  setIsLoading(false);

  // user 는 new 가 없기 때문에 list 페이지로 보낸다.
  if (isNil(user)) {
    return <Replace url={Urls.account.index.url()} />;
  }

  return (
    <div className="w-full px-4">
      <UserShowView user={user} />
    </div>
  );
};

const UserShowView = React.memo((props: { user: ShowUserRes }) => {
  const router = useRouter();
  const [phone, setPhone] = useValueField("", "휴대폰");
  const [email, setEmail] = useValueField("", "이메일");
  const [type, setType] = useState<UserType | null>(null);
  const [buyCount, setBuyCount] = useState(0);
  const [refundCount, setRefundCount] = useState(0);

  const { mutate } = useMutation((req: EditUserReq) => api.editUser(req), {
    onSuccess: (res: EditUserRes) => {
      editAlert(isNil(props.user));
      ignorePromise(() => router.replace(Urls.account.edit["[pk]"].url({ pk: res.pk })));
    },
  });

  const onEdit = useCallback(() => {
    const isValidPhone = vPhone(phone.value);
    if (isNotBlank(isValidPhone)) {
      return alert(isValidPhone);
    }

    const isValidEmail = vEmail(email.value);
    if (isNotBlank(isValidEmail)) {
      return alert(isValidEmail);
    }

    mutate({
      pk: props.user.pk,
      phone: phone.value,
      email: email.value,
    });
  }, [phone, email]);

  useEffect(() => {
    if (isNil(props.user)) {
      return;
    }

    setType(props.user.type as UserType);
    setPhone.set(props.user.phone ?? "");
    setEmail.set(props.user.email);
    setBuyCount(props.user.buyCount);
    setRefundCount(props.user.refundCount);
  }, [props]);

  return (
    <>
      <CardFormView title="유저 정보">
        <ReadOnlyTextView value={props.user?.id ?? ""} label="아이디" />
        <UserTypeView value={type} />
        <ReadOnlyTextView value={props.user?.name ?? ""} label="이름" />
        <TextFieldView value={phone} onChange={(value) => setPhone.set(value)} isShowingLabel />
        <TextFieldView
          value={email}
          onChange={(value) => setEmail.set(value)}
          disabled={type !== UserType.LOCAL}
          isShowingLabel
        />
        <ReadOnlyTextView value={buyCount} label="상품 구매 횟수" />
        <ReadOnlyTextView value={refundCount} label="환불 상품 갯수" />
        <ReadOnlyTextView value={dateFormatter(props.user?.createAt)} label="생성 일자" />
        <ReadOnlyTextView value={dateFormatter(props.user?.updateAt)} label="수정 일자" />
        <EditButtonView isNew={isNil(props.user)} onClick={() => onEdit()} />
      </CardFormView>
    </>
  );
});

export default UserShowPage;
