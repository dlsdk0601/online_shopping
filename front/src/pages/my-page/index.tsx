import React, { useCallback, useLayoutEffect, useState } from "react";
import { isNil } from "lodash";
import AuthInputFieldView from "../../view/AuthInputFieldView";
import useValueField from "../../hooks/useValueField";
import { vEmail, vPassword, vPhone } from "../../ex/validate";
import { preventDefaulted } from "../../ex/utils";
import { useUser } from "../../hooks/useUser";
import { UserType } from "../../api/enum.g";
import { userTypeLabelToEnum } from "../../api/enum";

const MyPage = () => {
  const { user } = useUser();

  const [isUpdate, setIsUpdate] = useState(false);

  const [id, setId] = useValueField("", "아이디");
  const [password, setPassword] = useValueField("", "비밀번호", vPassword);
  const [phone, setPhone] = useValueField("", "휴대폰", vPhone);
  const [email, setEmail] = useValueField("", "이메일", vEmail);
  const [type, setType] = useState<UserType | null>(null);

  useLayoutEffect(() => {
    if (isNil(user)) {
      return;
    }

    setId.set(user.id);
    setPassword.set("*************");
    setPhone.set(user.phone);
    setEmail.set(user.email);
    setType(userTypeLabelToEnum(user.type));
  }, [user]);

  const onSubmit = useCallback(() => {
    if (!isUpdate) {
      setIsUpdate(!isUpdate);
      return;
    }

    console.log("test");
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
