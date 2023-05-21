import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

// 비동기
export function getHash(pwd: string): Promise<string> {
  return bcrypt.hash(pwd, SALT_ROUNDS);
}

// 동기
export function hashSync(pwd: string): string {
  return bcrypt.hashSync(pwd, SALT_ROUNDS);
}

export function compare(pwd: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pwd, hash);
}
