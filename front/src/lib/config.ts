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
  toss_client_key: string =
    process.env.NEXT_PUBLIC_TOSS_PAYMENT_CLIENT_KEY ?? "test_ck_DpexMgkW36m7oJewMgw8GbR5ozO0";
  toss_secret_key: string =
    process.env.NEXT_PUBLIC_TOSS_PAYMENT_SECRET_KEY ?? "test_sk_LkKEypNArWQ1Lv9aaPe3lmeaxYG5";
}

export const baseConfig = new Config();
