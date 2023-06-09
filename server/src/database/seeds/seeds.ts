import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Faker, faker } from "@faker-js/faker";
import Manager, { ManagerType } from "../../entities/manager.entity";
import { getHash } from "../../ex/bcryptEx";
import { User } from "../../entities/user.entity";
import { UserType } from "../../type/commonType";
import { LocalUser } from "../../entities/local-user.entity";
import Authentication from "../../entities/manager-authentication.entity";
import {
  GoogleAuthentication,
  KakaoAuthentication,
  LocalAuthentication,
  NaverAuthentication,
} from "../../entities/user-authentication.entity";
import { Subscribe } from "../../entities/subscribe.entity";

export default class TypeOrmSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    console.log("----------------Faker Insert Start----------------");

    faker.locale = "ko";
    return Promise.all([
      this.onAddManager(faker, dataSource),
      this.onAddUser(faker, dataSource),
      this.onAddSubscribe(faker, dataSource),
    ]).then(() => console.log("success"));
  }

  async onAddSubscribe(faker: Faker, dataSource: DataSource) {
    const subscribe = dataSource.getRepository(Subscribe);
    const oldSubscribes = await subscribe.find();
    await subscribe.remove([...oldSubscribes]);
  }

  async onAddManager(faker: Faker, dataSource: DataSource) {
    const manager = dataSource.getRepository(Manager);
    const oldManagers = await manager.find();
    await manager.remove([...oldManagers]);
    const oldAuths = await Authentication.find();
    await Authentication.remove([...oldAuths]);

    const managers = await this.managerList(faker);
    await manager.insert([...managers]);
  }

  async onAddUser(faker: Faker, dataSource: DataSource) {
    const localUser = dataSource.getRepository(LocalUser);
    const oldLocalAuths = await LocalAuthentication.find();
    await LocalAuthentication.remove([...oldLocalAuths]);
    const oldGoogleAuths = await GoogleAuthentication.find();
    await GoogleAuthentication.remove([...oldGoogleAuths]);
    const oldKakaoAuths = await KakaoAuthentication.find();
    await KakaoAuthentication.remove([...oldKakaoAuths]);
    const oldNaverAuths = await NaverAuthentication.find();
    await NaverAuthentication.remove([...oldNaverAuths]);

    const oldLocalUsers = await localUser.find();
    await localUser.remove([...oldLocalUsers]);

    const users = await this.userList(faker, dataSource);
    await localUser.insert([...users]);
  }

  async managerList(faker: Faker) {
    const managers: {
      id: string;
      name: string;
      email: string;
      password_hash: string;
      type: ManagerType;
    }[] = [];

    for (let i = 0; i < 10; i++) {
      // eslint-disable-next-line no-await-in-loop
      const password_hash = await getHash(this.randomPassword(faker));
      const newManager = {
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password_hash,
        type: ManagerType.MANAGER,
      };

      managers.push(newManager);
    }

    managers[0].id = "manager";
    managers[0].name = "manager";
    managers[0].email = "manager@test.com";
    managers[0].password_hash = await getHash("1234");

    return managers;
  }

  async userList(faker: Faker, dataSource: DataSource) {
    const localUsers: {
      id: string;
      email: string;
      password_hash: string;
      pk: number;
    }[] = [];

    const userRepository = dataSource.getRepository(User);
    const oldUsers = await userRepository.find();
    await userRepository.remove([...oldUsers]);

    for (let i = 0; i < 120; i++) {
      const user = new User();
      user.name = faker.name.fullName();
      user.phone = this.makeFakerPhone(faker);
      user.type = UserType.LOCAL;
      // eslint-disable-next-line no-await-in-loop
      const savedUser = await userRepository.save(user);

      // eslint-disable-next-line no-await-in-loop
      const password_hash = await getHash(this.randomPassword(faker));
      const localUser = {
        id: i === 0 ? "test" : faker.datatype.uuid(),
        email: faker.internet.email(),
        password_hash,
        pk: savedUser.pk,
      };
      localUsers.push(localUser);
    }

    localUsers[0].id = "test";
    localUsers[0].password_hash = await getHash("1234");

    return localUsers;
  }

  makeFakerPhone(faker: Faker) {
    const second = faker.datatype.number({ min: 1000, max: 9999 });
    const third = faker.datatype.number({ min: 1000, max: 9999 });
    return `010${second}${third}`;
  }

  randomPassword(faker: Faker) {
    return faker.datatype.number({ min: 1000, max: 9999 }).toString();
  }
}
