import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { PurchaseService } from "./purchase.service";
import { PurchaseListReqDto, PurchaseListResDto } from "./dto/show-purchase.dto";

@Controller("/admin/purchase")
@ApiTags("어드민 - 구매")
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post("purchase-list")
  @ApiCreatedResponse({ type: PurchaseListResDto })
  async list(@Body() body: PurchaseListReqDto) {
    return this.purchaseService.list(body);
  }
}
