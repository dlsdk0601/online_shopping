import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { isNil } from "lodash";
import { In, Like } from "typeorm";
import nodemailer, { Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Subscribe, SubscribeHistory } from "../../entities/subscribe.entity";
import errorMessage from "../../constant/errorMessage";
import { DeleteSubscribeReqDto } from "./dto/delete-subscribe.dto";
import {
  ShowSubscribeHistoryReqDto,
  SubscribeHistoryListReqDto,
  SubscribeHistoryListResDto,
  SubscribeListReqDto,
  SubscribeListResDto,
} from "./dto/show-subscribe.dto";
import { LIMIT } from "../../type/pagination.dto";
import { SubscribeSearchType } from "../../type/commonType";
import { AddSubscribeHistoryReqDto } from "./dto/add-subscribe-history.dto";
import { isNotNil } from "../../ex/ex";
import { User } from "../../entities/user.entity";
import { DeleteSubscribeHistoryReqDto } from "./dto/delete-subscribe-history.dto";
import { config } from "../../config";
import { ResendEmailReqDto } from "./dto/resend-email.dto";

@Injectable()
export class SubscribeService {
  transporter: Transporter<SMTPTransport.SentMessageInfo> | null = null;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth_user,
        pass: config.auth_pass,
      },
    });
  }

  async delete(body: DeleteSubscribeReqDto) {
    const subscribe = await Subscribe.findOne({
      where: {
        pk: body.pk,
      },
    });

    if (isNil(subscribe)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    try {
      await subscribe.softRemove();
      return { pk: subscribe.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  async list(body: SubscribeListReqDto) {
    let searchOption = {};

    if (isNil(body.searchType)) {
      searchOption = [{ name: Like(`%${body.search}%`) }, { email: Like(`%${body.search}%`) }];
    } else {
      searchOption = {
        name: body.searchType === SubscribeSearchType.NAME ? Like(`%${body.search}%`) : undefined,
        email: body.searchType === SubscribeSearchType.EMAIL ? Like(`%${body.search}%`) : undefined,
      };
    }

    const [subscribes, count] = await Subscribe.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      select: {
        pk: true,
        name: true,
        email: true,
        create_at: true,
      },
      where: searchOption,
    });

    if (isNil(subscribes)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return new SubscribeListResDto(subscribes, count, body.page);
  }

  async historyList(body: SubscribeHistoryListReqDto) {
    // TODO :: 검색
    const [histories, count] = await SubscribeHistory.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      select: {
        pk: true,
        title: true,
        send_time: true,
        is_send: true,
      },
    });

    if (isNil(histories)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return new SubscribeHistoryListResDto(histories, count, body.page);
  }

  async historyShow(body: ShowSubscribeHistoryReqDto) {
    const history = await SubscribeHistory.findOne({
      where: { pk: body.pk },
      relations: { users: true },
    });

    if (isNil(history)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: history.pk,
      title: history.title,
      body: history.body,
      isSend: history.is_send,
      sendAt: history.send_time,
      createAt: history.create_at,
      updateAt: history.update_at,
      users: history.users.map((item) => ({ pk: item.pk, name: item.name })),
      enableResend: history.enableResend,
    };
  }

  async selectSubscribes() {
    const subscribes = await Subscribe.find();

    return { list: subscribes.map((item) => [item.user.pk, item.name]) };
  }

  async addSubscribeHistory(body: AddSubscribeHistoryReqDto) {
    let subscribeHistory: SubscribeHistory | null = new SubscribeHistory();

    if (isNotNil(body.pk)) {
      subscribeHistory = await SubscribeHistory.findOne({
        where: {
          pk: body.pk,
          is_send: false,
        },
      });
    }

    if (isNil(subscribeHistory)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    try {
      subscribeHistory.title = body.title;
      subscribeHistory.body = body.body;
      subscribeHistory.send_time = body.sendDate;
      subscribeHistory.is_send = false;

      let users: User[];
      if (isNil(body.users)) {
        users = await User.find();
      } else {
        users = await User.find({ where: { pk: In(body.users) } });
      }

      subscribeHistory.users = users;
      await subscribeHistory.save();

      return { pk: subscribeHistory.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  async deleteSubscribeHistory(body: DeleteSubscribeHistoryReqDto) {
    const history = await SubscribeHistory.findOne({ where: { pk: body.pk } });

    if (isNil(history)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    try {
      history.users = []; // secondary 테이블에 데이터 모두 지운다.
      await history.softRemove();
      return { pk: history.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  // TODO :: 이메일 전송 API
  async sendEmail(body: ResendEmailReqDto) {
    if (isNil(this.transporter)) {
      throw new InternalServerErrorException(errorMessage.FAIL_SEND_EMAIL);
    }

    const subscribe = await SubscribeHistory.findOne({
      where: { pk: body.pk },
      relations: {
        users: {
          localUser: true,
          naverUser: true,
          kakaoUser: true,
          googleUser: true,
        },
      },
    });

    if (isNil(subscribe)) {
      throw new BadRequestException(errorMessage.NOT_FOUND_DATA);
    }

    const option: Mail.Options = {
      from: "no-reply@gmail.com",
      to: subscribe.users.map((user) => user.userData().email).join(", "),
      subject: subscribe.title,
      text: subscribe.body,
    };

    try {
      const res = await this.transporter.sendMail(option);
      if (isNil(res)) {
        return new InternalServerErrorException();
      }

      subscribe.is_send = true;
      await subscribe.save();
      return { result: true };
    } catch (e) {
      return { result: false };
    }
  }
}
