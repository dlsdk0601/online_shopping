import { useMutation } from "react-query";
import { isNil } from "lodash";
import React, { ChangeEvent, memo, useEffect, useState } from "react";
import classNames from "classnames";
import { FileSet, UploadReq, UploadRes } from "../api/type.g";
import { api } from "../api/url.g";
import { isBlank, isNotNil } from "../ex/utils";
import { ValueField } from "../ex/field";
import { fileToBase64 } from "../ex/base64Ex";
import { vImage } from "../ex/validate";

const ImageUploadView = memo(
  (props: {
    field: ValueField<FileSet | null>;
    onChange: (res: UploadRes) => void;
    accept?: string[];
    disabled?: boolean;
  }) => {
    const [accepts, setAccepts] = useState<string[]>([]);

    useEffect(() => {
      if (isNil(props.accept)) {
        setAccepts(["image/png", "image/jpeg", "image/jpg", "image/gif"]);
        return;
      }

      setAccepts([...props.accept]);
    }, [props.accept]);

    const { mutate: onUploadApi } = useMutation((req: UploadReq) => api.upload(req), {
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        props.onChange(res);
      },
    });

    const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      if (props.disabled) {
        return;
      }

      const {
        target: { files },
      } = e;

      const file = files[0];
      const validFile = vImage(file, accepts);

      if (isNotNil(validFile)) {
        e.target.value = "";
        return alert(validFile);
      }

      const fileData = await fileToBase64(file);
      onUploadApi({ ...fileData });
    };

    return (
      <div className="mb-3 mb-3 w-full lg:w-6/12">
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
          {props.field.name}
        </label>
        <label
          htmlFor={props.field.name}
          className={classNames(
            "flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 lg:w-10/12",
            {
              "cursor-pointer hover:bg-gray-100": !props.disabled,
              "border-red-500": !isBlank(props.field.error),
            },
          )}
        >
          {isNil(props.field.value) ? (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="mb-3 h-10 w-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 ">
                {accepts.map((accept) => accept.replace("image/", "")).join(", ")} 파일만 업로드
                가능합니다.
              </p>
            </div>
          ) : (
            <div className="h-full w-full p-2">
              <img
                className="mx-auto h-full"
                src={props.field.value.url}
                alt={`img-${props.field.name}`}
              />
            </div>
          )}
          <input
            id={props.field.name}
            type="file"
            accept={accepts.join(", ")}
            className="hidden"
            onChange={onUpload}
            disabled={props.disabled}
          />
        </label>
        {!isBlank(props.field.error) && (
          <p className="mt-1 text-xs text-red-500">{props.field.error}</p>
        )}
      </div>
    );
  },
);

export default ImageUploadView;
