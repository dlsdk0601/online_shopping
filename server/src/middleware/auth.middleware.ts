import { NextFunction, Request, Response } from "express";
import { isNil } from "lodash";
import { UnauthorizedException } from "@nestjs/common";
import { Between } from "typeorm";
import moment from "moment";
import Authentication from "../entities/manager-authentication.entity";
import errorMessage from "../config/errorMessage";
import { getDeviceInfo } from "../ex/ex";

export async function middle(req: Request, res: Response, next: NextFunction) {
  if (!req.path.includes("admin")) {
    // front
    // front 에서는 필요한 API 에서만 useGuard 를 사용
    return next();
  }

  if (req.path.includes("sign-in")) {
    // admin login
    return next();
  }

  // 어드민에서 모든 API 에 useGuard 하기 귀찮으니까 admin 은 여기서 한번에 처리한다.
  const bearerToken = req.headers.authorization ?? null;

  if (isNil(bearerToken)) {
    throw new UnauthorizedException(errorMessage.NOT_AUTHENTICATE);
  }

  const token = bearerToken.split(" ")[1];
  const auth = await Authentication.findOneBy({
    token,
    expired_at: Between(new Date(), moment().add("7", "d").toDate()),
  });

  if (isNil(auth)) {
    throw new UnauthorizedException(errorMessage.NOT_AUTHENTICATE);
  }

  if (!(auth.device === getDeviceInfo(req) || auth.ip === req.ip)) {
    throw new UnauthorizedException(errorMessage.NOT_AUTHENTICATE);
  }

  next();
}
