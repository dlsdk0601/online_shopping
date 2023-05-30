import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { camelCase, isNil } from "lodash";
import { User } from "../entities/user.entity";
import { LIMIT } from "../type/pagination.dto";
import { UserListReqDto, UserListResDto } from "./dto/show-user.dto";
import errorMessage from "../config/errorMessage";
import { EditUserReqDto } from "./dto/edit-user.dto";
import { LocalUser } from "../entities/local-user.entity";
import { isNotNil } from "../ex/ex";
import { UserSearchType } from "../type/commonType";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(LocalUser)
    private localUser: Repository<LocalUser>
  ) {}

  async getUserList(req: UserListReqDto) {
    // TODO :: 검색
    let where = {};
    if (isNotNil(req.search)) {
      where = {
        name: req.searchType === UserSearchType.NAME ? Like(`${req.search}`) : undefined,
        phone: req.searchType === UserSearchType.PHONE ? Like(`${req.search}`) : undefined,
      };
    }

    const users = await User.find({
      take: LIMIT,
      skip: LIMIT * (req.page - 1),
      select: {
        pk: true,
        name: true,
        phone: true,
        create_at: true,
        type: true,
        googleUser: { email: true },
        kakaoUser: { email: true },
        naverUser: { email: true },
        localUser: { email: true },
      },
      ...where,
    });

    if (isNil(users)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return new UserListResDto(users, users.length, req.page);
  }

  async findLocalUserOneOr404(pk: number) {
    const user = await LocalUser.findOne({
      where: { pk },
      relations: { user: true },
    });

    if (isNil(user)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    return user;
  }

  async findUserOneOr404(pk: number) {
    const user = await User.findOne({
      where: { pk },
      relations: { localUser: true, googleUser: true, kakaoUser: true, naverUser: true },
    });

    if (isNil(user)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }
    const userType = camelCase(`${user.type.toLowerCase()}User`);
    return {
      pk: user.pk,
      name: user.name,
      phone: user.phone,
      create_at: user.create_at,
      type: user.type,
      email: user[userType].email,
    };
  }

  async findOneOrNull(pk: number) {
    return User.findOne({ where: { pk } });
  }

  async update(updateUserDto: EditUserReqDto) {
    const localUser = await this.findLocalUserOneOr404(updateUserDto.pk);

    localUser.id = updateUserDto.id;
    localUser.email = updateUserDto.email;
    localUser.user.name = updateUserDto.name;
    localUser.password_hash = updateUserDto.password;
    localUser.user.phone = updateUserDto.phone;

    try {
      await LocalUser.save(localUser);
      return localUser.pk;
    } catch (e) {
      throw new ConflictException(errorMessage.UPDATE_FAILED);
    }
  }

  async remove(pk: number) {
    const localUser = await this.findLocalUserOneOr404(pk);

    try {
      await this.localUser.softDelete(localUser.pk);
      return localUser.pk;
    } catch (e) {
      throw new ConflictException(errorMessage.UPDATE_FAILED);
    }
  }

  async findById(id: string) {
    return LocalUser.findOneBy({ id });
  }
}
