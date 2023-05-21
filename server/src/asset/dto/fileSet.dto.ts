import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FileSetDto {
  @ApiProperty({ description: "파일 url", type: "string" })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: "파일 다운로드 url", type: "string" })
  @IsString()
  @IsNotEmpty()
  downloadUrl: string;

  @ApiProperty({ description: "썸네일 url", type: "string" })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({ description: "uuid", type: "string" })
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @ApiProperty({ description: "파일 이름", type: "string" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "파일 형식", type: "string" })
  @IsString()
  @IsNotEmpty()
  contentType: string;
}
