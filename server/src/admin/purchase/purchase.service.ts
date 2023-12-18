import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { isNil } from "lodash";
import { FindOptionsWhere, Like } from "typeorm";
import { AssetService } from "../../asset/asset.service";
import {
  PurchaseListReqDto,
  PurchaseListResDto,
  ShowPurchaseReqDto,
} from "./dto/show-purchase.dto";
import { LIMIT } from "../../type/pagination.dto";
import errorMessage from "../../constant/errorMessage";
import { Payment } from "../../entities/payment.entity";
import {
  PaymentCancelHistory,
  PaymentFailure,
  TossPaymentApprove,
} from "../../entities/payment-approve.entity";
import { RefundPurchaseReqDto } from "./dto/purchase-refund.dto";
import { HttpService } from "../../front/http/http.service";
import { config } from "../../config";
import {
  TossPaymentHttpApproveResDto,
  TossPaymentHttpCancelReqDto,
} from "../../front/purchase/dto/toss-payment.dto";
import { TossPaymentCancelDto } from "../../front/purchase/dto/common.dto";
import { RefundListReqDto, RefundListResDto, ShowRefundReqDto } from "./dto/show-refund.dto";
import { PurchaseSearchType } from "../../type/commonType";
import { FailListReqDto, FailListResDto } from "./dto/show-fail.dto";

@Injectable()
export class PurchaseService {
  private readonly tossSecretKey: string;

  constructor(private assetService: AssetService, private httpService: HttpService) {
    this.tossSecretKey = config.tossPaymentSecretKey;
  }

  async purchaseList(body: PurchaseListReqDto) {
    let options: FindOptionsWhere<Payment> | FindOptionsWhere<Payment>[];

    if (isNil(body.searchType)) {
      options = [
        {
          payment_approve: {
            order_id: Like(`%${body.search}%`),
          },
        },
        {
          purchase: {
            user: {
              name: Like(`%${body.search}%`),
            },
          },
        },
        {
          purchase: {
            user: {
              phone: Like(`%${body.search}%`),
            },
          },
        },
      ];
    } else {
      options = {
        payment_approve: {
          order_id:
            body.searchType === PurchaseSearchType.ORDER_CODE
              ? Like(`%${body.search}%`)
              : undefined,
        },
        purchase: {
          user: {
            name:
              body.searchType === PurchaseSearchType.NAME ? Like(`%${body.search}%`) : undefined,
            phone:
              body.searchType === PurchaseSearchType.PHONE ? Like(`%${body.search}%`) : undefined,
          },
        },
      };
    }

    const [payments, count] = await Payment.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      relations: {
        purchase: {
          user: true,
          purchase_items: true,
        },
        payment_approve: {
          cancels: true,
        },
      },
      where: options,
    });

    const items = payments
      .filter((item) => item.isSuccess)
      .filter((item) => !item.isRefund)
      .map((item) => ({
        pk: item.pk,
        name: item.purchase.user.name,
        phone: item.purchase.user.phone ?? "",
        totalPrice: (item.payment_approve as TossPaymentApprove).total_amount,
        orderCode: (item.payment_approve as TossPaymentApprove).order_id, // filter 걸쳐서 무조건 나온다
        method: (item.payment_approve as TossPaymentApprove).method,
        createAt: item.create_at,
      }));

    return new PurchaseListResDto(items, count, body.page);
  }

  async refundList(body: RefundListReqDto) {
    let options: FindOptionsWhere<PaymentCancelHistory> | FindOptionsWhere<PaymentCancelHistory>[];

    if (isNil(body.searchType)) {
      options = [
        {
          approve: {
            order_id: Like(`%${body.search}%`),
          },
        },
        {
          approve: {
            payment: {
              purchase: {
                user: {
                  name: Like(`%${body.search}%`),
                },
              },
            },
          },
        },
        {
          approve: {
            payment: {
              purchase: {
                user: {
                  phone: Like(`%${body.search}%`),
                },
              },
            },
          },
        },
      ];
    } else {
      options = {
        approve: {
          order_id:
            body.searchType === PurchaseSearchType.ORDER_CODE
              ? Like(`%${body.search}%`)
              : undefined,
          payment: {
            purchase: {
              user: {
                name:
                  body.searchType === PurchaseSearchType.NAME
                    ? Like(`%${body.search}%`)
                    : undefined,
                phone:
                  body.searchType === PurchaseSearchType.PHONE
                    ? Like(`%${body.search}%`)
                    : undefined,
              },
            },
          },
        },
      };
    }

    const [cancels, count] = await PaymentCancelHistory.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      relations: {
        approve: {
          payment: {
            purchase: {
              user: true,
            },
          },
        },
      },
      where: options,
    });

    const items = cancels.map((item) => ({
      pk: item.pk,
      name: item.approve.payment.purchase.user.name,
      phone: item.approve.payment.purchase.user.phone ?? "",
      cancelPrice: item.cancel_amount,
      orderCode: item.approve.order_id,
      method: item.approve.method,
      createAt: item.approve.create_at,
      canceledAt: item.canceled_at,
    }));

    return new RefundListResDto(items, count, body.page);
  }

  async failList(body: FailListReqDto) {
    let options: FindOptionsWhere<PaymentFailure> | FindOptionsWhere<PaymentFailure>[];

    if (isNil(body.searchType)) {
      options = [
        {
          payment: {
            purchase: {
              order_code: Like(`%${body.search}%`),
            },
          },
        },
        {
          payment: {
            purchase: {
              user: {
                name: Like(`%${body.search}%`),
              },
            },
          },
        },
        {
          payment: {
            purchase: {
              user: {
                phone: Like(`%${body.search}%`),
              },
            },
          },
        },
      ];
    } else {
      options = {
        payment: {
          purchase: {
            order_code:
              body.searchType === PurchaseSearchType.ORDER_CODE
                ? Like(`%${body.search}%`)
                : undefined,
            user: {
              name:
                body.searchType === PurchaseSearchType.NAME ? Like(`%${body.search}%`) : undefined,
              phone:
                body.searchType === PurchaseSearchType.PHONE ? Like(`%${body.search}%`) : undefined,
            },
          },
        },
      };
    }

    const [fails, count] = await PaymentFailure.findAndCount({
      take: LIMIT,
      skip: LIMIT * (body.page - 1),
      relations: {
        payment: {
          purchase: {
            user: true,
          },
        },
      },
      where: options,
    });

    const items = fails.map((item) => ({
      pk: item.pk,
      name: item.payment.purchase.user.name,
      phone: item.payment.purchase.user.phone ?? "",
      orderCode: item.payment.purchase.order_code,
      errorCode: item.code,
      createAt: item.payment.create_at,
    }));

    return new FailListResDto(items, count, body.page);
  }

  async showPurchase(body: ShowPurchaseReqDto) {
    const payment = await Payment.findOne({
      where: {
        pk: body.pk,
      },
      relations: {
        purchase: {
          purchase_items: {
            product: {
              main_image: true,
            },
          },
          user: true,
        },
        payment_approve: true,
      },
    });

    if (isNil(payment) || isNil(payment.payment_approve)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: payment.pk,
      name: payment.purchase.user.name,
      phone: payment.purchase.user.phone ?? "",
      orderCode: payment.payment_approve.order_id,
      createAt: payment.create_at,
      purchaseItems: payment.purchase.purchase_items.map((item) => ({
        pk: item.pk,
        name: item.product.name,
        price: item.product.price,
        count: item.count,
        status: item.status,
        image: this.assetService.getFileSet(item.product.main_image),
      })),
    };
  }

  async showRefund(body: ShowRefundReqDto) {
    const cancel = await PaymentCancelHistory.findOne({
      where: {
        pk: body.pk,
      },
      relations: {
        approve: {
          payment: {
            purchase: {
              user: true,
              purchase_items: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (isNil(cancel)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    return {
      pk: cancel.pk,
      name: cancel.approve.payment.purchase.user.name,
      phone: cancel.approve.payment.purchase.user.phone ?? "",
      orderCode: cancel.approve.order_id,
      createAt: cancel.approve.create_at,
      canceledAt: cancel.canceled_at,
      purchaseItems: cancel.approve.payment.purchase.purchase_items.map((item) => ({
        pk: item.pk,
        name: item.product.name,
        price: item.product.price,
        count: item.count,
        status: item.status,
        image: this.assetService.getFileSet(item.product.main_image),
      })),
    };
  }

  async refund(body: RefundPurchaseReqDto) {
    const payment = await Payment.findOne({
      where: {
        pk: body.pk,
      },
      relations: {
        payment_approve: true,
      },
    });

    if (isNil(payment) || isNil(payment.payment_approve)) {
      throw new NotFoundException(errorMessage.NOT_FOUND_DATA);
    }

    const base64SecretKey = Buffer.from(`${this.tossSecretKey}:`).toString("base64");
    const res = await this.httpService.post<
      TossPaymentHttpApproveResDto,
      TossPaymentHttpCancelReqDto
    >(
      this.refundUrl(payment.payment_key),
      {
        headers: {
          "Authorization": `Basic ${base64SecretKey}`,
          "Content-Type": "application/json",
        },
      },
      { cancelReason: body.cancelReason }
    );

    if (isNil(res) || isNil(res.cancels)) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }

    try {
      payment.payment_approve.status = res.status;
      const cancels = this.saveCancelHistory(payment.payment_approve, res.cancels);
      await payment.payment_approve.save();
      await PaymentCancelHistory.save(cancels);
      return { pk: payment.pk };
    } catch (e) {
      throw new InternalServerErrorException(errorMessage.INTERNAL_FAILED);
    }
  }

  saveCancelHistory(approve: TossPaymentApprove, cancels: TossPaymentCancelDto[]) {
    const cancelHistories: PaymentCancelHistory[] = [];

    for (let i = 0; i < cancels.length; i++) {
      const cancel = cancels[i];
      const paymentCancelHistory = new PaymentCancelHistory();
      paymentCancelHistory.approve = approve;
      paymentCancelHistory.cancel_amount = cancel.cancelAmount;
      paymentCancelHistory.cancel_reason = cancel.cancelReason;
      paymentCancelHistory.tax_free_amount = cancel.taxFreeAmount;
      paymentCancelHistory.tax_exemption_amount = cancel.taxExemptionAmount;
      paymentCancelHistory.refundable_amount = cancel.refundableAmount;
      paymentCancelHistory.easy_pay_discount_amount = cancel.easyPayDiscountAmount;
      paymentCancelHistory.canceled_at = cancel.canceledAt;
      paymentCancelHistory.transaction_key = cancel.transactionKey;
      paymentCancelHistory.receipt_key = cancel.receiptKey ?? "";

      cancelHistories.push(paymentCancelHistory);
    }

    return cancelHistories;
  }

  refundUrl(paymentKey: string) {
    return `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`;
  }
}
