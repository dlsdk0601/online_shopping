import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { FrontAppModule } from "./front/front.module";
import { AdminAppModule } from "./admin/admin.module";
import { TasksService } from "./task.service";

@Module({
  imports: [ScheduleModule.forRoot(), AdminAppModule, FrontAppModule],
  providers: [TasksService],
})
export class AppModule {}
