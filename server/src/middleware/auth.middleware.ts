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
    return next();
  }

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
