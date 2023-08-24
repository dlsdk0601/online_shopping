import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "./http.service";

describe("HttpController", () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpService],
    }).compile();
  });

  it("should be defined", () => {});
});
