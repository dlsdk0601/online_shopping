import React from "react";

export const CreateButtonView = (props: { onClick: () => void }) => {
  return (
    <div className="mt-3 flex w-full justify-end">
      <button
        type="button"
        className="rounded-lg bg-blue-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => props.onClick()}
      >
        생성
      </button>
    </div>
  );
};

export const EditButtonView = (props: {
  isNew: boolean;
  onClick: () => void;
  onDelete?: () => void;
}) => {
  return (
    <div className="mt-3 flex w-full justify-end">
      {!props.isNew && props.onDelete && (
        <button
          type="button"
          className="mr-3 rounded-lg bg-red-400 px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:opacity-60 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={props.onDelete}
        >
          삭제
        </button>
      )}
      <button
        type="button"
        className="rounded-lg bg-blue-400 px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:opacity-60 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => props.onClick()}
      >
        {props.isNew ? "저장" : "수정"}
      </button>
    </div>
  );
};
