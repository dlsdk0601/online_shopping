import Link from "next/link";
import { ChangeEvent, useCallback } from "react";
import { useMutation } from "react-query";
import { ValueField } from "../ex/field";
import useValueField from "../hooks/useValueField";
import { isBlank, isNotNil, preventDefaulted } from "../ex/utils";
import { vEmail } from "../ex/validate";
import { api } from "../api/url.g";
import { AddSubscribeReq } from "../api/type.g";

const SubscribeView = () => {
  const [name, setName] = useValueField("");
  const [email, setEmail] = useValueField("");

  const { mutate } = useMutation((req: AddSubscribeReq) => api.addSubscribe(req), {
    onSuccess: (res) => {
      alert("서비스 구독이 성공적으로 등록되었습니다.");
    },
    onError: () => {},
  });

  const isValidate = useCallback(() => {
    if (isBlank(name.value)) {
      alert("이름은 필수입니다.");
      return false;
    }

    const emailError = vEmail(email.value);
    if (isNotNil(emailError)) {
      alert(emailError);
      return false;
    }

    return true;
  }, [name, email]);

  const onSave = useCallback(async () => {
    if (!isValidate()) {
      return;
    }

    mutate({ name: name.value, email: email.value });
  }, [name, email]);

  return (
    <div className="subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="section-heading">
              <h2>By Subscribing To Our Newsletter You Can Get 30% Off</h2>
              <span>
                Details to details is what makes Hexashop different from the other themes.
              </span>
            </div>
            <form id="subscribe" onSubmit={preventDefaulted(() => onSave())}>
              <div className="row">
                <div className="col-lg-5">
                  <SubscribeInputView
                    field={name}
                    onChange={(e) => setName.set(e.target.value)}
                    placeholder="Your Name"
                  />
                </div>
                <div className="col-lg-5">
                  <SubscribeInputView
                    field={email}
                    type="email"
                    onChange={(e) => setEmail.set(e.target.value)}
                    placeholder="Your Email Address"
                  />
                </div>
                <div className="col-lg-2">
                  <fieldset>
                    <button type="submit" id="form-submit" className="main-dark-button">
                      <i className="fa fa-paper-plane" />
                    </button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-6">
                <ul>
                  <li>
                    Store Location:
                    <br />
                    <span>Sunny Isles Beach, FL 33160, United States</span>
                  </li>
                  <li>
                    Phone:
                    <br />
                    <span>010-6567-5303</span>
                  </li>
                  <li>
                    Office Location:
                    <br />
                    <span>Silim</span>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul>
                  <li>
                    Work Hours:
                    <br />
                    <span>07:30 AM - 9:30 PM Daily</span>
                  </li>
                  <li>
                    Email:
                    <br />
                    <span>inajung7008@gmail.com</span>
                  </li>
                  <li>
                    Social Media:
                    <br />
                    <span>
                      <Link href="#">Facebook</Link>, <a href="#">Instagram</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubscribeInputView = (props: {
  field: ValueField<string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email";
  placeholder: string;
}) => {
  return (
    <fieldset>
      <input
        id={props.type ?? "text"}
        type={props.type ?? "text"}
        value={props.field.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
      />
    </fieldset>
  );
};

export default SubscribeView;
