import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

class Config {
  // API
  NodeEnv = configService.get<string>("NODE_ENV") ?? "";
  version = configService.get<string>("VERSION") ?? "1";
  port = configService.get<number>("PORT") ?? 8080;
  originUrl = configService.get<string>("ORIGINURL") ?? "http://localhost:8080";

  // jwt
  secret = configService.get<string>("JWT_SECRET") ?? "";
  exp = configService.get<string>("EXP") ?? "";

  // GOOGLE OAuth
  googleId = configService.get<string>("GOOGLE_ID") ?? "";
  googleKey = configService.get<string>("GOOGLE_SECRET") ?? "";
  googleClientRedirectUrl =
    configService.get<string>("GOOGLE_CLIENT_REDIRECT_URL") ??
    "http://localhost:3000/callback/google";

  // KAKAO OAuth
  kakaoId = configService.get<string>("KAKAO_ID") ?? "";
  kakaoCodeVerifyUri = configService.get<string>("KAKAO_CODE_VERIFY_URI") ?? "";
  KakaoGetUserUri = configService.get<string>("KAKAO_GET_USER_URI") ?? "";
  KakaoFrontRedirect =
    configService.get<string>("KAKAO_FRONT_REDIRECT") ?? "http://localhost:3000/redirect/kakao";

  // Naver OAuth
  naverGetUserUri = configService.get<string>("NAVER_GET_USER_URI") ?? "";
  naverCodeVerifyUri = configService.get<string>("NAVER_CODE_VERIFY_URI") ?? "";
  naverRedirectUrl =
    configService.get<string>("NAVER_REDIRECT_URL") ?? "http://localhost:3000/redirect/naver";
  naverClientId = configService.get<string>("NAVER_CLIENT_ID") ?? "";
  naverClientSecretKey = configService.get<string>("NAVER_CLIENT_SECRET_KEY") ?? "";

  // Swagger
  swaggerJson = configService.get("SWAGGER_JSON") ?? "http://localhost:8080/swagger-json";

  // AWS
  awsAccessKey = configService.get<string>("AWS_ACCESS_KEY") ?? "";
  awsSecretKey = configService.get<string>("AWS_SECRET_KEY") ?? "";
  awsBucketName = configService.get<string>("AWS_BUCKET_NAME") ?? "";
  awsRegion = configService.get<string>("AWS_REGION") ?? "";

  // TOSS PAY
  tossPaymentClientApiKey = configService.get("TOSS_PAYMENT_CLIENT_API_KEY") ?? "";
  tossPaymentSecretKey = configService.get("TOSS_PAYMENT_SECRET_KEY") ?? "";
  tossPaymentCallbackUrl = configService.get("TOSS_PAYMENT_CALLBACK_URL") ?? "";
  tossPaymentResultUrl = configService.get("TOSS_PAYMENT_RESULT_URL") ?? "";
  tossPaymentFailUrl = configService.get("TOSS_PAYMENT_FAIL_URL") ?? "";

  // DB
  type = configService.get<string>("DB_TYPE") ?? "postgres";
  host = configService.get<string>("POSTGRES_HOST") ?? "localhost";
  dbPort = configService.get<number>("POSTGRES_PORT") ?? 5432;
  username = configService.get<string>("POSTGRES_USERNAME") ?? "postgres";
  password = configService.get<string>("POSTGRES_PASSWORD") ?? "";
  database = configService.get<string>("POSTGRES_DATABASE") ?? "online_shopping";
  synchronize = configService.get<boolean>("POSTGRES_SYNCHRONIZE") ?? false; // 자동 entity sync 화
  logging = configService.get<boolean>("POSTGRES_LOGGING") ?? true;
  autoLoadEntities = true; // 엔티티 자동 등록

  // EMAIL
  service = configService.get<string>("MAILER_SERVICE") ?? "";
  auth_user = configService.get<string>("MAILER_AUTH_USER") ?? "";
  auth_pass = configService.get<string>("MAILER_AUTH_PASS") ?? "";

  get apiVersion() {
    return `/api/v${Math.floor(Number(this.version ?? 1))}`;
  }
}

export const config = new Config();
