import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { ValueField } from "../ex/field";
import { isBlank } from "../ex/utils";

const EditorEx = (props: {
  field: ValueField<string>;
  disabled?: boolean;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative mb-3 w-full">
      <Editor
        value={props.field.value}
        tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.10.2/tinymce.min.js"
        onEditorChange={(str) => props.onChange(str)}
        init={{
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | table | image | code | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          height: "400",
          width: "100%",
          // images_upload_handler: (blob, success, failure) =>
          //   uploadAsset(blob)
          //     .then((url) => {
          //       if (url) {
          //         success(url);
          //       } else {
          //         failure("an asset url did not return.");
          //       }
          //     })
          //     .catch(failure),
        }}
        disabled={!!props.disabled}
      />
      {!isBlank(props.field.error) && (
        <p className="mt-1 text-xs text-red-500">{props.field.error}</p>
      )}
    </div>
  );
};

export default EditorEx;
