import dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";

dotenv.config();

const configService = new ConfigService();

// 두가지 설정에서 경로를 다르게 읽어서 따로 경로를 설정해준다.
const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: configService.get<string>("POSTGRES_HOST"),
  port: configService.get<number>("POSTGRES_PORT"),
  username: configService.get<string>("POSTGRES_USERNAME"),
  password: configService.get<string>("POSTGRES_PASSWORD"),
  database: configService.get<string>("POSTGRES_DATABASE"),
  synchronize: Boolean(configService.get<boolean>("POSTGRES_SYNCHRONIZE")),
  migrationsTableName: "migrations",
  migrations: ["migrations/*.ts"],
  entities: ["src/**/*.entity.ts"],
  logging: Boolean(configService.get<boolean>("POSTGRES_LOGGING")),
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...dataSourceOptions,
  migrations: [`${__dirname}/**/*.ts`],
  entities: [`${__dirname}/**/*.entity.ts`],
  autoLoadEntities: true,
};

export default new DataSource(dataSourceOptions);
