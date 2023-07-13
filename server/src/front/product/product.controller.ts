import { Controller, Get, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { ProductListReqDto, ProductListResDto } from "./dto/show-product.dto";

@Controller("")
@ApiTags("상품")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/product-list")
  @ApiCreatedResponse({ type: ProductListResDto })
  async list(@Query() query: ProductListReqDto) {
    return this.productService.list(query);
  }
}
