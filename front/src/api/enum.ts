import { UserType } from "./enum.g";

export const userTypeLabelToEnum = (str: string): UserType => {
  switch (str) {
    case "GOOGLE":
      return UserType.GOOGLE;
    case "LOCAL":
      return UserType.LOCAL;
    case "APPLE":
      return UserType.APPLE;
    case "KAKAO":
      return UserType.KAKAO;
    case "NAVER":
    default:
      return UserType.NAVER;
  }
};
