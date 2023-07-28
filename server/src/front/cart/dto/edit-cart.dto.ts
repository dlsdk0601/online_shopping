import { PartialType } from "@nestjs/swagger";
import { AddCartDto } from "./add-cart.dto";

export class EditCartDto extends PartialType(AddCartDto) {}
