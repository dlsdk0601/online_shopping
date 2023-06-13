import { memo } from "react";

const UserBadgeView = (props: { label: string; onClickRemove?: () => void }) => {
  return (
    <span className="mr-2 mb-2 inline-flex items-center rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
      {props.label}
      {props.onClickRemove && (
        <button
          type="button"
          className="ml-2 inline-flex items-center rounded-sm bg-transparent p-0.5 text-sm text-green-400 hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300"
          onClick={props.onClickRemove}
        >
          <svg
            aria-hidden="true"
            className="h-3.5 w-3.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Remove badge</span>
        </button>
      )}
    </span>
  );
};

export default memo(UserBadgeView);
