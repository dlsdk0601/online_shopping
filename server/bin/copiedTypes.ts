import path from "path";
import fs from "fs";

const serverTypesPath = path.join(__dirname, "..", "/src/type/commonType.ts");
const errorMessagePath = path.join(__dirname, "..", "/src/constant/errorMessage.ts");
const adminTypePath = path.join(__dirname, "..", "..", "admin/src/api/enum.g.ts");
const frontTypePath = path.join(__dirname, "..", "..", "front/src/api/enum.g.ts");
const frontErrorMessagePath = path.join(__dirname, "..", "..", "front/src/api/errorMessage.g.ts");
fs.copyFileSync(serverTypesPath, adminTypePath);
fs.copyFileSync(serverTypesPath, frontTypePath);
fs.copyFileSync(errorMessagePath, frontErrorMessagePath);
