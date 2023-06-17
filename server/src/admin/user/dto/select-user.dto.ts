import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SelectUserReqDto {}

export class SelectUserResSelectUserDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  label: string;
}

export class SelectUserResDto {
  @ApiProperty({
    description: "유저 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(SelectUserResSelectUserDto) },
  })
  @IsArray()
  @IsNotEmpty()
  list: SelectUserResSelectUserDto[];
}
