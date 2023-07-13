import { Controller, Get, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { HomeService } from "./home.service";
import { HomeReqDto, HomeResDto } from "./dto/home.dto";

@Controller("")
@ApiTags("메인 화면")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get("home")
  @ApiCreatedResponse({ type: HomeResDto })
  async home(@Query() query: HomeReqDto) {
    return this.homeService.home(query);
  }
}
