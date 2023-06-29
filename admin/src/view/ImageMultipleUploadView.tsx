import { ChangeEvent, memo, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { compact, isEmpty, isNil } from "lodash";
import { ValueField } from "../ex/field";
import { FileSet, UploadReq, UploadsReq, UploadsRes } from "../api/type.g";
import { api } from "../api/url.g";
import { vImage } from "../ex/validate";
import { fileToBase64 } from "../ex/base64Ex";

const ImageMultipleUploadView = memo(
  (props: {
    field: ValueField<FileSet[]>;
    onChange: (res: UploadsRes) => void;
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
    }, []);

    const { mutate: onUploadsApi } = useMutation((req: UploadsReq) => api.uploads(req), {
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

      const fileList: File[] = [...files];
      const validList = fileList.map((file) => vImage(file, accepts));

      if (!isEmpty(compact(validList))) {
        return alert(validList[0]);
      }

      // const fileData = await Promise.all(fileList.map((file) => fileToBase64(file)));
      const fileData: UploadReq[] = [];
      for (let i = 0; i < fileList.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const data = await fileToBase64(fileList[i]);
        fileData.push(data);
      }
      const req = await Promise.all(fileData);
      onUploadsApi({ files: req });
    };

    return (
      <div>
        <input type="file" onChange={onUpload} multiple />
        {props.field.value.map((bsset) => {
          return (
            <div className="h-[100px] w-[100px] border">
              <img className="mx-auto h-full" src={bsset.url} alt={`sub-img-${bsset.uuid}`} />
            </div>
          );
        })}
      </div>
    );
  },
);

export default ImageMultipleUploadView;
