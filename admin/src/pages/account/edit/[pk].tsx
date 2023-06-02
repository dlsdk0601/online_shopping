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
import { isNotNil } from "../../../ex/utils";
import { ShowUserRes } from "../../../api/type.g";

const UserShowPage = () => {
  const router = useRouter();
  const pk = typeof router.query?.pk === "string" ? Number(router.query.pk) : undefined;

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
  const [id, setId] = useValueField("");
  const [name, setName] = useValueField("");
  const [phone, setPhone] = useValueField("");
  const [createAt, setCreateAt] = useValueField<Moment | null>(null);

  useEffect(() => {
    if (isNil(props.user)) {
      return;
    }

    setCreateAt.set(moment(props.user.create_at));
    setName.set(props.user.name);
    setPhone.set(props.user.phone);
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
        <button type="button">edit</button>
      </CardSettings>
    </>
  );
});

export default UserShowPage;
