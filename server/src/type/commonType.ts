export enum UserSearchType {
  NAME = "NAME",
  PHONE = "PHONE",
}

export enum UserType {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
  KAKAO = "KAKAO",
  NAVER = "NAVER",
}

export enum SubscribeSearchType {
  EMAIL = "EMAIL",
  NAME = "NAME",
}

export enum SubscribeHistorySearchType {
  ISSEND = "ISSEND",
  TITLE = "TITLE",
}

export enum ProductCategory {
  MEN = "MEN",
  WOMEN = "WOMEN",
  KIDS = "KIDS",
  ACCESSORY = "ACCESSORY",
}

export enum PurchaseItemStatus {
  WAITING = "WAITING", // 결제 대기 (결제 화면으로 들어와도 모두 결제 대기, 결제 안하고 화면 탈출해도 결제 대기로 기록을 항상 남긴다.)
  IN_PROGRESS = "IN_PROGRESS", // 결제 진행 중
  SUCCESS = "SUCCESS", // 결제 완료
  CANCEL = "CANCEL", // 결제 취소
  REFUND_WAITING = "REFUND_WAITING", // 환불 대기
  REFUND_SUCCESS = "REFUND_SUCCESS", // 환불 완료
  REFUND_FAIL = "REFUND_FAIL", // 환불 실패
  FAIL = "FAIL", // 결제 실패
}

export enum PurchaseSearchType {
  NAME = "NAME",
  PHONE = "PHONE",
  ORDER_CODE = "ORDER_CODE",
}

export enum PaymentType {
  TOSS = "TOSS",
  KAKAO = "KAKAO",
}

export enum TossPaymentMethod {
  TOSS_MONEY = "TOSS_MONEY", //	토스머니
  CARD = "CARD", //	카드
}

export enum TossPaymentCartType {
  CREDIT = "CREDIT", //	신용카드
  CHECK = "CHECK", //	체크카드
  PREPAYMENT = "PREPAYMENT", //	선불카드
}

export enum TossPaymentStatus {
  READY = "READY", // 결제를 생성하면 가지게 되는 초기 상태 입니다. 인증 전까지는 READY 상태를 유지합니다.
  IN_PROGRESS = "IN_PROGRESS", // 결제수단 정보와 해당 결제수단의 소유자가 맞는지 인증을 마친 상태입니다. 결제 승인 API를 호출하면 결제가 완료됩니다.
  WAITING_FOR_DEPOSIT = "WAITING_FOR_DEPOSIT", // 가상계좌 결제 흐름에만 있는 상태로, 결제 고객이 발급된 가상계좌에 입금하는 것을 기다리고 있는 상태입니다.
  DONE = "DONE", // 인증된 결제수단 정보, 고객 정보로 요청한 결제가 승인된 상태입니다.
  CANCELED = "CANCELED", // 승인된 결제가 취소된 상태입니다.
  PARTIAL_CANCELED = "PARTIAL_CANCELED", // 승인된 결제가 부분 취소된 상태입니다.
  ABORTED = "ABORTED", // 결제 승인이 실패한 상태입니다.
  EXPIRED = "EXPIRED", // 결제 유효 시간 30분이 지나 거래가 취소된 상태입니다. IN_PROGRESS 상태에서 결제 승인 API를 호출하지 않으면 EXPIRED가 됩니다.
}

export enum TossPaymentType {
  NORMAL = "NORMAL", // 일반 결제입니다.
  BRANDPAY = "BRANDPAY", // 브랜드페이 결제입니다.
  KEYIN = "KEYIN", // 키인 결제입니다.
}
