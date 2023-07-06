import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Optional } from "@nestjs/common";
import { ProductCategory } from "../../../type/commonType";

export class EditBannerReqDto {
  @ApiProperty({ description: "pk", type: "number", nullable: true })
  @IsNumber()
  @Optional()
  pk: number;

  @ApiProperty({ description: "배너 제목", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: "배너 설명", nullable: true, type: "string" })
  @IsString()
  @Optional()
  description: string | null;

  @ApiProperty({ description: "배너 서브 제목", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  subTitle: string;

  @ApiProperty({ description: "카테고리", nullable: false, enum: ProductCategory })
  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;

  @ApiProperty({
    description: "이미지 uuid",
    nullable: false,
    type: "string",
  })
  @IsNotEmpty()
  image: string;
}

export class EditBannerResDto {
  @ApiProperty({ description: "pk", type: "number", nullable: false })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
