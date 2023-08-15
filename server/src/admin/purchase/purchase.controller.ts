import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { PurchaseService } from "./purchase.service";
import { PurchaseListReqDto, PurchaseListResDto } from "./dto/show-purchase.dto";

@Controller("/admin/purchase")
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post("list-purchase")
  @ApiCreatedResponse({ type: PurchaseListResDto })
  async list(@Body() body: PurchaseListReqDto) {
    return this.purchaseService.list(body);
  }
}