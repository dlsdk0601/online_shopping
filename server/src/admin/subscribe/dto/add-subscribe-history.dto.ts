import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddSubscribeHistoryReqDto {
  @ApiProperty({ description: "pk", nullable: true, type: "number" })
  @IsNumber()
  @IsOptional()
  pk: number;

  @ApiProperty({ description: "제목", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: "본문", nullable: false, type: "string" })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ description: "발송 날짜", nullable: false, type: "string", format: "date-time" })
  @IsISO8601({ strict: true })
  @IsNotEmpty()
  sendDate: Date;

  @ApiProperty({
    description: "수신인 리스트",
    nullable: true,
    type: "array",
    items: { type: "number" },
  })
  @IsArray()
  @IsOptional()
  users: number[];
}

export class AddSubscribeHistoryResDto {
  @ApiProperty({ description: "pk", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}
