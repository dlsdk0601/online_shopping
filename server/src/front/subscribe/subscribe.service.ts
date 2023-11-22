import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { AddSubscribeReqDto } from "./dto/add-subscribe.dto";
import errorMessage from "../../constant/errorMessage";
import { Subscribe } from "../../entities/subscribe.entity";

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
}
