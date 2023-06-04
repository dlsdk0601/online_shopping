import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";
import constant from "../config/constant";

export const setupSwagger = (app: INestApplication) => {
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
};
