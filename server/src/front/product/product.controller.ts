import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "./product.service";

@Controller("product")
@ApiTags("상품")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}
