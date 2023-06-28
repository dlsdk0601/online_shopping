import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import "reflect-metadata";
import { json, urlencoded } from "body-parser";
import { AppModule } from "./app.module";
import constant from "./config/constant";
import { ExceptionEx } from "./ex";
import { getApiList } from "../bin/binApiUrl";
import { setupSwagger } from "./lib/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors 활성
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // 모든 request 에 validation 작업
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //  페이로드와 DTO 클래스를 비교해 수신해서는 안되는 속성을 자동으로 제거하는 옵션(유효성이 검사된 객체만 수신)
      transform: true, // 네트워크를 통해 받는 페이로드가 DTO 클래스에 따라 지정된 개체로 자동 변환되도록 하는 옵션
      forbidNonWhitelisted: true, // 허용하지 않은 속성을 제거하는 대신 예외를 throw 하는 옵션
    })
  );

  // entity 용량을 키워준다. (entity 가 커지면 막히기 때문에)
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ limit: "50mb", extended: true }));

  // api path prefix
  app.setGlobalPrefix(constant().ApiVersion);

  // global exception 처리
  app.useGlobalFilters(new ExceptionEx());

  // swagger
  setupSwagger(app);

  await app.listen(constant().Port);

  const server = app.getHttpServer();
  return server._events.request._router;
}

bootstrap().then((server) => {
  getApiList(server);
});
