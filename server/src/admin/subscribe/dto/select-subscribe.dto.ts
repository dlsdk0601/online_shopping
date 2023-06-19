import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SelectSubscribeReqDto {}

export class SelectSubscribeResSubscribeDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  pk: number;

  @ApiProperty({ description: "이름", nullable: false, type: "string" })
  @IsString()
  @IsNotEmpty()
  label: string;
}

export class SelectSubscribeResDto {
  @ApiProperty({
    description: "구독자 리스트",
    nullable: false,
    type: "array",
    items: { $ref: getSchemaPath(SelectSubscribeResSubscribeDto) },
  })
  @IsArray()
  @IsNotEmpty()
  list: SelectSubscribeResSubscribeDto[];
}
