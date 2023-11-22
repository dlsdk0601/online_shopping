import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { isNil } from "lodash";
import { config } from "../config";

export function decodeToken<T>(jwt: string): JwtPayload | string | undefined {
  const payload = jsonwebtoken.verify(jwt, config.exp);

  if (isNil(payload)) {
    return;
  }

  return payload;
}

export function generateJWT(data: string | object | Buffer): string | undefined {
  const jwt = jsonwebtoken.sign(data, config.secret, { expiresIn: config.exp });

  if (isNil(jwt)) {
    return;
  }

  return jwt;
}
