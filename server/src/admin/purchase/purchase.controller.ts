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
import {
  RefundListReqDto,
  RefundListResDto,
  ShowRefundReqDto,
  ShowRefundResDto,
} from "./dto/show-refund.dto";

@Controller("/admin/purchase")
@ApiTags("어드민 - 구매")
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post("purchase-list")
  @ApiCreatedResponse({ type: PurchaseListResDto })
  async list(@Body() body: PurchaseListReqDto) {
    return this.purchaseService.purchaseList(body);
  }

  @Post("show-purchase")
  @ApiCreatedResponse({ type: ShowPurchaseResDto })
  async showPurchase(@Body() body: ShowPurchaseReqDto) {
    return this.purchaseService.showPurchase(body);
  }

  @Post("refund-purchase")
  @ApiCreatedResponse({ type: RefundPurchaseResDto })
  async refund(@Body() body: RefundPurchaseReqDto) {
    return this.purchaseService.refund(body);
  }

  @Post("refund-list")
  @ApiCreatedResponse({ type: RefundListResDto })
  async refundList(@Body() body: RefundListReqDto) {
    return this.purchaseService.refundList(body);
  }

  @Post("show-refund")
  @ApiCreatedResponse({ type: ShowRefundResDto })
  async showRefund(@Body() body: ShowRefundReqDto) {
    return this.purchaseService.showRefund(body);
  }
}
