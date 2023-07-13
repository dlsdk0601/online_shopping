import { isString } from "lodash";

export function toLowerCase(value: string): string {
  return value.toLowerCase();
}

export function trim(value: string): string {
  return value.trim();
}

export function toDate(value: string): Date {
  return new Date(value);
}

export function toBoolean(value: string): boolean {
  const strValue = value.toLowerCase();

  return strValue === "true" || strValue === "1";
}

export function toNumber(value: any, option: { default: number }): number {
  if (!isString(value)) {
    return option.default;
  }

  const newValue: number = parseInt(value, 10);

  if (isNaN(newValue)) {
    return option.default;
  }

  return newValue;
}
