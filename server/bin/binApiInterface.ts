import { generateApi } from "swagger-typescript-api";
import path from "path";
import prettier from "prettier";
import fs from "fs";
import { ignorePromise } from "../src/ex/ex";

async function transformInterface(input: string, filePath: string) {
  const data = await generateApi({
    // url: `${constant().originUrl}/swagger-json`,
    input,
    httpClientType: "axios",
    output: false,
    templates: "./admin/src",
    generateClient: false,
    generateResponses: false,
    toJS: false,
    extractRequestBody: true,
    defaultResponseType: "any",
    enumNamesAsValues: true,
    modular: true,
    hooks: {
      onParseSchema: (originalSchema, parsedSchema) => {
        if (originalSchema.type === "json") {
          // eslint-disable-next-line no-param-reassign
          parsedSchema.content = "JSON";
        }

        return parsedSchema;
      },
    },
  });

  const ts = Array<string>();
  ts.push("/* tslint:disable */");
  ts.push("/* eslint-disable */");
  ts.push(`// 자동 생성 파일 수정하지 말것 ${new Date().toString()}`);

  data.files.forEach((item) => {
    ts.push(item.content.replace(/Dto/g, ""));
  });
  const targetPath = path.join(__dirname, "..", "..", filePath);
  const tsFormatted = prettier.format(ts.join("\n"), { filepath: targetPath });
  fs.writeFileSync(targetPath, tsFormatted);
}

ignorePromise(() => transformInterface("./front-api.json", "front/src/api/type.g.ts"));
ignorePromise(() => transformInterface("./admin-api.json", "admin/src/api/type.g.ts"));
