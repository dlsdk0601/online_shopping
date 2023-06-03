import { UrlObject } from "url";
import { ParsedUrlQueryInput } from "querystring";

export class PageUrl {
  readonly pathname: string;

  constructor(pathname: string) {
    this.pathname = pathname;
  }

  // TODO :: query 파라미터로 받기
  url(query?: ParsedUrlQueryInput): UrlObject {
    return { pathname: this.pathname, query };
  }
}
