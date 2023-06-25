import {
  ProductCategory,
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
