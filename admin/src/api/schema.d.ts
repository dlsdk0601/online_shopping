/* schema.d.ts 라는 파일은 원래 json-schema-to-typescript 라이브러리를 통해 generated 되는 파일을 참고되는 파일이다. */

export interface Pagination<T> {
  first: number;
  total: number;
  last: number;
  page: number;
  rows: T[];
  prevPage: number;
  hasPrev: boolean;
  nextPage: number;
  hasNext: boolean;
  pages: number[];
}
