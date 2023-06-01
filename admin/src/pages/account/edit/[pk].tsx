import moment, { Moment } from "moment";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import CardSettings from "../../../components/tailwindEx/CardSettings";
import { MomentFieldView, TextFieldView } from "../../../components/field/field";
import useValueField from "../../../hooks/useValueField";
import { queryKeys } from "../../../lib/contants";
import { api } from "../../../api/url.g";
import { isNotNil } from "../../../ex/utils";
import { Urls } from "../../../url/url.g";
import useIsReady from "../../../hooks/useIsReady";

const UserShowPage = () => {
  const router = useRouter();
  const [id, setId] = useValueField("");
  const [name, setName] = useValueField("");
  const [phone, setPhone] = useValueField("");
  const [createAt, setCreateAt] = useValueField<Moment | null>(null);

  const pk = typeof router.query?.pk === "string" ? Number(router.query.pk) : undefined;

  if (isNil(pk)) {
    // pk 가 제대로 되어있지 않다면 뒤로 보낸다.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return router.replace(Urls.account.index);
  }

  const { data: user } = useQuery([queryKeys.showUser, pk], () => api.showUser({ pk }), {
    enabled: router.isReady && isNotNil(pk),
  });

  useIsReady(() => {
    if (isNil(user)) {
      return;
    }

    setCreateAt.set(moment(user.create_at));
    setName.set(user.name);
    setPhone.set(user.phone);
  }, [user]);

  return (
    <>
      <div className="w-full px-4">
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
      </div>
    </>
  );
};

export default UserShowPage;
