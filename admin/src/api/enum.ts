import { SubscribeSearchType, UserSearchType } from "./enum.g";

export const UserSearchTypeEnumToLabel = (type: string | undefined): UserSearchType | undefined => {
  switch (type) {
    case "NAME":
      return UserSearchType.NAME;
    case "PHONE":
      return UserSearchType.PHONE;
    default:
  }
};

export const SubscribeSearchTypeEnumToLabel = (
  type: string | undefined,
): SubscribeSearchType | undefined => {
  switch (type) {
    case "NAME":
      return SubscribeSearchType.NAME;
    case "EMAIL":
      return SubscribeSearchType.EMAIL;
    default:
  }
};
