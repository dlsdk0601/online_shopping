import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { PurchaseService } from "./purchase.service";
import {
  PurchaseListReqDto,
  PurchaseListResDto,
  ShowPurchaseReqDto,
  ShowPurchaseResDto,
} from "./dto/show-purchase.dto";
import { RefundPurchaseReqDto, RefundPurchaseResDto } from "./dto/purchase-refund.dto";

@Controller("/admin/purchase")
@ApiTags("어드민 - 구매")
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post("purchase-list")
  @ApiCreatedResponse({ type: PurchaseListResDto })
  async list(@Body() body: PurchaseListReqDto) {
    return this.purchaseService.list(body);
  }

  @Post("show-purchase")
  @ApiCreatedResponse({ type: ShowPurchaseResDto })
  async show(@Body() body: ShowPurchaseReqDto) {
    return this.purchaseService.show(body);
  }

  @Post("refund-purchase")
  @ApiCreatedResponse({ type: RefundPurchaseResDto })
  async refund(@Body() body: RefundPurchaseReqDto) {
    return this.purchaseService.refund(body);
  }
}
