import React from "react";

const EditButtonView = (props: { isNew: boolean; onClick: () => void }) => {
  return (
    <div className="mt-3 flex w-full justify-end">
      <button
        type="button"
        className="rounded-lg bg-blue-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => props.onClick()}
      >
        {props.isNew ? "저장" : "수정"}
      </button>
    </div>
  );
};

export default EditButtonView;
