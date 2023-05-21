export default () => ({
  NodeEnv: process.env.NODE_ENV ?? "",
  Version: process.env.VERSION ?? "1",
  ApiVersion: `/api/v${Math.floor(Number(process.env.VERSION ?? 1))}`,
  Port: process.env.PORT ?? 0,
  originUrl: process.env.ORIGINURL ?? "http://localhost:8080",
  Jwt: {
    Secret: process.env.JWT_SECRET ?? "",
    Exp: process.env.COOKIE_EXP ?? "", // exp at the same time as the cookie
  },
  OAuth: {
    google_id: process.env.GOOGLE_ID ?? "",
    google_key: process.env.GOOGLE_SECRET ?? "",
  },
  Swagger: {
    Json: process.env.SWAGGER_JSON ?? "",
  },
});
