import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { writeFileSync } from "fs";
import constant from "../config/constant";
import { FrontAppModule } from "../front/front.module";
import { AdminAppModule } from "../admin/admin.module";

export const setupSwagger = async (app: INestApplication) => {
  const frontApp = await NestFactory.create(FrontAppModule);
  const adminApp = await NestFactory.create(AdminAppModule);

  // Swagger options 설정
  const options = new DocumentBuilder()
    .setTitle("online-shopping")
    .setDescription("Boiler-Plate API")
    .setVersion(constant().Version)
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
      },
      "access-token"
    )
    .build();

  // Swagger setup
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);
  writeFileSync("./api.json", JSON.stringify(document), {
    encoding: "utf-8",
  });

  const frontDocument = SwaggerModule.createDocument(frontApp, options);
  writeFileSync("./front-api.json", JSON.stringify(frontDocument), {
    encoding: "utf-8",
  });

  const adminDocument = SwaggerModule.createDocument(adminApp, options);
  writeFileSync("./admin-api.json", JSON.stringify(adminDocument), {
    encoding: "utf-8",
  });
};
