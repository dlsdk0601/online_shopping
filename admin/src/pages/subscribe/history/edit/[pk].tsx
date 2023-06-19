import moment, { Moment } from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { isNil } from "lodash";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import CardFormView from "../../../../components/tailwindEx/CardFormView";
import EditorEx from "../../../../view/EditorEx";
import useValueField from "../../../../hooks/useValueField";
import { TextFieldView } from "../../../../components/field/field";
import DatePickerView from "../../../../view/DatePickerView";
import UserBadgeView from "../../../../view/UserBadgeView";
import SubscribeSelectBoxView from "../../../../view/SubscribeSelectBoxView";
import { isNotNil, validatePk } from "../../../../ex/utils";
import { queryKeys } from "../../../../lib/contants";
import { api } from "../../../../api/url.g";
import { ShowSubscribeHistoryRes } from "../../../../api/type.g";
import { EditButtonView } from "../../../../components/tailwindEx/EditButtonView";

const SendEmailEditPage = () => {
  const router = useRouter();
  const pk = validatePk(router.query.pk);

  if (isNil(pk)) {
    return <SendEmailEditView />;
  }

  const { data: subscribeHistory } = useQuery(
    [queryKeys.subscribe, pk],
    () => api.showSubscribeHistory({ pk }),
    {
      enabled: router.isReady && isNotNil(pk),
    },
  );

  return (
    <div className="w-full px-4">
      <SendEmailEditView res={subscribeHistory} />
    </div>
  );
};

const SendEmailEditView = memo((props: { res?: ShowSubscribeHistoryRes }) => {
  const [title, setTitle] = useValueField("", "제목");
  const [body, setBody] = useValueField("", "본분");
  const [sendDate, setSendDate] = useValueField<Moment | null>(null, "발송 날짜");
  const [isSend, setIsSend] = useValueField<boolean>(false, "발송 여부");
  const [userList, setUserList] = useState<[number | null, string][]>([]);

  useEffect(() => {
    if (isNil(props.res)) {
      return;
    }

    setTitle.set(props.res.title);
    setBody.set(props.res.body);
    setIsSend.set(props.res.isSend);
    setSendDate.set(moment(props.res.sendAt));
  }, []);

  const onEdit = useCallback(() => {}, [title, body, userList]);

  return (
    <CardFormView title="구독 이메일">
      <TextFieldView value={title} label={title.name} onChange={(value) => setTitle.set(value)} />
      <DatePickerView
        label={sendDate.name}
        filed={sendDate}
        onChange={(value) => setSendDate.set(value)}
        disabled={isSend.value}
      />
      <EditorEx value={body.value} onChange={(value) => setBody.set(value)} />
      <SubscribeSelectBoxView
        userList={userList}
        onChange={(value) => {
          // 전체 선택
          if (isNil(value)) {
            setUserList([]);
            return;
          }

          // 단일 선택
          setUserList((prev) => {
            prev.push(value);
            return [...prev];
          });
        }}
        disabled={isSend.value}
      />
      <div
        className={classNames("w-full rounded p-2", {
          "bg-white": userList.length > 0,
        })}
      >
        {userList.map(([pk, label]) => (
          <UserBadgeView
            key={`user-list-${pk}`}
            label={label}
            onClickRemove={() => {
              if (isSend.value) {
                return;
              }
              const newList = userList.filter(([value, _]) => value !== pk);
              setUserList(newList);
            }}
          />
        ))}
      </div>
      <EditButtonView isNew onClick={() => onEdit()} />
    </CardFormView>
  );
});

export default SendEmailEditPage;
