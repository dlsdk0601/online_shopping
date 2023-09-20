import { PaymentType, UserType } from "./enum.g";

export const userTypeLabelToEnum = (str: string | null | undefined): UserType => {
  switch (str) {
    case "GOOGLE":
      return UserType.GOOGLE;
    case "APPLE":
      return UserType.APPLE;
    case "KAKAO":
      return UserType.KAKAO;
    case "NAVER":
      return UserType.NAVER;
    case "LOCAL":
    default:
      return UserType.LOCAL;
  }
};

export const paymentEnumToLabel = (value: PaymentType): string => {
  switch (value) {
    case PaymentType.KAKAO:
      return "카카오페이";
    case PaymentType.TOSS:
      return "토스페이";
    default:
      return "";
  }
};
