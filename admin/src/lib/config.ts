class Config {
  apiBaseUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

  apiDelay: number = Number(process.env.NEXT_PUBLIC_API_DELAY ?? 0);
}

export const baseConfig = new Config();
