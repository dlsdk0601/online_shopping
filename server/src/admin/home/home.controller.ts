import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { HomeService } from "./home.service";
import { HomeReqDto, HomeResDto } from "./dto/home.dto";

@Controller("/admin")
@ApiTags("어드민 - 메인 화면")
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Post("home")
  @ApiCreatedResponse({ type: HomeResDto })
  async home(@Body() body: HomeReqDto) {
    return this.homeService.home(body);
  }
}
