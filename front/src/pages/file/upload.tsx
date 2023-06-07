import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { api } from "../../api/url.g";
import { UploadReq } from "../../api/type.g";
import { fileToBase64 } from "../../ex/base64Ex";
import { isNotBlank } from "../../ex/utils";

const Upload = () => {
  const [url, setUrl] = useState("");
  const { mutate } = useMutation((req: UploadReq) => api.upload(req), {
    onSuccess: (res) => {
      // eslint-disable-next-line no-console
      console.log(res.fileSet);
      setUrl(res.fileSet.url);
    },
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files[0];
    const fileData = await fileToBase64(file);
    mutate({ ...fileData });
  };

  return (
    <div>
      <label>파일 업로드</label>
      <input type="file" onChange={(e) => onChange(e)} />
      {isNotBlank(url) && <img className="h-[100px] w-[100px]" src={url} alt="test" />}
    </div>
  );
};

export default Upload;
