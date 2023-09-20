import { camelCase, compact, isNil, uniq } from "lodash";
import path from "path";
import fs from "fs";
import prettier from "prettier";

export interface ApiItem {
  route: {
    path: string;
    method: string;
  };
}

type OriginType = "FRONT" | "ADMIN";

const exceptApiList = ["_", ":fileName", "callback"];

export function getApiList(router) {
  const adminRoutes: ApiItem[] = [];
  const frontRoutes: ApiItem[] = [];
  router.stack.forEach((layer) => {
    if (isNil(layer.route)) {
      return;
    }

    if (layer.route.path.includes("swagger")) {
      return;
    }

    if (layer.route.path.includes("asset")) {
      adminRoutes.push({
        route: {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        },
      });
      frontRoutes.push({
        route: {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        },
      });
      return;
    }

    if (layer.route.path.includes("admin")) {
      adminRoutes.push({
        route: {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        },
      });
    } else {
      frontRoutes.push({
        route: {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        },
      });
    }
  });

  binApiUrl(compact(adminRoutes), "ADMIN");
  binApiUrl(compact(frontRoutes), "FRONT");
}

function generateSources(apis: ApiItem[], type: OriginType): string[] {
  return apis.map((api) => generateSource(api, type));
}

function generateImports(apis: ApiItem[], type: OriginType): string {
  const apiArray = uniq(apis.map((api) => generateImport(api, type)).flat());
  return apiArray.join(",");
}

function generateSource(api: ApiItem, type: OriginType): string {
  const apiName = apiNameHandle(api.route.path);
  if (exceptApiList.includes(apiName)) {
    return "";
  }

  if (apiName.includes("auth")) {
    const key = camelCase(apiName);
    const capital = capitalTransform(key);
    const res = type === "ADMIN" ? `${capital}ManagerRes` : `${capital}UserRes`;
    return `${key}= this.build<${capital}Req, ${res}>("${api.route.path}");`;
  }

  const key = camelCase(apiName);
  const capital = capitalTransform(key);
  const method = selectMethod(api.route.method);
  return `${key}= ${method}<${capital}Req, ${capital}Res>("${api.route.path}");`;
}

function generateImport(api: ApiItem, type: OriginType): string[] {
  const apiName = apiNameHandle(api.route.path);
  if (exceptApiList.includes(apiName)) {
    return [];
  }
  if (apiName.includes("auth")) {
    const camel = camelCase(apiName);
    const capital = capitalTransform(camel);
    const res = type === "FRONT" ? `${capital}UserRes` : `${capital}ManagerRes`;
    return [`${capital}Req`, res];
  }
  const camel = camelCase(apiName);
  const capital = capitalTransform(camel);
  return [`${capital}Req`, `${capital}Res`];
}

function capitalTransform(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function selectMethod(method: string): string {
  switch (method) {
    case "get":
      return "this.getBuild";
    case "delete":
      return "this.deleteBuild";
    case "put":
      return "this.putBuild";
    case "post":
    default:
      return "this.build";
  }
}

function apiNameHandle(path: string): string {
  const pathArray = path.split("/");
  const apiName = pathArray[pathArray.length - 1];

  if (apiName === ":pk") {
    return pathArray[pathArray.length - 2];
  }

  return apiName;
}

function binApiUrl(list: ApiItem[], type: OriginType) {
  const ts = Array<string>();
  ts.push("/* tslint:disable */");
  ts.push("/* eslint-disable */");
  ts.push("import { ApiBase } from './index';");
  ts.push(`import {${generateImports(list, type)}} from "./type.g";`);
  ts.push(`// 자동 생성 파일 수정하지 말것 ${new Date().toString()}`);
  ts.push("export class GeneratedApis extends ApiBase {");
  ts.push(...generateSources(list, type));
  ts.push("};");
  ts.push("export const api = new GeneratedApis();");

  let targetPath: string;
  let tsFormatted: string;
  if (type === "FRONT") {
    targetPath = path.join(__dirname, "..", "..", "..", "front/src/api/url.g.ts");
    tsFormatted = prettier.format(ts.join("\n"), { filepath: targetPath });
  } else {
    targetPath = path.join(__dirname, "..", "..", "..", "admin/src/api/url.g.ts");
    tsFormatted = prettier.format(ts.join("\n"), { filepath: targetPath });
  }
  fs.writeFileSync(targetPath, tsFormatted);
}
