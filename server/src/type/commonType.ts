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
