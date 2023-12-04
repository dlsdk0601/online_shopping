import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import moment from "moment";
import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import { isNil } from "lodash";
import { SubscribeHistory } from "./entities/subscribe.entity";
import { config } from "./config";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private transporter = nodemailer.createTransport({
    service: config.service,
    auth: {
      user: config.auth_user,
      pass: config.auth_pass,
    },
  });

  @Cron(CronExpression.EVERY_DAY_AT_7AM, {
    name: "send-mail",
    timeZone: "Asia/Seoul",
  }) // 매일 아침 7시
  async sendEmail() {
    this.logger.log("::::::: send email start :::::::");

    const today = moment();
    const subscribeHistory = await SubscribeHistory.find({
      where: { send_time: today.toDate() },
      relations: { users: { localUser: true, googleUser: true, kakaoUser: true, naverUser: true } },
    });

    for (let i = 0; i < subscribeHistory.length; i++) {
      const history = subscribeHistory[i];
      const options: Mail.Options = {
        from: "no-reply@gmail.com",
        to: history.users.map((user) => user.userData().email).join(", "),
        subject: history.title,
        text: history.body,
      };

      const res = await this.transporter.sendMail(options);

      if (isNil(res)) {
        this.logger.error(`Sending Email failed: ${history.pk}-${history.title}`);
      }

      history.is_send = true;
      await history.save();
    }

    this.logger.log("::::::: send email end :::::::");
  }
}
