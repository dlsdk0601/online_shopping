import { IsArray, IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export const LIMIT = 20;

export class PaginationDto {
  @ApiProperty({ description: "현재 페이지", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: "다음 페이지", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  nextPage: number;

  @ApiProperty({ description: "이전 페이지", nullable: false, type: "number" })
  @IsNumber()
  @IsNotEmpty()
  prevPage: number;

  @ApiProperty({ description: "다음 페이지 존재여부", nullable: false, type: "boolean" })
  @IsNotEmpty()
  @IsBoolean()
  hasNext: boolean;

  @ApiProperty({ description: "이전 페이지 존재여부", nullable: false, type: "boolean" })
  @IsNotEmpty()
  @IsBoolean()
  hasPrev: boolean;

  @ApiProperty({ description: "전체 갯수", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty({
    description: "페이지 array",
    nullable: false,
    isArray: true,
    type: () => "number",
  })
  @IsNotEmpty()
  @IsArray()
  pages: number[];

  @ApiProperty({ description: "첫 페이지", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  first: number;

  @ApiProperty({ description: "마지막 페이지", nullable: false, type: "number" })
  @IsNotEmpty()
  @IsNumber()
  last: number;

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

  // 마지막 페이지가 5 보다 작을 때
  // [1, 2, 3, 4]
  if (last < 5) {
    for (let i = 0; i < last; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  // 마지막 페이지가 5보다 클때
  // [1, 2, 3, 4, 5]
  if (page < 3) {
    for (let i = 0; i < 5; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  // [3, 4, 5, 6, 7] => 뒤에 더 존재
  if (page < last - 2) {
    for (let i = 0; i < 5; i++) {
      pages.push(page - 2 + i);
    }

    return pages;
  }

  // [5, 6, 7, 8, 9] 9가 마지막 페이지
  for (let i = 0; i < 5; i++) {
    pages.push(last - 4 + i);
  }

  return pages;
};
