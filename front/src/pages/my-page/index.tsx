import React, { useCallback, useLayoutEffect, useState } from "react";
import { isNil } from "lodash";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import AuthInputFieldView from "../../view/AuthInputFieldView";
import useValueField from "../../hooks/useValueField";
import { vEmail, vPhone } from "../../ex/validate";
import { ignorePromise, preventDefaulted } from "../../ex/utils";
import { useUser } from "../../hooks/useUser";
import { UserType } from "../../api/enum.g";
import { userTypeLabelToEnum } from "../../api/enum";
import { EditUserReq } from "../../api/type.g";
import { api } from "../../api/url.g";
import { Urls } from "../../url/url.g";
import { CONSTANT } from "../../lib/contants";
import ChangePasswordView from "../../view/myPage/ChangePasswordView";

const MyPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const token = sessionStorage.getItem(CONSTANT.sessionTokenKey);

  const { mutate } = useMutation((req: EditUserReq) => api.editUser(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setIsUpdate(false);
      alert("수정 되었습니다.");
    },
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const [id, setId] = useValueField("", "아이디");
  const [name, setName] = useValueField("", "이름");
  const [phone, setPhone] = useValueField("", "휴대폰", vPhone);
  const [email, setEmail] = useValueField("", "이메일", vEmail);
  const [type, setType] = useState<UserType | null>(null);

  useLayoutEffect(() => {
    if (isNil(token)) {
      ignorePromise(() => router.replace(Urls.index.url()));
      return;
    }

    if (isNil(user)) {
      return;
    }

    setId.set(user.id);
    setName.set(user.name);
    setPhone.set(user.phone);
    setEmail.set(user.email);
    setType(userTypeLabelToEnum(user.type));
  }, [user]);

  // 회원 정보 변경 validation
  const onValidate = useCallback(() => {
    if (isNil(type) || isNil(user)) {
      alert("정보가 올바르지 않습니다.");
      return false;
    }

    if (type === UserType.LOCAL && setId.validate()) {
      alert("정보가 올바르지 않습니다.");
      return false;
    }

    if (setName.validate()) {
      alert("정보가 올바르지 않습니다.");
      return false;
    }

    if (setPhone.validate()) {
      alert("정보가 올바르지 않습니다.");
      return false;
    }

    if (setEmail.validate()) {
      alert("정보가 올바르지 않습니다.");
      return false;
    }

    return true;
  }, [id, phone, email]);

  // 회원 정보 변경
  const onSubmit = useCallback(() => {
    if (isNil(user)) {
      alert("유저 정보가 조회되지 않습니다.");
      return router.replace(Urls.index.url());
    }

    if (!isUpdate) {
      setIsUpdate(!isUpdate);
      return;
    }

    if (!onValidate()) {
      return;
    }

    mutate({
      pk: user.pk,
      id: id.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      type,
    });
  }, [id, phone, email]);

  return (
    <>
      <section className="section mt-4">
        <div className="container sign-container">
          <form className="form-container" onSubmit={preventDefaulted(() => onSubmit())}>
            {type === UserType.LOCAL && (
              <AuthInputFieldView
                field={id}
                onChange={(e) => setId.set(e.target.value)}
                disabled={!isUpdate}
              />
            )}
            <AuthInputFieldView
              field={name}
              onChange={(e) => setName.set(e.target.value)}
              disabled={!isUpdate}
            />
            <AuthInputFieldView
              type="tel"
              field={phone}
              onChange={(e) => setPhone.set(e.target.value)}
              disabled={!isUpdate}
            />
            <AuthInputFieldView
              type="text"
              field={email}
              onChange={(e) => setEmail.set(e.target.value)}
              disabled={!isUpdate && type === UserType.LOCAL}
            />
            <button type="submit" className="sign-button">
              {isUpdate ? "submit" : "update"}
            </button>
          </form>
        </div>
      </section>
      {type === UserType.LOCAL && <ChangePasswordView pk={user?.pk} />}
    </>
  );
};

export default MyPage;
