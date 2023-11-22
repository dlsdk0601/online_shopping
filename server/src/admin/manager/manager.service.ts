import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { isNil } from "lodash";
import { AddManagerReqDto } from "./dto/add-manager.dto";
import { LIMIT } from "../../type/pagination.dto";
import { ManagerListResDto } from "./dto/show-manager.dto";
import errorMessage from "../../constant/errorMessage";
import { EditManagerReqDto } from "./dto/edit-manager.dto";
import { getHash } from "../../ex/bcryptEx";
import Manager from "../../entities/manager.entity";

@Injectable()
export class ManagerService {
  constructor() {}

  async addManager(body: AddManagerReqDto) {
    const isExist = await Manager.findOne({ where: { id: body.id } });

    if (isNil(isExist)) {
      throw new BadRequestException(errorMessage.ALREADY_USER_EXIST);
    }

    const manager = new Manager();

    manager.name = body.name;
    manager.email = body.email;
    manager.id = body.id;
    manager.password_hash = body.password;

    try {
      await manager.save();

      return manager.pk;
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.SIGN_UP_FAILED);
    }
  }

  async findAll(page: number) {
    const [managers, total] = await Manager.findAndCount({
      take: LIMIT,
      skip: LIMIT * (page - 1),
      select: {
        pk: true,
        id: true,
        name: true,
        create_at: true,
      },
    });

    return new ManagerListResDto(managers, total, page);
  }

  async findOneOr404(pk: number) {
    const manager = await Manager.findOne({
      where: { pk },
      relations: { authentications: true },
    });

    if (isNil(manager)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    return manager;
  }

  async findOneOrNull(pk: number) {
    return Manager.findOne({ where: { pk }, relations: { authentications: true } });
  }

  async findById(id: string) {
    return Manager.findOne({ where: { id }, relations: { authentications: true } });
  }

  async update(req: EditManagerReqDto) {
    const manager = await this.findOneOr404(req.pk);

    manager.id = req.id;
    manager.password_hash = await getHash(req.password);
    manager.name = req.name;
    manager.email = req.email;
    manager.type = req.type;

    try {
      await manager.save();
      return manager.pk;
    } catch (e) {
      throw new ConflictException(errorMessage.UPDATE_FAILED);
    }
  }

  async remove(pk: number) {
    const manager = await this.findOneOr404(pk);

    try {
      await manager.softRemove();
      return manager.pk;
    } catch (e) {
      throw new ConflictException(errorMessage.UPDATE_FAILED);
    }
  }
}
