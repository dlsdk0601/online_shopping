import { useRef } from "react";
import classNames from "classnames";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useUser } from "../../hooks/useUser";

const UserDropdown = () => {
  const boxRef = useRef(null);
  const { isOpen, setIsOpen } = useClickOutside(boxRef);
  const { clearUser } = useUser();
  return (
    <>
      <a
        className="relative block text-blueGray-500"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blueGray-200 text-sm text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
        </div>
      </a>
      <div
        ref={boxRef}
        style={{ right: "20px", top: "100%" }}
        className={classNames(
          "absolute z-50 min-w-48 list-none rounded bg-white py-2 text-left text-base shadow-lg",
          {
            block: isOpen,
            hidden: !isOpen,
          },
        )}
      >
        <button
          type="button"
          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-blueGray-700"
          onClick={(e) => e.preventDefault()}
        >
          My Account
        </button>
        {/* TODO :: 정인아 - 로그아웃 버튼 */}
        <button
          type="button"
          className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-blueGray-700"
          onClick={() => clearUser()}
        >
          sign-out
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
