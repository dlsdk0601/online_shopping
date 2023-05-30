import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { isNil } from "lodash";
import { User } from "../entities/user.entity";
import { LIMIT } from "../type/pagination.dto";
import { UserListReqDto, UserListResDto } from "./dto/show-user.dto";
import errorMessage from "../config/errorMessage";
import { EditUserReqDto } from "./dto/edit-user.dto";
import { LocalUser } from "../entities/local-user.entity";
import { isNotBlank } from "../ex/ex";
import { UserSearchType } from "../type/commonType";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(LocalUser)
    private localUser: Repository<LocalUser>
  ) {}

  async getUserList(req: UserListReqDto) {
    // TODO :: 검색
    // let users: User[] | null = null;
    let where = {};
    if (isNotBlank(req.search)) {
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

    console.log(users);

    if (isNil(users)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return new UserListResDto(users, users.length, req.page);
  }

  async findOneOr404(pk: number) {
    const user = await LocalUser.findOne({
      where: { pk },
      relations: { auth: true, user: true },
    });

    if (isNil(user)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    return user;
  }

  async findOneOrNull(pk: number) {
    return User.findOne({ where: { pk } });
  }

  async update(updateUserDto: EditUserReqDto) {
    const localUser = await this.findOneOr404(updateUserDto.pk);

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
    const localUser = await this.findOneOr404(pk);

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
