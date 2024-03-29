import { Body, Controller, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { EditProductReqDto, EditProductResDto } from "./dto/edit-product.dto";
import {
  ProductListReqDto,
  ProductListResDto,
  ShowProductReqDto,
  ShowProductResDto,
} from "./dto/show-product.dto";
import { DeleteProductReqDto, DeleteProductResDto } from "./dto/delete-product.dto";

@Controller("/admin/product")
@ApiTags("어드민 - 상품")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("edit-product")
  @ApiCreatedResponse({ type: EditProductResDto })
  edit(@Body() body: EditProductReqDto) {
    return this.productService.edit(body);
  }

  @Post("product-list")
  @ApiCreatedResponse({ type: ProductListResDto })
  list(@Body() body: ProductListReqDto) {
    return this.productService.list(body);
  }

  @Post("show-product")
  @ApiCreatedResponse({ type: ShowProductResDto })
  show(@Body() body: ShowProductReqDto) {
    return this.productService.show(body);
  }

  @Post("delete-product")
  @ApiCreatedResponse({ type: DeleteProductResDto })
  delete(@Body() body: DeleteProductReqDto) {
    return this.productService.delete(body.pk);
  }
}
