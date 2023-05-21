import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { isArray, isNil } from "lodash";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { ignorePromise, isBlank, isNotNil, preventDefaulted } from "../../ex/utils";
import { api } from "../../api/url.g";
import { UserType } from "../../api/enum.g";
import { tokenModel } from "../../store/user";
import { Urls } from "../../url/url.g";
import useIsReady from "../../hooks/useIsReady";
import { vPhone } from "../../ex/validate";
import { SnsSignUpReq, SnsSignUpRes } from "../../api/type.g";
import AuthInputFieldView from "../../view/AuthInputFieldView";
import useValueField from "../../hooks/useValueField";

const SnsSignInPage = () => {
  const router = useRouter();
  const setToken = useSetRecoilState(tokenModel);

  const { mutate } = useMutation((req: SnsSignUpReq) => api.snsSignUp(req), {
    onSuccess: (res: SnsSignUpRes) => {
      setToken(res.token);
      ignorePromise(() => router.replace(Urls.index));
    },
  });

  const [email, setEmail] = useValueField("");
  const [name, setName] = useValueField("");
  const [phone, setPhone] = useValueField("");
  const [type, setType] = useValueField<UserType | null>(null);

  useIsReady(() => {
    const { type, email: queryEmail } = router.query;

    if (isNil(queryEmail) || isNil(type)) {
      return;
    }

    if (isArray(queryEmail) || isArray(type)) {
      return;
    }

    setEmail.set(queryEmail);
    setType.set(labelToEnum(type));
  });

  const errorInit = useCallback(() => {
    setName.err("");
    setPhone.err("");
  }, [name, phone, email]);

  const isValid = useCallback((): boolean => {
    errorInit();
    if (isBlank(name.value)) {
      setName.err("이름은 필수 입력사항입니다.");
      return false;
    }

    if (isNotNil(vPhone(phone.value))) {
      setPhone.err(vPhone(phone.value));
      return false;
    }

    return true;
  }, [name, phone]);

  const onSave = useCallback(async () => {
    if (!isValid) {
      return;
    }

    if (isNil(type.value)) {
      return router.replace(Urls.auth.signIn);
    }

    mutate({
      email: email.value,
      name: name.value,
      phone: phone.value,
      type: type.value,
    });
  }, [email, name, phone]);

  const labelToEnum = (str: string): UserType => {
    switch (str) {
      case "GOOGLE":
        return UserType.GOOGLE;
      case "LOCAL":
        return UserType.LOCAL;
      case "APPLE":
        return UserType.APPLE;
      case "KAKAO":
        return UserType.KAKAO;
      case "NAVER":
      default:
        return UserType.NAVER;
    }
  };

  return (
    <div className="mx-auto mt-14 w-[400px] rounded border p-4">
      <form onSubmit={preventDefaulted(() => onSave())}>
        <AuthInputFieldView
          field={email}
          label="이메일"
          onChange={(e) => setEmail.set(e.target.value)}
        />
        <AuthInputFieldView
          field={name}
          label="이름"
          onChange={(e) => setName.set(e.target.value)}
          type="tel"
        />
        <AuthInputFieldView
          field={phone}
          label="휴대폰"
          onChange={(e) => setPhone.set(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 w-full rounded border p-2 transition-colors hover:bg-black hover:text-white"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SnsSignInPage;
