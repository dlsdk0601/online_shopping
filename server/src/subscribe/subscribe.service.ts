import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { AddSubscribeReqDto } from "./dto/add-subscribe.dto";
import { Subscribe } from "../entities/subscribe.entity";
import errorMessage from "../config/errorMessage";
import { DeleteSubscribeReqDto } from "./dto/delete-subscribe.dto";
import { SubScribeListReqDto, SubscribeListResDto } from "./dto/show-subscribe.dto";
import { LIMIT } from "../type/pagination.dto";

@Injectable()
export class SubscribeService {
  constructor() {}

  async create(body: AddSubscribeReqDto, userPk: number | null) {
    if (isNil(userPk)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    const subscribe = new Subscribe();
    subscribe.name = body.name;
    subscribe.email = body.email;
    subscribe.user_pk = userPk;

    try {
      await subscribe.save();
      return { pk: subscribe.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.SUBSCRIBE_ADD_FAILED);
    }
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

  async list(body: SubScribeListReqDto) {
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
}
