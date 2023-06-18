import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { Subscribe, SubscribeHistory } from "../../entities/subscribe.entity";
import errorMessage from "../../config/errorMessage";
import { DeleteSubscribeReqDto } from "./dto/delete-subscribe.dto";
import {
  ShowSubscribeHistoryReqDto,
  SubscribeHistoryListReqDto,
  SubscribeHistoryListResDto,
  SubscribeListReqDto,
  SubscribeListResDto,
} from "./dto/show-subscribe.dto";
import { LIMIT } from "../../type/pagination.dto";

@Injectable()
export class SubscribeService {
  constructor() {}

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
    const [subscribes, count] = await Subscribe.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      select: {
        pk: true,
        name: true,
        email: true,
        create_at: true,
      },
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
    const history = await SubscribeHistory.findOne({ where: { pk: body.pk } });

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
    };
  }
}
