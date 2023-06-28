import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { FileSetDto } from "./fileSet.dto";

export class UploadReqDto {
  @ApiProperty({ description: "파일 형식", type: "string" })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: "파일 이름", type: "string" })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({ description: "base64", type: "string" })
  @IsString()
  @IsNotEmpty()
  fileBase64: string;
}

export class UploadResDto {
  @ApiProperty({ description: "파일 데이터 set", type: FileSetDto })
  fileSet: FileSetDto;
}

export class UploadsReqDto {
  @ApiProperty({
    description: "파일 base64 list",
    type: "array",
    items: { $ref: getSchemaPath(UploadReqDto) },
  })
  files: UploadReqDto[];
}

export class UploadsResDto {
  @ApiProperty({
    description: "파일 데이터 set list",
    type: "array",
    items: { $ref: getSchemaPath(FileSetDto) },
  })
  fileSets: FileSetDto[];
}
