import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// 이 미들 웨어 자체를 jwt validate 에 넣어도 되지 않을까?
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    // TODO :: 프로젝트 마다 설정 따로 해주기
    next();
  }
}
