class Config {
  apiBaseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

  apiDelay: number = Number(process.env.NEXT_PUBLIC_API_DELAY ?? 0);

  google_client_id: string = process.env.NEXT_PUBLIC_GOOGLE_ID ?? "";
  google_secret_key: string = process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? "";
  kakao_client_id: string = process.env.NEXT_PUBLIC_KAKAO_ID ?? "";
  kakao_redirect_url: string = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL ?? "";
  naver_redirect_url: string = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL ?? "";
  naver_client_id: string = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ?? "";
  naver_state: string = process.env.NEXT_PUBLIC_NAVER_STATE ?? "";
}

export const baseConfig = new Config();
