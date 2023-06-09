import { UserSearchType } from "./enum.g";

export const UserSearchTypeEnumToLabel = (type: string | undefined): UserSearchType | undefined => {
  switch (type) {
    case "NAME":
      return UserSearchType.NAME;
    case "PHONE":
      return UserSearchType.PHONE;
    default:
  }
};
