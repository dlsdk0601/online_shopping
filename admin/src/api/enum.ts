import {
  ProductCategory,
  PurchaseItemStatus,
  PurchaseSearchType,
  SubscribeHistorySearchType,
  SubscribeSearchType,
  UserSearchType,
} from "./enum.g";

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

export const labelToCategoryEnum = (label: string | undefined): ProductCategory | undefined => {
  switch (label) {
    case "MEN":
      return ProductCategory.MEN;
    case "WOMEN":
      return ProductCategory.WOMEN;
    case "KIDS":
      return ProductCategory.KIDS;
    case "ACCESSORY":
      return ProductCategory.ACCESSORY;
    default:
  }
};

export const categoryEnumToLabel = (label: "MEN" | "WOMEN" | "KIDS" | "ACCESSORY"): string => {
  switch (label) {
    case ProductCategory.MEN:
      return "남성";
    case ProductCategory.WOMEN:
      return "여성";
    case ProductCategory.KIDS:
      return "키즈";
    default: // ProductCategory.ACCESSORY
      return "악세서리";
  }
};

export const labelToPurchaseSearchType = (
  label: string | undefined,
): PurchaseSearchType | undefined => {
  switch (label) {
    case PurchaseSearchType.NAME:
    case PurchaseSearchType.PHONE:
    case PurchaseSearchType.ORDER_CODE:
      return label;
    default:
  }
};

export const purchaseEnumToLabel = (
  label:
    | "WAITING"
    | "IN_PROGRESS"
    | "SUCCESS"
    | "CANCEL"
    | "REFUND_WAITING"
    | "REFUND_SUCCESS"
    | "REFUND_FAIL"
    | "FAIL",
) => {
  switch (label) {
    case PurchaseItemStatus.CANCEL:
      return "결제 취소";
    case PurchaseItemStatus.FAIL:
      return "결제 실패";
    case PurchaseItemStatus.IN_PROGRESS:
      return "결제 진행 중";
    case PurchaseItemStatus.SUCCESS:
      return "결제 완료";
    case PurchaseItemStatus.REFUND_SUCCESS:
      return "환불 완료";
    case PurchaseItemStatus.REFUND_FAIL:
      return "환불 실패";
    case PurchaseItemStatus.REFUND_WAITING:
      return "환불 대기";
    case PurchaseItemStatus.WAITING:
    default:
      return "결제 대기";
  }
};
