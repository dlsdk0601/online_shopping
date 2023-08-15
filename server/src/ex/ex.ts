import { isArray, isEmpty, isNil, isNull, isUndefined } from "lodash";
import moment from "moment/moment";
import { CustomRequest } from "../type/type";
import { detector } from "./detectorEx";

export type NotNil<T> = T extends null | undefined | void ? never : T;

export function getRandomInt(): number {
  return Math.floor(Math.random() * 1_000_000_000_000);
}

export function tick(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

export function removePrefix(str: string, prefix: string) {
  if (str.startsWith(prefix)) {
    return str.substring(prefix.length);
  }
  return str;
}

export function removeSuffix(str: string, suffix: string) {
  if (str.endsWith(suffix)) {
    return str.substring(0, str.length - suffix.length);
  }
  return str;
}

export function isBlank(value: any): value is null | undefined {
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
}

export function isNotBlank(value: any): value is NotNil<any> {
  return !isBlank(value);
}

export function isNotNil<T>(value: T): value is NotNil<T> {
  return !isNil(value);
}

export const ignorePromise = <T>(block: () => Promise<T>) => {
  block().then(() => {});
};

export const getDeviceInfo = (req: CustomRequest) => {
  const userAgent = req.headers["user-agent"];

  if (isNil(userAgent)) {
    return "";
  }

  const detect = detector.detect(userAgent);

  return `${detect.device.brand}_${detect.device.type}`;
};

export const range = (length: number) => {
  return Array.from({ length }).map((_, index) => index + 1);
};

export const getLastAuth = (authList: any[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return (authList ?? []).find((item) => moment(item.expired_at).isAfter(new Date()));
};

export const makeOrderCode = (index = 7): string => {
  // 대문자 영문
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
  // timestamp
  const timeStamp = Date.now().toString();

  let randomstring = "";
  for (let i = 0; i < index; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(randomIndex, randomIndex + 1);
  }

  return randomstring + timeStamp;
};
