import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { isNil } from "lodash";
import Manager from "../entities/manager.entity";
import { AddManagerReqDto } from "./dto/add-manager.dto";
import { LIMIT } from "../type/pagination.dto";
import { ManagerListResDto } from "./dto/show-manager.dto";
import errorMessage from "../config/errorMessage";
import { EditManagerReqDto } from "./dto/edit-manager.dto";
import { getHash } from "../ex/bcryptEx";

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private manager: Repository<Manager>
  ) {}

  async addManager(body: AddManagerReqDto) {
    const isExist = await this.manager.findOne({ where: { id: body.id } });

    if (isNil(isExist)) {
      throw new BadRequestException(errorMessage.ALREADY_USER_EXIST);
    }

    const manager = this.manager.create({
      name: body.name,
      email: body.email,
      id: body.id,
      password_hash: body.password,
    });

    console.log(manager.pk); // 이거 찍힐까?
    try {
      await this.manager.save(manager);

      return manager.pk;
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.SIGN_UP_FAILED);
    }
  }

  async findAll(page: number) {
    const [managers, total] = await this.manager.findAndCount({
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
    const manager = await this.manager.findOne({
      where: { pk },
      relations: { authentications: true },
    });

    if (isNil(manager)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    return manager;
  }

  async findOneOrNull(pk: number) {
    return this.manager.findOne({ where: { pk }, relations: { authentications: true } });
  }

  async findById(id: string) {
    return this.manager.findOne({ where: { id }, relations: { authentications: true } });
  }

  async update(req: EditManagerReqDto) {
    const manager = await this.findOneOr404(req.pk);

    manager.id = req.id;
    manager.password_hash = await getHash(req.password);
    manager.name = req.name;
    manager.email = req.email;
    manager.type = req.type;

    try {
      await this.manager.save(manager);
      return manager.pk;
    } catch (e) {
      throw new ConflictException(errorMessage.UPDATE_FAILED);
    }
  }

  async remove(pk: number) {
    const manager = await this.findOneOr404(pk);

    try {
      await this.manager.softDelete(manager.pk);
      return manager.pk;
    } catch (e) {
      throw new ConflictException(errorMessage.UPDATE_FAILED);
    }
  }
}
