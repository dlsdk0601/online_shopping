import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { isNil } from "lodash";
import constant from "../config/constant";

export function decodeToken<T>(jwt: string): JwtPayload | string | undefined {
  const payload = jsonwebtoken.verify(jwt, constant().Jwt.Exp);

  if (isNil(payload)) {
    return;
  }

  return payload;
}

export function generateJWT(data: string | object | Buffer): string | undefined {
  const jwt = jsonwebtoken.sign(data, constant().Jwt.Secret, { expiresIn: constant().Jwt.Exp });

  if (isNil(jwt)) {
    return;
  }

  return jwt;
}
