import { baseConfig } from "./config";

export const queryKeys = {
  user: "user",
  token: "token",
};

export const ATOM_KEY = {
  TOKEN: "TOKEN",
  USER: "USER",
  TOKEN_MODEL: "TOKEN_MODEL",
  API_IS_LOADING: "API_IS_LOADING",
};

export const CONSTANT = {
  sessionTokenKey: "X-ACCESS-TOKEN",
};

export const SNS_URL = {
  google_client: "https://accounts.google.com/gsi/client",
  kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${baseConfig.kakao_client_id}&redirect_uri=${baseConfig.kakao_redirect_url}&response_type=code`,
  naver: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${baseConfig.naver_client_id}&redirect_uri=${baseConfig.naver_redirect_url}&state=${baseConfig.naver_state}`,
};
