import { SubscribeHistorySearchType, SubscribeSearchType, UserSearchType } from "./enum.g";

export const userSearchTypeEnumToLabel = (type: string | undefined): UserSearchType | undefined => {
  switch (type) {
    case "NAME":
      return UserSearchType.NAME;
    case "PHONE":
      return UserSearchType.PHONE;
    default:
  }
};

export const subscribeSearchTypeEnumToLabel = (
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

export const subscribeHistorySearchTypeEnumToLabel = (
  type: string | undefined,
): SubscribeHistorySearchType | undefined => {
  switch (type) {
    case "TITLE":
      return SubscribeHistorySearchType.TITLE;
    case "ISSEND":
      return SubscribeHistorySearchType.ISSEND;
    default:
  }
};
