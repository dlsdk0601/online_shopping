import { IsArray, IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export const LIMIT = 20;

export class PaginationDto {
  @ApiProperty({ description: "현재 페이지" })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "다음 페이지" })
  @IsNumber()
  @IsNotEmpty()
  nextPage: number;

  @ApiProperty({ description: "이전 페이지" })
  @IsNumber()
  @IsNotEmpty()
  prevPage: number;

  @ApiProperty({ description: "다음 페이지 존재여부" })
  @IsNotEmpty()
  @IsBoolean()
  hasNext: boolean;

  @ApiProperty({ description: "이전 페이지 존재여부" })
  @IsNotEmpty()
  @IsBoolean()
  hasPrev: boolean;

  @ApiProperty({ description: "전체 갯수" })
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty({ description: "페이지 array" })
  @IsNotEmpty()
  @IsArray()
  pages: number[];

  @ApiProperty({ description: "첫 페이지" })
  @IsNotEmpty()
  @IsNumber()
  first: number;

  @ApiProperty({ description: "마지막 페이지" })
  @IsNotEmpty()
  @IsNumber()
  last: number;

  // @ApiProperty({
  //   description: "아이템",
  //   type: "array",
  //   oneOf: [
  //     { $ref: getSchemaPath(UserListResUserDto) },
  //     { $ref: getSchemaPath(ManagerListResManagerDto) },
  //   ],
  // })
  // @IsArray()
  // rows: T[];

  constructor(count: number, page: number) {
    const last = Math.ceil(count / LIMIT);
    this.page = page;
    this.nextPage = last > page ? page + 1 : last;
    this.prevPage = page > 1 ? page - 1 : page;
    this.hasNext = last > page;
    this.hasPrev = page > 1;
    this.total = count;
    this.first = 1;
    this.last = last;
    // this.rows = data;
    this.pages = getPagesArray(last, page);
  }
}

const getPagesArray = (last: number, page: number): number[] => {
  const pages: number[] = [];

  if (page < 5) {
    for (let i = 0; i < 5; i++) {
      pages.push(i + 1);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      pages.push(page - 2 + i);
    }
  }

  return pages;
};
