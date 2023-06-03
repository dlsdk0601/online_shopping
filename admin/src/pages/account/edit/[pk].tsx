import moment, { Moment } from "moment";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import React, { useEffect } from "react";
import CardSettings from "../../../components/tailwindEx/CardSettings";
import { MomentFieldView, TextFieldView } from "../../../components/field/field";
import useValueField from "../../../hooks/useValueField";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { isNotNil, validatePk } from "../../../ex/utils";
import { ShowUserRes } from "../../../api/type.g";

const UserShowPage = () => {
  const router = useRouter();
  const pkObject = validatePk(router.query.pk);

  if (isNil(pkObject.pk)) {
    return <></>;
  }

  const { data: user } = useQuery(
    [queryKeys.showUser, pkObject],
    () => api.showUser({ pk: pkObject.pk as Number }),
    {
      enabled: router.isReady && isNotNil(pkObject.pk),
    },
  );

  return (
    <div className="w-full px-4">
      <UserShowView user={user} />
    </div>
  );
};

const UserShowView = React.memo((props: { user: ShowUserRes | undefined }) => {
  const [id, setId] = useValueField("");
  const [name, setName] = useValueField("");
  const [phone, setPhone] = useValueField("");
  const [email, setEmail] = useValueField("");
  const [createAt, setCreateAt] = useValueField<Moment | null>(null);

  useEffect(() => {
    if (isNil(props.user)) {
      return;
    }

    setCreateAt.set(moment(props.user.create_at));
    setName.set(props.user.name);
    setPhone.set(props.user.phone);
    setEmail.set(props.user.email);
  }, [props]);

  return (
    <>
      <CardSettings>
        <TextFieldView value={id} onChange={(e) => setId.set(e.target.value)} label="아이디" />
        <TextFieldView value={name} label="이름" onChange={(e) => setName.set(e.target.value)} />
        <TextFieldView
          value={phone}
          label="휴대폰"
          onChange={(e) => setPhone.set(e.target.value)}
        />
        <MomentFieldView value={createAt.value} label="생성 일자" />
        <TextFieldView
          value={email}
          label="이메일"
          onChange={(e) => setEmail.set(e.target.value)}
        />
        <div className="mt-3 flex w-full justify-end">
          <button
            type="button"
            className="rounded-lg bg-blue-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isNil(props.user) ? "저장" : "수정"}
          </button>
        </div>
      </CardSettings>
    </>
  );
});

export default UserShowPage;
