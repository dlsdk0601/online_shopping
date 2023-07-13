import { Body, Controller, Get } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { HomeService } from "./home.service";
import { HomeReqDto, HomeResDto } from "./dto/home.dto";

@Controller("home")
@ApiTags("메인 화면")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get("")
  @ApiCreatedResponse({ type: HomeResDto })
  async home(@Body() body: HomeReqDto) {
    return this.homeService.home(body);
  }
}
