import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HttpService } from "./http.service";
import { HttpServiceLog } from "../../entities/http-log.entity";

@Module({
  imports: [TypeOrmModule.forFeature([HttpServiceLog])],
  providers: [HttpService],
})
export class HttpModule {}
