import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { PurchaseService } from "./purchase.service";
import { ShowPurchaseReqDto, ShowPurchaseResDto } from "./dto/show-purchase.dto";
import { AddPurchaseReqDto, AddPurchaseResDto } from "./dto/add-purchase.dto";
import { GetUser } from "../../decorator/user.decorator";
import { User } from "../../entities/user.entity";
import { TossPaymentApproveReqDto, TossPaymentApproveResDto } from "./dto/toss-payment.dto";
import { FailPurchaseReqDto, FailPurchaseResDto } from "./dto/fail-purchase.dto";

@Controller("/purchase")
@ApiTags("구매")
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  // 회원 관련 API 는 보안 때문에 post 로 한다.
  @Post("show-purchase")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ type: ShowPurchaseResDto })
  show(@Body() body: ShowPurchaseReqDto, @GetUser() user: User): ShowPurchaseResDto {
    return this.purchaseService.show(body.pk, user);
  }

  @Post("add-purchase")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ type: AddPurchaseResDto })
  async add(@Body() body: AddPurchaseReqDto, @GetUser() user: User): Promise<AddPurchaseResDto> {
    return this.purchaseService.add(body, user);
  }

  @Post("toss-payment-approve")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ type: TossPaymentApproveResDto })
  async tossPaymentApprove(
    @Body() body: TossPaymentApproveReqDto,
    @GetUser() user: User
  ): Promise<TossPaymentApproveResDto> {
    return this.purchaseService.tossPaymentApprove(body, user);
  }

  @Post("fail-purchase")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ type: FailPurchaseResDto })
  async failPurchase(@Body() body: FailPurchaseReqDto): Promise<FailPurchaseResDto> {
    return this.purchaseService.failPurchase(body);
  }
}
