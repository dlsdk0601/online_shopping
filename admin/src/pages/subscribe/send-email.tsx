import { Moment } from "moment";
import React, { useState } from "react";
import { isNil } from "lodash";
import classNames from "classnames";
import CardFormView from "../../components/tailwindEx/CardFormView";
import EditorEx from "../../view/EditorEx";
import useValueField from "../../hooks/useValueField";
import { TextFieldView } from "../../components/field/field";
import DatePickerView from "../../view/DatePickerView";
import UserBadgeView from "../../view/UserBadgeView";
import UserSelectBoxView from "../../view/UserSelectBoxView";
import EditButtonView from "../../components/tailwindEx/EditButtonView";

const SendEmailPage = () => {
  const [title, setTitle] = useValueField("", "제목");
  const [text, setText] = useValueField("", "본분");
  const [sendDate, setSendDate] = useValueField<Moment | null>(null, "발송 날짜");
  const [userList, setUserList] = useState<[number | null, string][]>([]);

  return (
    <div className="w-full px-4">
      <CardFormView title="구독 이메일">
        <TextFieldView value={title} label={title.name} onChange={(value) => setTitle.set(value)} />
        <DatePickerView
          label={sendDate.name}
          filed={sendDate}
          onChange={(value) => setSendDate.set(value)}
        />
        <EditorEx value={text.value} onChange={(value) => setText.set(value)} />
        <UserSelectBoxView
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
                const newList = userList.filter(([value, _]) => value !== pk);
                setUserList(newList);
              }}
            />
          ))}
        </div>
        <EditButtonView isNew onClick={() => {}} />
      </CardFormView>
    </div>
  );
};

export default SendEmailPage;
