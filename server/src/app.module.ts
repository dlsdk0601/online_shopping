import { Module } from "@nestjs/common";
import { FrontAppModule } from "./front/front.module";
import { AdminAppModule } from "./admin/admin.module";

@Module({
  imports: [AdminAppModule, FrontAppModule],
})
export class AppModule {}
