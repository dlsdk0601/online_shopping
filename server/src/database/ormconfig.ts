import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "../config";

// 두가지 설정에서 경로를 다르게 읽어서 따로 경로를 설정해준다.
const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: config.host,
  port: config.dbPort,
  username: config.username,
  password: config.password,
  database: config.database,
  synchronize: config.synchronize,
  migrationsTableName: "migrations",
  migrations: ["migrations/*.ts"],
  entities: ["src/**/*.entity.ts"],
  logging: config.logging,
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...dataSourceOptions,
  migrations: [`${__dirname}/**/*.ts`],
  entities: [`${__dirname}/**/*.entity.ts`],
  autoLoadEntities: config.autoLoadEntities,
};

export default new DataSource(dataSourceOptions);
