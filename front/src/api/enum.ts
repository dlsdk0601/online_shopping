import { PaymentType, TossPaymentStatus, UserType } from "./enum.g";

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

export const paymentStatusEnumToLabel = (value: TossPaymentStatus): string => {
  switch (value) {
    case TossPaymentStatus.READY:
      return "결제 전";
    case TossPaymentStatus.IN_PROGRESS:
      return "결제 중";
    case TossPaymentStatus.WAITING_FOR_DEPOSIT:
      return "입금 전";
    case TossPaymentStatus.DONE:
      return "결제 완료";
    case TossPaymentStatus.CANCELED:
      return "결제 취소";
    case TossPaymentStatus.PARTIAL_CANCELED:
      return "부분 취소";
    case TossPaymentStatus.EXPIRED:
      return "결제 기간 만료";
    case TossPaymentStatus.ABORTED:
    default:
      return "결제 승인 실패";
  }
};
