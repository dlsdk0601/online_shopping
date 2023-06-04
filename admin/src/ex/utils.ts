import { ParsedUrlQuery } from "querystring";
import { BaseSyntheticEvent } from "react";
import { isArray, isDate, isEmpty, isNil, isNull, isNumber, isString, isUndefined } from "lodash";
import moment, { Moment } from "moment";
import { NEWPK } from "../lib/contants";

export const returnTo = (query: ParsedUrlQuery): string | undefined => {
  const returnTo = query.returnTo;
  if (typeof returnTo === "string" && returnTo.length) {
    return returnTo;
  }
};

export const preventDefault = (e: BaseSyntheticEvent) => {
  e.preventDefault();
};

export const preventDefaulted = <T extends BaseSyntheticEvent>(
  block: (e: T) => any,
): ((e: T) => void) => {
  return (e) => {
    e.preventDefault();
    block(e);
  };
};

export const isBlank = (value: any): value is null | undefined => {
  if (value === "") {
    return true;
  }

  if (isNull(value)) {
    return true;
  }

  if (isUndefined(value)) {
    return true;
  }

  // noinspection RedundantIfStatementJS
  if (isArray(value) && isEmpty(value)) {
    return true;
  }

  return false;
};

export const isNotBlank = (value: any) => {
  return !isBlank(value);
};

export const removePrefix = (str: string, prefix: string) => {
  if (str.startsWith(prefix)) {
    return str.substring(prefix.length);
  }

  return str;
};

export const removeSuffix = (str: string, suffix: string) => {
  if (str.endsWith(suffix)) {
    return str.substring(0, str.length - suffix.length);
  }

  return str;
};

export const ignorePromise = <T>(block: () => Promise<T>) => {
  block().then(() => {});
};

export type NotNil<T> = T extends null | undefined | void ? never : T;

export function isNotNil<T>(value: T): value is NotNil<T> {
  return !isNil(value);
}

export function dateFormatter(
  datetime: Date | string | number | Moment | null | undefined,
  format: string = "YYYY-MM-DD",
): string {
  if (isNil(datetime)) {
    return "";
  }

  if (isNumber(datetime)) {
    return dateFormatter(moment(datetime), format);
  }

  if (isString(datetime)) {
    return dateFormatter(moment(datetime), format);
  }

  if (isDate(datetime)) {
    return dateFormatter(moment(datetime), format);
  }

  return datetime.format(format);
}

export function phoneNum(phone: string | null): string {
  if (isNil(phone)) {
    return "";
  }
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length > 11) {
    return "";
  }

  let matcher: RegExp = /^(\d{3})(\d{4})(\d{4})$/;
  if (cleaned.length === 10) {
    matcher = /^(\d{3})(\d{3})(\d{4})$/;
  }

  const match = cleaned.match(matcher);
  if (!match) {
    return "";
  }

  return `${match[1]}-${match[2]}-${match[3]}`;
}

export function phoneOnlyNumber(phone: string | null) {
  const newPhone = phoneNum(phone);

  if (isBlank(phone)) {
    return "";
  }

  return newPhone.replaceAll("-", "");
}

export function validatePk(pk: string | string[] | undefined): {
  isValid: boolean;
  pk: number | null;
} {
  if (isNil(pk) || isArray(pk)) {
    return { isValid: false, pk: null };
  }

  if (pk === NEWPK) {
    return { isValid: true, pk: null };
  }

  const numberPk = Number(pk);

  if (isNaN(numberPk)) {
    return { isValid: false, pk: null };
  }

  return { isValid: true, pk: numberPk };
}

export function editAlert(isNew: boolean) {
  return alert(isNew ? "등록 되었습니다." : "수정 되었습니다.");
}
