import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import CardFormView from "../../../components/tailwindEx/CardFormView";
import { ReadOnlyTextView, TextFieldView, UserTypeView } from "../../../components/field/field";
import useValueField from "../../../hooks/useValueField";
import { queryKeys } from "../../../lib/contants";
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

const UserShowPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (isNil(pk)) {
    return <></>;
  }

  const { data: user } = useQuery([queryKeys.showUser, pk], () => api.showUser({ pk }), {
    enabled: router.isReady && isNotNil(pk),
  });

  return (
    <div className="w-full px-4">
      <UserShowView user={user} />
    </div>
  );
};

const UserShowView = React.memo((props: { user: ShowUserRes | undefined }) => {
  const router = useRouter();
  const [phone, setPhone] = useValueField("", "휴대폰");
  const [email, setEmail] = useValueField("", "이메일");
  const [type, setType] = useState<UserType | null>(null);
  const buyCount = 0;
  const refundCount = 0;
  const reviewCount = 0;

  const { mutate } = useMutation((req: EditUserReq) => api.editUser(req), {
    onSuccess: (res: EditUserRes) => {
      editAlert(isNil(props.user));
      ignorePromise(() => router.replace(Urls.account.edit["[pk]"].url({ pk: res.pk })));
    },
  });

  const onEdit = useCallback(() => {
    if (isNotNil(props.user)) {
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
    }
  }, [phone, email]);

  useEffect(() => {
    if (isNil(props.user)) {
      return;
    }

    setType(props.user.type as UserType);
    setPhone.set(props.user.phone ?? "");
    setEmail.set(props.user.email);
  }, [props]);

  return (
    <>
      <CardFormView title="유저 정보">
        <ReadOnlyTextView value={props.user?.id ?? ""} label="아이디" />
        <UserTypeView value={type} />
        <ReadOnlyTextView value={props.user?.name ?? ""} label="이름" />
        <TextFieldView value={phone} label={phone.name} onChange={(value) => setPhone.set(value)} />
        <TextFieldView
          value={email}
          label={email.name}
          onChange={(value) => setEmail.set(value)}
          disabled={type !== UserType.LOCAL}
        />
        <ReadOnlyTextView value={buyCount} label="상품 구매 횟수" />
        <ReadOnlyTextView value={refundCount} label="상품 환뷸 횟수" />
        <ReadOnlyTextView value={reviewCount} label="리뷰 횟수" />
        <ReadOnlyTextView value={dateFormatter(props.user?.createAt)} label="생성 일자" />
        <ReadOnlyTextView value={dateFormatter(props.user?.updateAt)} label="수정 일자" />
        <EditButtonView isNew={isNil(props.user)} onClick={() => onEdit()} />
      </CardFormView>
    </>
  );
});

export default UserShowPage;
