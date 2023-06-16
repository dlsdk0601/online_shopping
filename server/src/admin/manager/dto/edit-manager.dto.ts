import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ManagerType } from "../../../entities/manager.entity";

export class EditManagerReqDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;

  @ApiProperty({ description: "uuid" })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "password hash" })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: "name" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "email" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "manager - type",
    nullable: false,
    enum: [ManagerType.MANAGER, ManagerType.SUPER],
  })
  @IsEnum(ManagerType)
  type: ManagerType;
}

export class EditManagerResDto {
  @ApiProperty({ description: "pk" })
  @IsNumber()
  pk: number;
}
