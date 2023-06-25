import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { AddProductReqDto, AddProductResDto } from "./dto/add-product.dto";
import { ProductListReqDto, ProductListResDto } from "./dto/show-product.dto";

@Controller("admin")
@ApiTags("admin-product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("add-product")
  @ApiCreatedResponse({ type: AddProductResDto })
  add(@Body() body: AddProductReqDto) {
    return this.productService.add(body);
  }

  @Post("product-list")
  @ApiCreatedResponse({ type: ProductListResDto })
  list(@Body() body: ProductListReqDto) {
    return this.productService.list(body);
  }
}
