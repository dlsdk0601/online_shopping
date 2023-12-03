import moment, { Moment } from "moment";
import React, { memo, useCallback, useEffect, useState } from "react";
import { compact, isEmpty, isNil } from "lodash";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import CardFormView from "../../../../components/tailwindEx/CardFormView";
import EditorEx from "../../../../view/EditorEx";
import useValueField from "../../../../hooks/useValueField";
import { TextFieldView } from "../../../../components/field/field";
import DatePickerView from "../../../../view/DatePickerView";
import UserBadgeView from "../../../../view/UserBadgeView";
import SubscribeSelectBoxView from "../../../../view/SubscribeSelectBoxView";
import { editAlert, ignorePromise, isNotNil, validatePk } from "../../../../ex/utils";
import { queryKeys } from "../../../../lib/contants";
import { api } from "../../../../api/url.g";
import {
  AddSubscribeHistoryReq,
  DeleteSubscribeHistoryReq,
  ResendEmailReq,
  ShowSubscribeHistoryRes,
} from "../../../../api/type.g";
import { EditButtonView } from "../../../../components/tailwindEx/EditButtonView";
import { Urls } from "../../../../url/url.g";

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
      onSuccess: (res) => {
        if (isNil(res)) {
          ignorePromise(() => router.replace(Urls.subscribe.history.index.url()));
        }
      },
    },
  );

  return (
    <div className="w-full px-4">
      <SendEmailEditView res={subscribeHistory} />
    </div>
  );
};

const SendEmailEditView = memo((props: { res?: ShowSubscribeHistoryRes }) => {
  const router = useRouter();
  const [title, setTitle] = useValueField("", "제목");
  const [body, setBody] = useValueField("", "본분");
  const [sendDate, setSendDate] = useValueField<Moment | null>(null, "발송 날짜");
  const [isSend, setIsSend] = useValueField<boolean>(false, "발송 여부");
  const [userList, setUserList] = useState<[number | null, string][]>([]);

  const { mutate: onEditApi } = useMutation(
    (req: AddSubscribeHistoryReq) => api.addSubscribeHistory(req),
    {
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        editAlert(isNil(props.res));
        ignorePromise(() =>
          router.replace(Urls.subscribe.history.edit["[pk]"].url({ pk: res.pk })),
        );
      },
    },
  );

  const { mutate: onDeleteApi } = useMutation(
    (req: DeleteSubscribeHistoryReq) => api.deleteSubscribeHistory(req),
    {
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        router.reload();
      },
    },
  );

  useEffect(() => {
    if (isNil(props.res)) {
      return;
    }

    setTitle.set(props.res.title);
    setBody.set(props.res.body);
    setIsSend.set(props.res.isSend);
    setSendDate.set(moment(props.res.sendAt));

    // ts 가 타입 순서를 반대로 인식한다.
    const users: [number, string][] = props.res.users.map((item) => [item.pk, item.name]);
    setUserList([...users]);
  }, [props.res]);

  const onChangeSubscribeSelectBox = useCallback((value: [number | null, string] | null) => {
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
  }, []);

  const onClickRemoveUser = useCallback(
    (pk: number | null) => {
      if (isSend.value) {
        return;
      }
      const newList = userList.filter(([value, _]) => value !== pk);
      setUserList(newList);
    },
    [userList],
  );

  const onDeleteSubscribeHistory = useCallback(() => {
    if (isNil(props.res)) {
      return;
    }

    // 이미 발송한 내역은 지울수 없다.
    if (isSend.value) {
      return alert("이미 발송한 메일은 지울 수 없습니다.");
    }

    onDeleteApi({ pk: props.res.pk });
  }, [isSend]);

  const onEdit = useCallback(() => {
    if (setTitle.validate() || setSendDate.validate() || setBody.validate()) {
      return;
    }

    const users = isEmpty(userList) ? null : compact(userList.map(([pk, label]) => pk));

    onEditApi({
      pk: props.res?.pk ?? null,
      title: title.value,
      body: body.value,
      sendDate: sendDate.value?.toISOString() ?? "",
      users,
    });
  }, [props.res, title, body, userList, sendDate]);

  return (
    <CardFormView title="구독 이메일">
      <TextFieldView value={title} onChange={(value) => setTitle.set(value)} isShowingLabel />
      <DatePickerView
        field={sendDate}
        onChange={(value) => setSendDate.set(value)}
        disabled={isSend.value}
        isShowingLabel
      />
      <EditorEx field={body} onChange={(value) => setBody.set(value)} />
      <SubscribeSelectBoxView
        userList={userList}
        onChange={(value) => onChangeSubscribeSelectBox(value)}
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
            onClickRemove={() => onClickRemoveUser(pk)}
          />
        ))}
      </div>
      <div className="flex w-full justify-between">
        {props.res?.enableResend && <ResendEmailButtonView pk={props.res.pk} />}
        <EditButtonView
          isNew={isNil(props.res)}
          onClick={() => onEdit()}
          onDelete={isNotNil(props.res) ? onDeleteSubscribeHistory : undefined}
        />
      </div>
    </CardFormView>
  );
});

const ResendEmailButtonView = memo((props: { pk: number }) => {
  const router = useRouter();

  const { mutate } = useMutation((req: ResendEmailReq) => api.resendEmail(req), {
    onSuccess: (res) => {
      if (isNil(res) || !res.result) {
        alert("이메일이 전송에 실패하였습니다.");
        return;
      }

      alert("이메일이 정상적으로 전송 되었습니다.");
      router.reload();
    },
  });

  const onClickResendButton = useCallback(() => {
    mutate({ pk: props.pk });
  }, [props.pk]);

  return (
    <button
      type="button"
      className="mt-3 w-[100px] rounded-lg bg-blueGray-400 px-5 py-1 text-sm font-medium text-white transition duration-300 hover:opacity-60 focus:outline-none focus:ring-4 focus:ring-blue-300"
      onClick={() => onClickResendButton()}
    >
      재전송
    </button>
  );
});

export default SendEmailEditPage;
