import { generateApi } from "swagger-typescript-api";
import constant from "../src/config/constant";
import path from "path";
import prettier from "prettier";
import fs from "fs";
import { ignorePromise } from "../src/ex/ex";

// TODO :: front / admin 분리해서 생성해주기
// 일단 admin, front 두군데 똑같은 파일을 만든다. 나중에 지워주는 식으로 해결
async function transformInterface() {
  const data = await generateApi({
    url: `${constant().originUrl}/swagger-json`,
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

  const adminTargetPath = path.join(__dirname, "..", "..", "admin/src/api/type.g.ts");
  const frontTargetPath = path.join(__dirname, "..", "..", "front/src/api/type.g.ts");
  const adminTsFormatted = prettier.format(ts.join("\n"), { filepath: adminTargetPath });
  const frontTsFormatted = prettier.format(ts.join("\n"), { filepath: frontTargetPath });
  fs.writeFileSync(adminTargetPath, adminTsFormatted);
  fs.writeFileSync(frontTargetPath, frontTsFormatted);
}

ignorePromise(() => transformInterface());
