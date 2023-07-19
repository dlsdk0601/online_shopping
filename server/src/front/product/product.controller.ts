import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import {
  ProductListReqDto,
  ProductListResDto,
  ShowProductReqDto,
  ShowProductResDto,
} from "./dto/show-product.dto";

@Controller("")
@ApiTags("상품")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/product-list")
  @ApiCreatedResponse({ type: ProductListResDto })
  @ApiBody({ type: ProductListReqDto, required: false }) // TODO :: 쿼리는 interface 가 생성되지 않는다. 꼼수로 넣은거 수정
  async list(@Query() query: ProductListReqDto) {
    return this.productService.list(query);
  }

  @Post("/show-product")
  @ApiCreatedResponse({ type: ShowProductResDto })
  async show(@Body() body: ShowProductReqDto) {
    return this.productService.show(body.pk);
  }
}
