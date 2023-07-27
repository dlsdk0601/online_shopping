import React, { memo, useCallback, useState } from "react";
import { useMutation } from "react-query";
import { isNil } from "lodash";
import { preventDefaulted } from "../../ex/utils";
import AuthInputFieldView from "../AuthInputFieldView";
import useValueField from "../../hooks/useValueField";
import { vPassword } from "../../ex/validate";
import ReadOnlyView from "../ReadOnlyView";
import { EditPasswordReq } from "../../api/type.g";
import { api } from "../../api/url.g";

const ChangePasswordView = (props: { pk?: number }) => {
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);

  const [newPassword, setNewPassword] = useValueField("", "새 비밀번호", vPassword);
  const [confirmPassword, setConfirmPassword] = useValueField("", "새 비밀번호 확인", vPassword);

  const { mutate } = useMutation((req: EditPasswordReq) => api.editPassword(req), {
    onSuccess: (res) => {
      if (isNil(res)) {
        return;
      }

      setIsPasswordEdit(false);
      alert("수정 되었습니다.");
    },
  });

  // 비밀번호 변경
  const onSubmitChangePassword = useCallback(() => {
    if (isNil(props.pk)) {
      alert("정보가 올바르지 않습니다.");
      return;
    }

    if (!isPasswordEdit) {
      setIsPasswordEdit(!isPasswordEdit);
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      return alert("비밀번호가 맞지 않습니다.");
    }

    if (setNewPassword.validate()) {
      return alert("정보가 올바르지 않습니다.");
    }

    mutate({
      pk: props.pk,
      password: newPassword.value,
    });
  }, [newPassword, confirmPassword]);

  // 비밀전호 체크 onBlur
  const onBlurPassword = useCallback(() => {
    if (newPassword.value !== confirmPassword.value) {
      setConfirmPassword.err("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPassword.err("");
    }
  }, [newPassword, confirmPassword]);

  return (
    <section className="section mt-4">
      <div className="container sign-container">
        <form
          className="form-container"
          onSubmit={preventDefaulted(() => onSubmitChangePassword())}
        >
          {isPasswordEdit ? (
            <>
              <AuthInputFieldView
                type="password"
                field={newPassword}
                onChange={(e) => setNewPassword.set(e.target.value)}
                onBlur={() => onBlurPassword()}
                disabled={!isPasswordEdit}
              />
              <AuthInputFieldView
                type="password"
                field={confirmPassword}
                onChange={(e) => setConfirmPassword.set(e.target.value)}
                onBlur={() => onBlurPassword()}
                disabled={!isPasswordEdit}
              />
            </>
          ) : (
            <ReadOnlyView label="비밀번호" value="******" type="password" />
          )}
          <button type="submit" className="sign-button">
            {isPasswordEdit ? "submit" : "password update"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default memo(ChangePasswordView);
