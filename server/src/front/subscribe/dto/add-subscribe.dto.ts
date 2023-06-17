import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddSubscribeReqDto {
  @ApiProperty({ description: "유저 이름", type: "string", nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "유저 이메일", type: "string", nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class AddSubscribeResDto {
  @ApiProperty({ description: "pk", type: "number", nullable: false })
  @IsNotEmpty()
  @IsNumber()
  pk: number;
}
