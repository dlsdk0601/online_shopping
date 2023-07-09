import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export class DeleteBannerReqDto {
  @ApiProperty({ description: "pk", type: "number", nullable: false })
  @Transform(({ value }: { value: string }) => parseInt(value, 10)) // TODO :: 모듈화
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}

export class DeleteBannerResDto {
  @ApiProperty({ description: "pk", type: "number", nullable: false })
  @IsNumber()
  @IsNotEmpty()
  pk: number;
}
