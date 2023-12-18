import { Controller, Get, Query } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { HomeService } from "./home.service";
import { HomeReqDto, HomeResDto } from "./dto/home.dto";

@Controller("")
@ApiTags("메인 화면")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get("home")
  @ApiCreatedResponse({ type: HomeResDto })
  @ApiBody({ type: HomeReqDto, required: false }) // 쿼리는 interface 가 생성되지 않는다. 꼼수로 넣음
  async home(@Query() query: HomeReqDto) {
    return this.homeService.home(query);
  }
}
