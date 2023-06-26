import { useCallback } from "react";
import { UserType } from "../api/enum.g";

export const UserTypeView = (props: { value: UserType | null }) => {
  const mapper = useCallback((): string => {
    switch (props.value) {
      case UserType.LOCAL:
        return "local";
      case UserType.GOOGLE:
        return "Google";
      case UserType.NAVER:
        return "Naver";
      case UserType.KAKAO:
        return "Kakao";
      default: // UserType.APPLE:
        return "";
    }
  }, [props.value]);

  return (
    <div className="relative mb-3 w-full lg:w-6/12">
      <label className="mb-2 block text-xs font-bold uppercase text-blueGray-600">
        사용자 유형
      </label>
      <input
        type="text"
        className="w-full rounded border-0 bg-gray-100 px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring lg:w-10/12"
        value={mapper()}
        disabled
      />
    </div>
  );
};
