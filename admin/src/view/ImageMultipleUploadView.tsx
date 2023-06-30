import React, { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { compact, isEmpty, isNil, toArray } from "lodash";
import classNames from "classnames";
import { FileSet, UploadReq } from "../api/type.g";
import { api } from "../api/url.g";
import { vImage } from "../ex/validate";
import { fileToBase64 } from "../ex/base64Ex";
import { isBlank } from "../ex/utils";
import { ValueField } from "../ex/field";

const ImageMultipleUploadView = memo(
  (props: {
    field: ValueField<FileSet[]>;
    onChange: (value: FileSet[]) => void;
    onDelete: (value: FileSet[]) => void;
    accept?: string[];
    disabled?: boolean;
  }) => {
    const [accepts, setAccepts] = useState<string[]>([]);
    const [list, setList] = useState<FileSet[]>([]);
    useEffect(() => {
      if (isNil(props.accept)) {
        setAccepts(["image/png", "image/jpeg", "image/jpg", "image/gif"]);
        return;
      }

      setAccepts([...props.accept]);
    }, []);

    const { mutate: onUploadApi, isLoading } = useMutation((req: UploadReq) => api.upload(req), {
      onSuccess: (res) => {
        if (isNil(res)) {
          return;
        }

        setList((prev) => {
          const newArr = [...prev, res.fileSet];
          props.onChange(newArr);
          return newArr;
        });
        props.onChange([...list]);
      },
    });

    const onUpload = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        if (props.disabled) {
          return;
        }

        const {
          target: { files },
        } = e;

        const validList = toArray(files).map((file) => vImage(file, accepts));
        if (!isEmpty(compact(validList))) {
          return alert(validList[0]);
        }

        // eslint-disable-next-line no-restricted-syntax
        for await (const file of toArray(files)) {
          const data = await fileToBase64(file);
          onUploadApi({ ...data });
        }
      },
      [accepts],
    );

    const onDelete = useCallback(
      (uuid: string) => {
        const filteredArr = list.filter((image) => image.uuid !== uuid);
        setList([...filteredArr]);
        props.onDelete([...filteredArr]);
      },
      [props.onDelete],
    );

    return (
      <div className="mb-3 mb-3 w-full lg:w-6/12">
        <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
          {props.field.name}
        </label>
        <label
          htmlFor={props.field.name}
          className={classNames(
            "flex h-28 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 lg:w-10/12",
            {
              "cursor-pointer hover:bg-gray-100": !props.disabled,
              "border-red-500": !isBlank(props.field.error),
            },
          )}
        >
          {!isLoading ? (
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
            <></>
          )}
          <input
            id={props.field.name}
            type="file"
            accept={accepts.join(", ")}
            className="hidden"
            onChange={onUpload}
            disabled={props.disabled}
            multiple
          />
        </label>
        <ul className="my-4 flex items-center justify-start">
          {list.map((image) => (
            <li className="mr-3 mb-1">
              <div key={`multiple-image-${image.name}`} className="h-[100px] w-[100px]">
                <img className="m-auto h-full" src={image.url} alt={`img-${props.field.name}`} />
              </div>
              <button
                type="button"
                className="mt-2 w-full rounded-lg border border-red-400 py-1 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                onClick={() => onDelete(image.uuid)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        {!isBlank(props.field.error) && (
          <p className="mt-1 text-xs text-red-500">{props.field.error}</p>
        )}
      </div>
    );
  },
);

export default ImageMultipleUploadView;
