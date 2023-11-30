import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AddSubscribeReqDto } from "./dto/add-subscribe.dto";
import errorMessage from "../../constant/errorMessage";
import { Subscribe } from "../../entities/subscribe.entity";
import { User } from "../../entities/user.entity";

@Injectable()
export class SubscribeService {
  constructor() {}

  async create(body: AddSubscribeReqDto, user: User) {
    const subscribe = new Subscribe();
    subscribe.name = body.name;
    subscribe.email = body.email;
    subscribe.user = user;

    try {
      await subscribe.save();
      return { pk: subscribe.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.SUBSCRIBE_ADD_FAILED);
    }
  }
}
