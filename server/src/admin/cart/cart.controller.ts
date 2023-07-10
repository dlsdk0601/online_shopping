import { Controller } from "@nestjs/common";
import { CartService } from "./cart.service";

@Controller("admin")
export class CartController {
  constructor(private readonly cartService: CartService) {}
}
