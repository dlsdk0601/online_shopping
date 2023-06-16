import { Test, TestingModule } from "@nestjs/testing";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { faker } from "@faker-js/faker";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ManagerService } from "./manager.service";
import Manager, { ManagerType } from "../../entities/manager.entity";
import { getHash } from "../../ex/bcryptEx";

describe("ManagerService", () => {
  let service: ManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Manager])],
      providers: [ManagerService],
    }).compile();

    service = module.get<ManagerService>(ManagerService);
  });

  it("addManager", () => {
    it.todo("should return pk that is number", async () => {
      const body = {
        id: faker.datatype.uuid(),
        password: await getHash("1234"),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        type: ManagerType.MANAGER,
      };
      const newManager = await service.addManager(body);

      expect(newManager).toBe("number");
    });

    it.todo("should return findAll length + 1", async () => {
      const { total: oldTotal } = await service.findAll(1);
      const body = {
        id: faker.datatype.uuid(),
        password: await getHash("1234"),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        type: ManagerType.MANAGER,
      };
      await service.addManager(body);
      const { total: newTotal } = await service.findAll(1);

      expect(oldTotal).toBe(newTotal + 1);
    });

    it.todo("should return BadRequestException", async () => {
      const body = {
        id: "test",
        password: await getHash("1234"),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        type: ManagerType.MANAGER,
      };

      await expect(service.addManager(body)).rejects.toThrow(BadRequestException);
    });

    it.todo("should return InternalServerErrorException without id", async () => {
      const body = {
        id: "",
        password: await getHash("1234"),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        type: ManagerType.MANAGER,
      };

      await expect(service.addManager(body)).rejects.toThrow(InternalServerErrorException);
    });

    it.todo("should return InternalServerErrorException without password", async () => {
      const body = {
        id: faker.datatype.uuid(),
        password: "",
        name: faker.name.fullName(),
        email: faker.internet.email(),
        type: ManagerType.MANAGER,
      };

      await expect(service.addManager(body)).rejects.toThrow(InternalServerErrorException);
    });

    it.todo("should return InternalServerErrorException without name", async () => {
      const body = {
        id: faker.datatype.uuid(),
        password: await getHash("1234"),
        name: "",
        email: faker.internet.email(),
        type: ManagerType.MANAGER,
      };

      await expect(service.addManager(body)).rejects.toThrow(InternalServerErrorException);
    });

    it.todo("should return InternalServerErrorException without type", async () => {
      const body = {
        id: faker.datatype.uuid(),
        password: await getHash("1234"),
        name: faker.name.fullName(),
        email: faker.internet.email(),
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(service.addManager(body)).rejects.toThrow(InternalServerErrorException);
    });

    it.todo("should return InternalServerErrorException without email", async () => {
      const body = {
        id: faker.datatype.uuid(),
        password: await getHash("1234"),
        name: faker.name.fullName(),
        type: ManagerType.MANAGER,
        email: "",
      };

      await expect(service.addManager(body)).rejects.toThrow(InternalServerErrorException);
    });
  });

  it("findOneOr404", () => {
    it.todo("should return one manager who has pk in input param", async () => {
      const pk = faker.datatype.number({ min: 1, max: 10 });
      const res = await service.findOneOr404(pk);
      expect(res).toBeInstanceOf(Manager);
      expect(res.pk).toBe(pk);
    });

    it.todo("should return NotFoundException when input pk is over 100000", async () => {
      const pk = faker.datatype.number({ min: 100000 });
      await expect(service.findOneOr404(pk)).rejects.toThrow(NotFoundException);
    });
  });

  it("findOneOrNull", () => {
    it.todo("should return manager instanceof Manager", async () => {
      const pk = faker.datatype.number({ min: 1, max: 10 });
      const manager = await service.findOneOrNull(pk);
      expect(manager).toBeInstanceOf(Manager);
    });

    it.todo("should return null", async () => {
      const pk = faker.datatype.number({ min: 10000000 });
      const manager = await service.findOneOrNull(pk);
      expect(manager).toBe(null);
    });
  });
});
