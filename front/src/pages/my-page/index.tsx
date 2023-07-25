import React, { useCallback, useLayoutEffect, useState } from "react";
import { isNil } from "lodash";
import { useMutation } from "react-query";
import AuthInputFieldView from "../../view/AuthInputFieldView";
import useValueField from "../../hooks/useValueField";
import { vEmail, vPassword, vPhone } from "../../ex/validate";
import { preventDefaulted } from "../../ex/utils";
import { useUser } from "../../hooks/useUser";
import { UserType } from "../../api/enum.g";
import { userTypeLabelToEnum } from "../../api/enum";
import { EditUserReq } from "../../api/type.g";
import { api } from "../../api/url.g";

const MyPage = () => {
  // TODO :: 비밀번호 체크 로직 추가
  const { user } = useUser();

  const { mutate } = useMutation((req: EditUserReq) => api.editUser(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setIsUpdate(false);
      setIsPasswordEdit(false);
      alert("수정 되었습니다.");
    },
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);

  const [id, setId] = useValueField("", "아이디");
  const [password, setPassword] = useValueField("", "비밀번호", vPassword);
  const [name, setName] = useValueField("", "이름");
  const [phone, setPhone] = useValueField("", "휴대폰", vPhone);
  const [email, setEmail] = useValueField("", "이메일", vEmail);
  const [type, setType] = useState<UserType | null>(null);

  useLayoutEffect(() => {
    if (isNil(user)) {
      return;
    }

    setId.set(user.id);
    setPassword.set("*************");
    setName.set(user.name);
    setPhone.set(user.phone);
    setEmail.set(user.email);
    setType(userTypeLabelToEnum(user.type));
  }, [user]);

  const onSubmit = useCallback(() => {
    // TODO :: validation 이 기니까 함수로 따로 빼기
    if (!isUpdate) {
      setIsUpdate(!isUpdate);
      return;
    }

    if (isNil(type) || isNil(user)) {
      return alert("정보가 올바르지 않습니다.");
    }

    if (type === UserType.LOCAL && setId.validate()) {
      return;
    }

    if (isPasswordEdit && setPassword.validate()) {
      return;
    }

    if (setName.validate() || setPhone.validate() || setEmail.validate()) {
      return;
    }

    mutate({
      pk: user.pk,
      id: id.value,
      password: password.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      type,
      isPasswordEdit,
    });
  }, [id, password, phone, email]);

  return (
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
            type="password"
            field={password}
            onChange={(e) => setPassword.set(e.target.value)}
            disabled={!isUpdate}
          />
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
  );
};

export default MyPage;
