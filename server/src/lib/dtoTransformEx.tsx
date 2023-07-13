import { BadRequestException } from "@nestjs/common";
import errorMessage from "../config/errorMessage";

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

export function toNumber(value: string): number {
  const newValue: number = parseInt(value, 10);

  if (isNaN(newValue)) {
    throw new BadRequestException(errorMessage.BAD_REQUEST);
  }

  return newValue;
}
