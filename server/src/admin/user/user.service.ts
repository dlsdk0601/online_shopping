import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { isNil } from "lodash";
import { User } from "../../entities/user.entity";
import { LIMIT } from "../../type/pagination.dto";
import { UserListReqDto, UserListResDto } from "./dto/show-user.dto";
import errorMessage from "../../config/errorMessage";
import { EditUserReqDto } from "./dto/edit-user.dto";
import { LocalUser } from "../../entities/local-user.entity";
import { isNotNil } from "../../ex/ex";
import { UserSearchType, UserType } from "../../type/commonType";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(LocalUser)
    private localUser: Repository<LocalUser>
  ) {}

  async getUserList(req: UserListReqDto) {
    let searchOption = {};

    if (isNil(req.searchType)) {
      // 전체 검색
      searchOption = [{ name: Like(`%${req.search}%`) }, { phone: Like(`%${req.search}%`) }];
    } else {
      // 부분 검색
      searchOption = {
        name: req.searchType === UserSearchType.NAME ? Like(`%${req.search}%`) : undefined,
        phone: req.searchType === UserSearchType.PHONE ? Like(`%${req.search}%`) : undefined,
      };
    }

    // 매번 검색 마다 실행하기 때문에 불변성 유지 안해도 된다.
    const [users, count] = await User.findAndCount({
      take: LIMIT,
      skip: LIMIT * (req.page - 1),
      select: {
        pk: true,
        name: true,
        phone: true,
        create_at: true,
        type: true,
      },
      where: searchOption,
    });

    if (isNil(users)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return new UserListResDto(users, count, req.page);
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

    return {
      pk: user.pk,
      id: user.userData().id,
      name: user.name,
      phone: user.phone,
      type: user.type,
      email: user.userData().email,
      createAt: user.create_at,
      updateAt: user.userData().updateAt,
    };
  }

  async findOneOrNull(pk: number) {
    return User.findOne({ where: { pk } });
  }

  async update(updateUserDto: EditUserReqDto) {
    const user = await User.findOne({
      where: { pk: updateUserDto.pk },
      relations: { localUser: true, googleUser: true, kakaoUser: true, naverUser: true },
    });

    if (isNil(user)) {
      throw new NotFoundException(errorMessage.USER_NOT_FOUND_ERR);
    }

    if (user.type === UserType.LOCAL && isNotNil(updateUserDto.email)) {
      user.localUser.email = updateUserDto.email;
    }

    user.phone = updateUserDto.phone;

    try {
      await user.save();
      return { pk: user.pk };
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

  async selectUser() {
    const users = await User.find();

    return { list: users.map((user) => [user.pk, user.name]) };
  }
}
