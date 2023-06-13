import { Editor } from "@tinymce/tinymce-react";

const EditorEx = (props: {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative mb-3 w-full">
      <Editor
        value={props.value}
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
    </div>
  );
};

export default EditorEx;
